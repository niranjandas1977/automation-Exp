const util_obj = require('../../../utility/util');
const { selectors } = require('../../selectors2');

const patientChat = {
    prop1: async (page) => {
        await util_obj.pressKey(page, "Enter");
        await page.waitForTimeout(2000);
      },

    prop2: async (page) => {
      await page.waitForSelector(selectors.xxxx);
      var messages = await page.$$eval(selectors.xxxxx, elements=> elements.map(item=>item.textContent));
      return messages;
    },

  };
  module.exports = patientChat;