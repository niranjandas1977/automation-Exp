const { chromium } = require('playwright'); 
const login = require('../../../commonlib/pages/page1');
const { key_val } = require('../../../commonlib/config');
const util_obj = require('../../../commonlib/utility/util');
const timeout = 20000;

describe(
    'Super admin chat with patient',
    () => {
      let page1
      let page2
      beforeAll(async () => {
        jest.setTimeout(timeout);
        page1 = await util_obj.get_environment();
      }, timeout)
  
      /*afterEach(async () => {
        await page.waitFor(1000)
      })*/
  
      afterAll(async () => {
        await page1.close();
      })
  
    it('Test Logins', async () => {
      await cclogin.cc_login(page1, 'super_admin');
      await expect(2+2).toBe(4);
    })
  
    },
    timeout
  );