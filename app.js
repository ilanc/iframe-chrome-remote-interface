const CDP = require('chrome-remote-interface');

const defaultChromeDebugHost = "localhost"; // 0.0.0.0"; // 0.0.0.0 required inside docker container?
let _url = "https://ilanc.github.io/iframe-chrome-remote-interface/iframe.html";
let _iframe = "iframe";
let _iframe_el = '#findme';

async function run() {
  console.log('run');
  try {
    const version = await CDP.Version({ host: defaultChromeDebugHost, port: 9222 });
    console.log((new Date()).toISOString(), 'version', version);

    var client = await CDP({ host: defaultChromeDebugHost, port: 9222 });
    const { Runtime, Page } = client;

    // enable events
    await Promise.all([Runtime.enable(), Page.enable()]);

    // commands
    await Page.navigate({ url: _url });
    await Page.loadEventFired();
    await sleep(1000); // frame src not rendered yet
    let exp = `document.querySelector('${_iframe}').contentDocument.querySelector('${_iframe_el}').innerText = 'Success!';`;
    console.log(exp);
    await Runtime.evaluate({ expression: exp });

  } catch (err) {
    if (err.message && err.message === "No inspectable targets") {
      console.error("Either chrome isn't running or you already have another app connected to chrome - e.g. `chrome-remote-interface inspect`")
    } else {
      console.error(err);
    }
  } finally {
    if (client) {
      await client.close();
    }
  }
}

function sleep(miliseconds = 1000) {
  if (miliseconds == 0)
    return Promise.resolve();
  return new Promise(resolve => setTimeout(() => resolve(), miliseconds))
}

run();