"use strict";


const confObj = require('../config')

const { login_selectors } = require('../selectors');
const util = {
  click: async (page, selector, snooze = 30000) => {
    try {
      await (await util.getElement(page, selector, 'click', snooze = snooze)).click();
    } catch (error) {
      throw new Error(`could not click on selector: ${selector}.`);
    }
  },

  typeText: async (page, text, selector, snooze = 30000) => {
    try {
      await page.waitForSelector(selector, { state: "visible", timeout: parseInt(snooze) }).then(() => page.type(selector, text));
    } catch (error) {
      throw new Error(
        `could not type text: ${text} -  in the selector: ${selector}`
      );
    }
  },

  loadUrl: async (page, url) => {
    await page.goto(url, { waitUntil: 'networkidle0' });
  },

  getText: async (page, selector, snooze = 30000) => {
    try {
      return await page.waitForSelector(selector, { state: "visible", timeout: parseInt(snooze) }).then(() =>
        page.$eval(selector, e => e.textContent));
    } catch (error) {
      throw new Error(`Cannot get text from selector: ${selector}`);
    }
  },

  getCount: async (page, selector, snooze = 30000) => {
    try {
      return await page.waitForSelector(selector, { state: "visible", timeout: parseInt(snooze) }).then(() =>
        page.$$eval(selector, items => items.length));
    } catch (error) {
      throw new Error(`Cannot get total count of elements: ${selector}`);
    }
  },

  waitForText: async (page, selector, content, snooze = 30000) => {
    try {
      await page.waitForSelector(selector, { state: "visible", timeout: parseInt(snooze) }).then(() =>
        page.waitForFunction(
          (selector, text) =>
            document.querySelector(selector).textContent.includes(content),
          {},
          selector,
          text
        ));
    } catch (error) {
      throw new Error(`${text} was not found for selector: ${selector}`);
    }
  },

  pressKey: async (page, key, snooze = 2000) => {
    try {
      await page.keyboard.press(key, { delay: parseInt(snooze) });
    } catch (error) {
      throw new Error(`could not press key: ${key} on the keyboard`);
    }
  },

  findByLinkText: async (page, linkString) => {
    const links = await page.$$('a');
    for (let i = 0; i < links.length; i++) {
      let valueHandle = await links[i].getProperty('innerText');
      let linkText = await valueHandle.jsonValue();
      linkText = linkText.replace(/\r\n|\r/g, '\n');
      linkText = linkText.replace(/\ +/g, ' ');

      // Replace &nbsp; with a space
      const nbspPattern = new RegExp(String.fromCharCode(160), 'g');
      const text = linkText.replace(nbspPattern, ' ');

      if (linkString == text) {
        return links[i];
      }
    }
    return null;
  },

  /**
   * Get the Element by give text
   */
  get_element_visible_status: async (page, selector, snooze = 10000) => {
    try{
      await page.waitForSelector(selector, { state: "visible", timeout: parseInt(snooze) });
      return true;
    }
    catch {
      return false;
    }
    
  },

  /**
   * Get the Element index by give text
   */
  get_element_index_by_text: async (page, selector, text_content) => {
    await page.waitForSelector(selector);
    const elements = await page.$$(selector);
    const item_text_array = await page.$$eval(selector, items => items.map(item => item.textContent));
    for (let index = 0; index < item_text_array.length; ++index) {
      if (item_text_array[index].trim() == text_content) {
        return elements[index];
      }
    }
  },

  /**
   * Get the combo box drop down option index
   */
  get_dropdown_option_index: async (page, selector, text_content) => {
    const option_index = await page.evaluate(([option_selector, option_value]) => {
      let arr = document.querySelectorAll(option_selector);
      for (let index = 0; index < arr.length; ++index) {
        if (arr[index].text == option_value) {
          return Promise.resolve(index);
        }
      }
    }, [selector, text_content]);
    return option_index;
  },

  /**
   * Verify the Object is meet the expectation
   */
  validate_object_keys: (processObject, expectedKeys, objectName) => {
    let receivedKeys = Object.keys(processObject);
    try {
      for (let index = 0; index < receivedKeys.length; index++) {
        if (expectedKeys.includes(receivedKeys[index])) {
          continue;
        }
        else {
          throw `${receivedKeys[index]} is not a valid key for implementation your ${objectName} object.`;
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * Get the current local calendar date
   * @author Aftab
   * @example getCalendar({})
   */
  getCalendar: async (options) => {
    if (options != undefined) {
      expectedKeys = ['previousYear', 'previousMonth', 'previousDate', 'nextYear', 'nextMonth', 'nextDate'];
      util.validate_object_keys(options, expectedKeys, 'Get Calendar')
    }
    const today = new Date();
    const calendarDate = today.toISOString().split('T')[0].split('-');
    return {
      year: calendarDate[0],
      month: calendarDate[1],
      date: calendarDate[2]
    }
  },

  /**
   * Get the Current local time
   */
  getCurrentTime: async (options) => {
    if (options != undefined) {
      expectedKeys = ['previousHours', 'previousMinutes', 'previousseconds', 'nextHours', 'nextMinutes', 'nextseconds'];
      util.validate_object_keys(options, expectedKeys, 'Get Current Time')
    }
    const today = new Date();
    const calendarDate = today.toISOString().split('T')[1].split(':');
    return {
      hours: (((today.getHours() % 12 || 12) < 10) ? `0${(today.getHours() % 12 || 12)}` : (today.getHours() % 12 || 12)).toString(),
      minutes: calendarDate[1],
      seconds: calendarDate[2].split('.')[0],
      meridiem: today.toLocaleTimeString().split(' ')[1]
    }
  },

  /**
   * Find the Element by using CSS selector or Xpath and return the element
   */
  getElement: async (page, selector, target, snooze = 30000) => {
    try {
      const element = await page.waitForSelector(selector, { state: "visible", timeout: parseInt(snooze) }).then(() =>
        page.$(selector));
      if (!element) {
        throw `Cannot find target  ${target} ${selector}`;
      }
      return element;
    } catch (error) {
      throw new Error(error)
    }
  },

  /**
   * Find the Elements by using CSS selector or Xpath and return the elements Array.
   */
  getElements: async (page, selector, target) => {
    try {
      const element = await page.$$(selector);
      if (!element) {
        throw `Cannot find target  ${target} ${selector}`;
      }
      return element;
    } catch (error) {
      throw new Error(error)
    }
  },

};

module.exports = util;