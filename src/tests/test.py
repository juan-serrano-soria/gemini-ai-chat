import unittest
import base64
from appium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy

capabilities = dict(
    platformName='Android',
    automationName='uiautomator2',
    deviceName='emulator-5554',
    appPackage='com.example.framework7',
    appActivity='.MainActivity',
    language='en',
    locale='US'
)

appium_server_url = 'http://localhost:4723'

class TestAppium(unittest.TestCase):
    def setUp(self) -> None:
        self.driver = webdriver.Remote(appium_server_url, options=UiAutomator2Options().load_capabilities(capabilities))
        self.driver.start_recording_screen()

    def tearDown(self) -> None:
        # Stop the screen recording and save the video file
        video_data = self.driver.stop_recording_screen()
        with open("screen_recording.mp4", "wb") as out_file:
            out_file.write(base64.b64decode(video_data))

        self.driver.get_screenshot_as_file('screenshot_on_teardown.png')


        if self.driver:
            self.driver.quit()

    def test_gemi(self) -> None:
        wait = WebDriverWait(self.driver, 1800)  # wait up to 1800 seconds
        input_element = wait.until(EC.presence_of_element_located((AppiumBy.XPATH, '//android.widget.EditText')))
        self.driver.get_screenshot_as_file('screenshot_initial_state.png')
        input_element.click()
        input_element.send_keys('What is the capital of Japan?')
        wait.until(lambda driver: input_element.get_attribute('text') == 'What is the capital of Japan?')
        link = wait.until(EC.presence_of_element_located((AppiumBy.XPATH,  '//*[@text="Send"]')))
        self.driver.get_screenshot_as_file('screenshot_after_input.png')
        link.click()
        text_element = wait.until(EC.presence_of_element_located((AppiumBy.XPATH, '//*[@text="What is the capital of Japan?"]')))
        text_element = wait.until(EC.presence_of_element_located((AppiumBy.XPATH, '//*[@text="Tokyo"]')))
        text = text_element.text
        if text == 'Tokyo':
            print('Text "Tokyo" found')
        else:
            print('Text "Tokyo" not found')
        self.driver.get_screenshot_as_file('screenshot_after_click.png')

if __name__ == '__main__':
    unittest.main()
