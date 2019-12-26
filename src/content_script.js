import { secretKey } from '../secret_key';

const LOADING_TEXT = 'Skipping...';

const NETFLIX = 'netflix';
const PRIME = 'prime';

const elementMapping = [{
  type: NETFLIX,
  selector: "[aria-label='Skip Intro']",
},{
  type: NETFLIX,
  selector: "[aria-label='Skip Recap']",
},{
  type: PRIME,
  selector: ".skipElement",
},{
  type: PRIME,
  selector: ".adSkipButton",
},{
  type: PRIME,
  selector: ".nextUpCard",
}];

function toBase64(data) {
  return btoa(JSON.stringify(data));
}

async function sendData(data) {
  await fetch(`https://api.mixpanel.com/track/?data=${data}`);
}

function sendAnalytics(data) {
  const base64data = toBase64(data);
  sendData(base64data);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchDomNode(elements) {
  for(element of elements) {
    const domNode = document.querySelector(element.selector);

    if(domNode) {
      return {
        ...element,
        domNode,
      };
    }
  }
}

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
