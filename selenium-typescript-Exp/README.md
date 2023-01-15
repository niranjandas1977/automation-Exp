# Getting Started with webdriver Automation.

This node automation framework will help both QA and DEV team in testing the GUI functionality. To use this framework:

1. Download the repo.
2. Install via yarn
3. Create `.env` file (Please refer the sample `.env.sample` file is already available in the repo) under the root directory of the project for the following variables:

`TRUSESR` :- This is the user email id for the TestRail.\
`TRPASSWORD` :- This is the user passowrd for the TestRail.\
`PMGTUSERONE` :- This is the user email id for the Partner Management portal.\
`PMGTPASSWORD` :- This is the user passowrd for the Partner Management portal.\

4. To run automation use `yarn start <available command> <required parameters>`.

## Available Commands to run automation.

To know the help on the available commands use following command\

`yarn start --help`

And you will notice the following commands in help output.

### dev

This command will be used by Dev team for the approval process of PR. Here we need to provide mandatory parameter `featurename`. The value of this must be a string. The value can be the any of the developed feature name and all the tests will run for that feature if it is available in the repo. Example as below:

`yarn start dev --featurename='Login' --clientname='WL-xyz'`

### all-test

This command will be used by QA team to run the tests available in the TestRail. Here we have 3 mandatory parameters such as `projectid`, `suiteid`, and `runid`. All of them needs the value of numeric type which are available in TestRail. After the test completes the status will be updated in TestRail. Example as below:

`yarn start all-tests --dbclean=false --projectid=2 --suiteid=4 --runid=26 --clientname='WL-xyz-3.7' --featurename='WL-LIVE'`

OR

`yarn start all-tests --dbclean=true --projectid=4 --suiteid=3 --runid=4 --clientname='WL-xyz' --featurename='None'`

### single-test

This command will be used by QA team to run any single test available in the TestRail. Here we have 2 mandatory parameters such as `runid` and `caseid`. All of them needs the value of numeric type which are available in TestRail. After the test completes the status will be updated in TestRail. Example as below:

`yarn start single-test --runid=4 --caseid=687`
