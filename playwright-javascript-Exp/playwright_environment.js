const chalk = require('chalk')
const NodeEnvironment = require('jest-environment-node')
//const playwright = require('playwright')
const { chromium } = require('playwright');
const fs = require('fs')
const os = require('os')
const path = require('path')

const DIR = path.join(os.tmpdir(), 'jest_playwright_global_setup')

class PlaywrightEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'));
    await super.setup();
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }
    this.global.__BROWSER__ = await chromium.connect({ wsEndpoint });
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'))
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = PlaywrightEnvironment