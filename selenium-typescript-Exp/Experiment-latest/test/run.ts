import * as yargs from 'yargs'
import * as fs from 'fs'
import { execSync } from 'child_process'
import * as testRailApiObj from './helpers/testRail'
import { TESTRAILDATA } from './helpers/testRailConstants'
import { cleanUser } from './dbclean'
const passStatusID = TESTRAILDATA.passedTestStatusID
const failStatusID = TESTRAILDATA.failedTestStatusID
const reportDirectory = '../result'
process.env['WL-NAME'] = 'old-xxxxx'

function checkStatus(arr: any) {
  if (arr.status === 'failed') {
    return true
  }
}

function getTestSummary(featureName: string) {
  const reportFile = `${reportDirectory}/${featureName}_result.json`
  return new Promise<string>((resolve, reject) => {
    fs.readFile(reportFile, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
    .then((data) => {
      const PASSEDVALUE = 1
      const FAILEDVALUE = 0
      var value = PASSEDVALUE
      var jsonData = data.toString()
      let jsonParsed = JSON.parse(jsonData)
      for (var i = 0; i < jsonParsed.testResults.length; i++) {
        var testResults = jsonParsed.testResults[i].assertionResults
        if (testResults.some(checkStatus) === true) {
          value = FAILEDVALUE
        } else {
          value = PASSEDVALUE
        }
        if (value === FAILEDVALUE) {
          break
        }
      }
      return value
    })
    .catch((err) => {
      throw err
    })
}

async function removeOldResultFile() {
  try {
    if (fs.existsSync(reportDirectory)) {
      fs.rmSync(reportDirectory, { recursive: true, force: true })
    }
  } catch (error) {
    throw new Error('result directory could not be removed.')
  }
}

async function createResultDirectory() {
  try {
    if (!fs.existsSync(reportDirectory)) {
      fs.mkdirSync(reportDirectory)
    }
  } catch (error) {
    throw new Error('result directory could not be Created.')
  }
}

async function pushResultToTestRail(runID: number, caseID: number) {
  const reportFile = `${reportDirectory}/C${caseID}_result.json`
  fs.readFile(reportFile, async function (err, data) {
    var jsonData = data.toString()
    var jsonParsed = JSON.parse(jsonData)
    const testResults = jsonParsed.testResults
    for (var testResult of testResults) {
      for (var element of testResult.assertionResults) {
        if (element.title.includes(caseID)) {
          if (element.status === 'failed') {
            console.log(element.fullName + ' :- FAIL')
            await testRailApiObj.updateResult(runID, caseID, failStatusID)
            break
          } else if (element.status === 'passed') {
            console.log(element.fullName + ' :- PASS')
            await testRailApiObj.updateResult(runID, caseID, passStatusID)
            break
          } else {
            console.log(element.fullName + ' :- PENDING')
          }
        }
      }
    }
  })
}

async function pushResultToTestRailForWL(runID: number, featureName: string) {
  const reportFile = `${reportDirectory}/${featureName}_result.json`
  fs.readFile(reportFile, async function (err, data) {
    var jsonData = data.toString()
    var jsonParsed = JSON.parse(jsonData)
    const testResults = jsonParsed.testResults
    for (var testResult of testResults) {
      for (var element of testResult.assertionResults) {
        const elementTitleArray: string[] = element.title.split('-')
        const completeCaseID: string = elementTitleArray[elementTitleArray.length-1]
        let caseID: number = parseInt(completeCaseID.slice(1))
        if (element.ancestorTitles[0].includes(featureName)) {
          if (element.status === 'failed') {
            console.log(element.fullName + ' :- FAIL')
            await testRailApiObj.updateResult(runID, caseID, failStatusID)
          } else if (element.status === 'passed') {
            console.log(element.fullName + ' :- PASS')
            await testRailApiObj.updateResult(runID, caseID, passStatusID)
          } else {
            console.log(element.fullName + ' :- PENDING')
          }
        }
      }
    }
  })
}

async function executeFeature(featureName: string, clientName: string) {
  let cmd: string = ''
  let testToBeExecuted: string = ''
  await removeOldResultFile()
  await createResultDirectory()
  process.env['CASE_PREFIX'] = featureName
  if (clientName.includes('WL')) {
    const clientNameArray: string[]=clientName.split('-')
    testToBeExecuted = `${clientNameArray[clientNameArray.length-1]}-${featureName}` 
    cmd = `jest -t ${testToBeExecuted} --json --detectOpenHandles --outputFile=${reportDirectory}/${testToBeExecuted}_result.json`
  } else {
    testToBeExecuted = featureName
    cmd = `jest -t ${testToBeExecuted} --json --detectOpenHandles --outputFile=${reportDirectory}/${testToBeExecuted}_result.json`
  }
  try {
    execSync(cmd)
  } catch (error) {
    console.log(
      `There is a problem in running the tests for the specified ${featureName}`
    )
  }
  const temp = getTestSummary(testToBeExecuted)
  temp.then((result) => {
    console.log('Result:->', result)
  })
}

async function executeAllTestFromRunId(
  projectID: number,
  suiteID: number,
  runID: number,
  clientName: string,
  featureName: string
) {
  if (clientName.includes('WL')) {
    await removeOldResultFile()
    await createResultDirectory()
    const clientNameArray: string[]=clientName.split('-')
    const testToBeExecuted: string = `${clientNameArray[clientNameArray.length-1]}-${featureName}` 
    console.log(
      `********** Test Feature is running :- ${featureName} **********`
    )
    const cmd = `jest -t ${testToBeExecuted} --json --outputFile=${reportDirectory}/${testToBeExecuted}_result.json`
    try {
      execSync(cmd)
    } catch (error) {
      console.log(`There is a problem in running ${testToBeExecuted}`)
    }
    await pushResultToTestRailForWL(runID, testToBeExecuted)
  } else {
    let casesToBeExecuted: number[] = []
    const casesFromRunID: number[] =
      await testRailApiObj.getAutomatedCaseIdsFromRunId(runID)
    const casesFromSuiteID: number[] = await testRailApiObj.getAutomatedCaseIds(
      projectID,
      suiteID
    )
    for (let caseID of casesFromSuiteID) {
      if (casesFromRunID.includes(caseID)) {
        casesToBeExecuted.push(caseID)
      }
    }
    casesToBeExecuted.forEach(async (caseId) => {
      await removeOldResultFile()
      await createResultDirectory()
      process.env['CASE_PREFIX'] = `C${caseId}`
      console.log('Constant File : ', process.env['WL-NAME'])
      console.log(`********** Test case is running :- C${caseId} **********`)
      const cmd = `jest -t ${caseId} --json --outputFile=${reportDirectory}/C${caseId}_result.json`
      try {
        execSync(cmd)
      } catch (error) {
        console.log(`There is a problem in running ${caseId}`)
      }
      await pushResultToTestRail(runID, caseId)
    })
  }
}

async function executeSingleTestFromRunId(
  runID: number,
  caseId: number,
  clientName: string
) {
  let cmd: string = ''
  let testToBeExecuted: string = ''
  await removeOldResultFile()
  await createResultDirectory()
  if (clientName.includes('WL')) {
    const clientNameArray: string[]=clientName.split('-')
    testToBeExecuted = `${clientNameArray[clientNameArray.length-1]}-${caseId}` 
    cmd = `jest -t ${caseId} --json --outputFile=${reportDirectory}/C${testToBeExecuted}_result.json`
  } else {
    testToBeExecuted = `C${caseId}`
    cmd = `jest -t ${caseId} --json --outputFile=${reportDirectory}/C${testToBeExecuted}_result.json`
  }
  process.env['CASE_PREFIX'] = `C${caseId}`
  try {
    execSync(cmd)
  } catch (error) {
    console.log(`There is a problem in running ${caseId}`)
  }
  await pushResultToTestRail(runID, caseId)
}

yargs.command({
  command: 'dev',
  describe: 'Parameters to run automation by DEV',
  builder: {
    featurename: {
      describe: 'Title To add note',
      demandOption: true,
      type: 'string',
    },
    clientname: {
      describe: 'Select a client',
      demandOption: true,
      choices: [
        'xxxxxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxxxxx', 'WL-old-3.8', 'WL-new-3.8',
        'WL-yyy-3.7', 'WL-xxx-3.7', 'WL-zzz-3.7',
      ],
      type: 'string',
    },
  },

  handler: function (argv) {
    const featureName = argv.featurename as string
    const ClientName = argv.clientname as string
    executeFeature(featureName, ClientName)
  },
})

yargs.command({
  command: 'all-tests',
  describe: 'Parameters to run automation by QA',
  builder: {
    dbclean: {
      describe:
        'Provide true OR false whether you want to clean the DB before suite run',
      demandOption: true,
      type: 'boolean',
    },
    projectid: {
      describe: 'Provide TestRail Project ID',
      demandOption: true,
      type: 'number',
    },
    suiteid: {
      describe: 'Provide TestRail Suite ID',
      demandOption: true,
      type: 'number',
    },
    runid: {
      describe: 'Provide TestRail Run ID',
      demandOption: true,
      type: 'number',
    },
    clientname: {
      describe: 'Select a client',
      demandOption: true,
      choices: [
        'xxxxxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxxxxx', 'WL-old-3.8', 'WL-new-3.8',
        'WL-yyy-3.7', 'WL-xxx-3.7', 'WL-zzz-3.7'
      ],
      type: 'string',
    },
    featurename: {
      describe: 'WL Feature',
      demandOption: true,
      choices: ['None', 'WL-LIVE', 'WL-COMPLETED', 'WL-GENERAL'],
      type: 'string',
    },
  },

  handler: async function (argv) {
    const dbclean = (await argv.dbclean) as boolean
    if (dbclean) {
      await cleanUser()
    }
    const projectID = (await argv.projectid) as number
    const suiteID = (await argv.suiteid) as number
    const runID = (await argv.runid) as number
    const ClientName = argv.clientname as string
    const featureName = argv.featurename as string
    console.log(
      `------------------------------------Test is starting---------------------------------------------`
    )
    await executeAllTestFromRunId(
      projectID,
      suiteID,
      runID,
      ClientName,
      featureName
    )
  },
})

yargs.command({
  command: 'single-test',
  describe: 'Parameters to run automation by QA',
  builder: {
    dbclean: {
      describe:
        'Provide true OR false whether you want to clean the DB before suite run',
      demandOption: true,
      type: 'boolean',
    },
    runid: {
      describe: 'Provide TestRail Run ID',
      demandOption: true,
      type: 'number',
    },
    caseid: {
      describe: 'Provide TestRail Case ID',
      demandOption: false,
      type: 'number',
    },
    clientname: {
      describe: 'Select a client',
      demandOption: true,
      choices: [
        'xxxxxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxxxxx', 'WL-old-3.8', 'WL-new-3.8',
        'WL-yyy-3.7', 'WL-xxx-3.7', 'WL-zzz-3.7'
      ],
      type: 'string',
    },
  },

  handler: async function (argv) {
    const dbclean = (await argv.dbclean) as boolean
    if (dbclean) {
      await cleanUser()
    }

    const runID: any = await argv.runid
    const caseID: any = await argv.caseid
    const ClientName = argv.clientname as string
    await executeSingleTestFromRunId(runID, caseID, ClientName)
  },
})

yargs.parse()
