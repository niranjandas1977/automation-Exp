import TestrailApiClient = require('testrail-api')
import { TESTRAILDATA } from './testRailConstants'
const dotenv = require('dotenv').config({ path: `.env.automation` })
const TRUSER: any = process.env.TRUSER
const TRPASSWORD: any = process.env.TRPASSWORD

const testRailClient: TestrailApiClient = new TestrailApiClient({
  host: TESTRAILDATA.hostName,
  user: TRUSER,
  password: TRPASSWORD,
})

export async function getAutomatedCaseIds(projectID: number, suiteID: number) {
  interface testCasesObject {
    [key: string]: any
  }
  let caseIds: Array<number> = []
  await testRailClient
    .getCases(projectID, { suite_id: suiteID })
    .then(function (result) {
      const caseIdsObject: testCasesObject = result.body
      const testCases = caseIdsObject.cases
      testCases.forEach((element: any) => {
        if (
          element.custom_automation_type === TESTRAILDATA.automatedTestStatusID
        ) {
          caseIds.push(element.id)
        }
      })
    })
    .catch(function (error) {
      console.log('error:->', error.message)
    })
  return caseIds
}

export async function getAutomatedCaseIdsFromRunId(runID: number) {
  interface testCasesObject {
    [key: string]: any
  }
  let caseIds: Array<number> = []
  await testRailClient
    .getTests(runID, { status_id: TESTRAILDATA.passedTestStatusID })
    .then(function (result) {
      const caseIdsObject: testCasesObject = result.body
      const testCases = caseIdsObject.tests
      testCases.forEach((element: any) => {
          caseIds.push(element.case_id)
        
      })
    })
    .catch(function (error) {
      console.log('error:->', error.message)
    })
    await testRailClient
    .getTests(runID, { status_id: TESTRAILDATA.failedTestStatusID })
    .then(function (result) {
      const caseIdsObject: testCasesObject = result.body
      const testCases = caseIdsObject.tests
      testCases.forEach((element: any) => {
          caseIds.push(element.case_id)
        
      })
    })
    .catch(function (error) {
      console.log('error:->', error.message)
    })
  return caseIds
}

export async function updateResult(
  runID: number,
  caseID: number,
  statusID: number
) {
  await testRailClient
    .addResultForCase(runID, caseID, { status_id: statusID })
    .then(function (result) {
      console.log(`C${caseID} Result added in R${runID} successfully.`)
    })
    .catch(function (error) {
      console.log('error:->', error.message)
    })
}
