import { secretKey } from '../secret_key';
import { sendAnalytics } from './utils/analytics';
import {
  sleep,
  fetchDomNode,
  getInnerText,
  setInnerText,
  getCountryAndState
} from './utils/util';
import { elementMapping } from './element_mapping';
import { LOADING_TEXT } from './utils/i18n';

const { version = 'NOT_RECEIVED' } = chrome.runtime.getManifest();

async function skipNetflixAndPrime() {
  let skipButton = fetchDomNode(elementMapping);

  if (!skipButton) {
    return;
  }

  const { domNode, type, extraWait, ...rest } = skipButton;

  if (domNode) {
    const innerText = getInnerText(domNode, type);

    if (innerText.toLowerCase() === LOADING_TEXT.toLowerCase()) {
      return;
    }

    if (extraWait) {
      await sleep(800);
    }

    await setInnerText(domNode, type, LOADING_TEXT);

    const response = await getCountryAndState();
    const {
      country_name: countryName,
      city,
      country_code: countryCode,
    } = await response.json();

    const data = {
      event: "Skipped",
      properties: {
        token: secretKey,
        extensionId: chrome.runtime && chrome.runtime.id ? chrome.runtime.id : 'ID_NOT_PRESENT',
        type,
        innerTextDatum: innerText,
        countryName,
        countryCode,
        city,
        version,
        osLocale: window.navigator.language,
        ...rest
      },
    };

    domNode.click();
    sendAnalytics(data);
  }
}

setInterval(() => skipNetflixAndPrime(), 1000);
