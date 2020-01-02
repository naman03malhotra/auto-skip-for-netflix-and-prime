import { secretKey } from '../secret_key';
import { sendAnalytics } from './utils/analytics';
import { sleep, fetchDomNode } from './utils/util';
import { elementMapping } from './element_mapping';

const LOADING_TEXT = 'Skipping...';

async function skipNetflixAndPrime() {
  const skipButton = fetchDomNode(elementMapping);

  if(!skipButton) {
    return;
  }

  const { domNode, type, selector } = skipButton;

  if(domNode) {
    const data = {
      event: "Skipped",
      properties: {
        time: Date.now(),
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
  }
}

setInterval(() =>  skipNetflixAndPrime(), 1000);
