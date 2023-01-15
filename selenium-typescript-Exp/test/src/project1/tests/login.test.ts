import { WebDriver } from 'selenium-webdriver'
const dotenv = require('dotenv').config({ path: `.env.automation` })
import * as envObj from '../../utils/envBuilder'
import * as loginPage from '../pages/loginPage'
import * as usersPage from '../pages/usersPage'
import { LOGINDATA } from '../constants/Login'

const PMGTGLOBALADMINUSER: any = process.env.PMGTGLOBALADMINUSER
const PMGTPASSWORD: any = process.env.PMGTPASSWORD

describe('Login Page.', () => {
  let driver: WebDriver

  beforeAll(async () => {
    driver = await envObj.getHeadLessChromeDriver('chrome')
    await envObj.goToUrl(driver, LOGINDATA.partnerManagement.url)
  })

  afterAll(async () => {
    await driver.close()
    await driver.quit()
  })

  test('C687 Verify login Page', async () => {
    expect(await loginPage.doesWelcomeTextExist(driver)).toBe(true)
    expect(await loginPage.doesEmailTextBoxExist(driver)).toBe(true)
    expect(await loginPage.doesPasswordTextBoxExist(driver)).toBe(true)
    expect(await loginPage.doesSubmitBtnExist(driver)).toBe(true)
  })

})
