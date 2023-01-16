"use strict";
const confObj = require('../config')
const utilObj = require('./util');
const { selectors } = require('../../selectors');

const buildEnv = {
    get_environment1: async (envName, clientName) => {
        const context = await global.__BROWSER__.newContext();
        const conf = confObj.get_client_detail(clientName);
        const page = await context.newPage();
        switch (envName) {
            case 'localhost':
                await page.goto(conf.localhost, { 'waitUntil': "networkidle" });
                await page.waitForSelector(selectors.xxx);
                await utilObj.click(page, selectors.xxx);
                await page.waitForLoadState('networkidle');
                break;
            case 'stg':
                await page.goto(conf.url, { 'waitUntil': "networkidle" });
                break;
            default:
                console.log("You passed a wrong environment name");
                throw new Error("You passed a wrong environment name");
            }
        if (!page) {
          throw new Error("Connection wasn't established");
        }
        await page.setViewportSize({ width: 1437, height: 700 });
        return page;
      },
    
      get_environment2: async (clientName) => {
        const context = await global.__BROWSER__.newContext();
        const page = await context.newPage();
        const conf = confObj.get_client_detail(clientName);
        await page.goto(conf.usercreationurl);
        /**
         * Raise an error and stop the script if Connection wasn't established.
         */
        if (!page) {
          throw new Error("Connection wasn't established");
        }
        await page.setViewportSize({ width: 1437, height: 700 });
        return page;
      },
};

module.exports = buildEnv;