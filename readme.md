# Access elements inside iFrame in chrome-remote-interface

## Goal
Selenium/chromedriver allows you to access elements inside iFrames using [switch_to_frame](http://selenium-python.readthedocs.io/navigating.html#moving-between-windows-and-frames) e.g.:
```python
mainFrame = browser.find_element_by_name('frameMain')
browser.switch_to_frame(mainFrame) # how do they do this?
elem = browser.find_element_by_id('findme') # searches inside frameMain iframe
```
How do we implement this functionality using `chrome-remote-interface`

## Install

```bash
# python & pip
sudo apt-get update && apt-get install -y python python-pip
# selenium
sudo pip install selenium
# chromedriver
CHROMEDRIVER_VERSION=2.30
curl -SLO "https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip" \
  && sudo unzip "chromedriver_linux64.zip" -d /usr/local/bin \
  && rm "chromedriver_linux64.zip"
# chrome
# need chrome or chromium installed
```

## Run
```bash
python iframe.py
```
NOTES:
* runs on windows atm with `chromedriver.exe` included. Download other version [here](https://sites.google.com/a/chromium.org/chromedriver/downloads)
* accesses the `iframe.html` - currently hosted [here](https://ilanc.github.io/iframe-chrome-remote-interface/iframe.html)
