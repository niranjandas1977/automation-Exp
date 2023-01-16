const util_obj = require('../../../utility/util');
const { selectors } = require('../../selectors1');

module.exports = {
    /**
       * xxxxxxxxxxxxx
       * @param param1: xxxxxxx
       * @param param2: xxxxxx
       * @param snooze: xxxxxx
       */
    search_scripts: async (page, param2) => {
        //Validate script_process_object Object
        expectedKeys = ['xxxxx', 'xxxxx', 'xxxxx', 'xxxxx'];
        util_obj.validate_object_keys(param2, expectedKeys, 'xxxxxx')
        
        if (param2.xxx != undefined) {
            await page.waitForSelector(param2.x);
        }
        if (param2.xxx != undefined) {
            await page.waitForSelector(param2.x);
        }
        if (param2.xxx != undefined) {
            await page.waitForSelector(param2.x);
        } 
      },
  };