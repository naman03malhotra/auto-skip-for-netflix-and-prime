import { secretKey } from '../secret_key';
import { sendAnalytics } from './utils/analytics';
import { sleep, fetchDomNode, throttle } from './utils/util';
import { elementMapping } from './element_mapping';

const LOADING_TEXT = 'Skipping...';
let prevSelector = undefined;

async function skipNetflixAndPrime() {
  const skipButton = fetchDomNode(elementMapping);

  if(!skipButton) {
    return;
  }

  const { domNode, type, selector } = skipButton;

  if(domNode) {
    if(selector === prevSelector) {
      return;
    }

    const data = {
      event: "Skipped",
      properties: {
        token: secretKey,
        extensionId: chrome.runtime.id,
        distinct_id: chrome.runtime.id,
        selector,
        type,
      },
    };

    if(selector === '.nextUpCard') {
      await sleep(2000);
    }

    if (type === 'netflix') {
      domNode.firstElementChild.innerHTML = LOADING_TEXT;
      await sleep(500);
    } else {
      domNode.innerHTML = LOADING_TEXT;
      await sleep(1000);
    }

    domNode.click();

    sendAnalytics(data);
    prevSelector = selector;
  }
}
// setInterval(() =>  skipNetflixAndPrime(), 1000);

// Testing via mutation obs

const throttledFunction = throttle(skipNetflixAndPrime, 1050);

const config = { attributes: true, childList: true, subtree: true };

const appLevelObserver = new MutationObserver(throttledFunction);

const appLevelTarget = document.getElementsByTagName('body')[0];

appLevelObserver.observe(appLevelTarget, config);
