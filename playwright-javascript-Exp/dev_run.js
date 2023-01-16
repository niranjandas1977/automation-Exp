const { execSync } = require("child_process");
const chalk = require('chalk');
const fs = require('fs');
const envName = process.argv[2]; 
const clientName = process.argv[3]; 
function validate_args() {
  try {

    if (process.argv.length != 4) {
      throw new Error("Total number of arguments should be 4");
    }
    let supportiveEnvNameList = ['localhost', 'stg', 'dev'];
    if (! supportiveEnvNameList.includes(envName)) {
      throw new Error("second argument must be environment name from ['localhost', 'stg', 'dev'].");
    }
    let supportiveClientList = ['HOTIZON', 'JOURNI', 'SURA'];
    if (! supportiveClientList.includes(clientName)) {
      throw new Error("Third argument name should be client name from ['clientName1', 'clientName2', 'clientName3'].");
    }
  }
  catch (e) {
    console.error(e.message);
  }

}

async function execute(test) {
    let cmd = "npm test -- src/tests/"+test+".spec.js " + envName + " " + clientName;
    try {
    execSync(cmd);
    }
    catch (error) {
        console.log(`error: ${error.message}`);    
    }
  return;
  }

async function main() {

let tests = ['testchat', 'testmembers', 'testhandoff'];
for (test of tests) {
    console.log(chalk.green('Test for '+ test + 'started.'));
    await execute(test);
    }
}


const reportFile = './test-report.html';

try{
  fs.unlinkSync(reportFile);
 }catch(err){
  console.log(err);
 }
 try{
  execSync("touch " + reportFile);
 }catch(err){
  console.log(err);
 }
validate_args();
main();