import { WebDriver } from 'selenium-webdriver'
import * as envObj from '../../../utils/envBuilder'
import * as loginPage from '../pages/loginPage'
import * as fs from 'fs'

let CLIENTNAME = process.env.CLIENTNAME
if (CLIENTNAME.includes('WL')) {
  process.env['WL-NAME'] = CLIENTNAME.slice(3)
} else {
  process.env['WL-NAME'] = 'old-xxx'
}
const dataSet = require(`../../constants/${process.env['WL-NAME']}`)

jest.setTimeout(2700 * 1000)
describe('3.7-WL-LIVE', () => {
  let driver: WebDriver
  beforeAll(async () => {
    driver = await envObj.getHeadLessChromeDriver('chrome')

    await envObj.goToUrl(driver, dataSet.LOGINDATA.envUrl)
    await loginPage.login(
      driver,
      dataSet.LOGINDATA.email,
      dataSet.LOGINDATA.password
    )
  })

  afterAll(async () => {
    await driver.close()
    await driver.quit()
  })
  //pre-waiting room

  test('3.7-C1742', async () => {
    process.env['CASE_PREFIX'] = 'C1742'
    if (await videoPlayerPage.getWaitingRoomOpenStatus(driver)) {
      console.log(await leaderboardPage.verifyChatContainerExist(driver))
    }
  })
})
