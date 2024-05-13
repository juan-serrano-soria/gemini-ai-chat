const {remote} = require('webdriverio');
const url = require('url');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'emulator-5554',
  'appium:appPackage': 'com.example.framework7',
  'appium:appActivity': '.MainActivity',
};

const appium_server_url = 'http://localhost:4723';
const parsedUrl = new URL(appium_server_url);

const wdOpts = {
  hostname: parsedUrl.hostname,
  port: parseInt(parsedUrl.port, 10),
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const input = await driver.$('//android.widget.EditText');
    await input.waitForExist(600000);  // wait up to 10 mins
    await input.setValue('What is the capital of Japan?');
    const link = await driver.$('//android.widget.TextView[@text="Send"]');
    await link.waitForExist(600000);  // wait up to 10 mins
    await link.click();
    const textElement = await driver.$('//android.widget.TextView[@text="Tokyo"]');
    await textElement.waitForExist(600000);  // wait up to 10 mins
    const text = await textElement.getText();

    if (text === 'Tokyo') {
      console.log('Text "Tokyo" found');
    } else {
      console.log('Text "Tokyo" not found');
    }

  } finally {
    await driver.pause(3000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
