# execfile('~/temp/nedbank.py')
from __future__ import print_function

import os

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException

opts = Options()
prefs = {"download.default_directory" : os.getcwd(), "plugins.plugins_list": [{'enabled':False, 'name':'Chromium PDF Viewer'}]}
opts.add_experimental_option("prefs", prefs)
opts.add_argument('--no-sandbox')
browser = webdriver.Chrome(chrome_options=opts, executable_path=".\\chromedriver.exe", service_args=["--verbose", "--log-path=iframe.log"])
browser.implicitly_wait(10)
browser.get('https://ilanc.github.io/iframe-chrome-remote-interface/iframe.html')
browser.switch_to_default_content()
mainFrame = browser.find_element_by_name('frameMain')
browser.switch_to_frame(mainFrame) # How do they do this?
WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.ID, 'findme')))
elem = browser.find_element_by_id('findme')  # searches inside iframe
print(elem.text.strip())

# close browser
browser.quit()
browser = None