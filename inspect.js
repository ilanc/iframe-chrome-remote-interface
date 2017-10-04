let _url = "https://ilanc.github.io/iframe-chrome-remote-interface/iframe.html";
let _iframe = "iframe";
let _iframe_el = '#findme';

//Network.enable();
Page.enable();
Runtime.enable();

function sleep(miliseconds = 1000) {
  if (miliseconds == 0)
    return Promise.resolve();
  return new Promise(resolve => setTimeout(() => resolve(), miliseconds))
}

(async () => {
  await Page.navigate({ url: _url });
  await Page.loadEventFired();
  await sleep(1000); // frame src not rendered yet
  let exp = `document.querySelector('${_iframe}').contentDocument.querySelector('${_iframe_el}').innerText = 'Success!';`;
  console.log(exp);
  await Runtime.evaluate({ expression: exp });
})();