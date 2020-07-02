import { secretKey } from '../secret_key';
import { sendAnalytics, version, errorTrack } from './utils/analytics';
import {
  sleep,
  fetchDomNode,
  getInnerText,
  setInnerText,
  getCountryAndState
} from './utils/util';
import { elementMapping } from './element_mapping';
import { LOADING_TEXT } from './utils/i18n';

const COUNTRY_API_FAILED = 'COUNTRY_API_FAILED';

async function skipNetflixAndPrime() {
  try {

    let skipButton;
    try {
      skipButton = fetchDomNode(elementMapping);
    } catch (err) {
      errorTrack(err, "FETCH_DOM_NODE");
    }

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

      let response;
      try {
        response = await getCountryAndState();
        response = await response.json();
      } catch (err) {
        const errObj = {
          message: err.message,
          errCode: response.status,
        };
        errorTrack(errObj, "COUNTRY_API_FUNC");
      }

      const countryName = response.country_name ? response.country_name : COUNTRY_API_FAILED;
      const countryCode = response.country_code ? response.country_code : COUNTRY_API_FAILED;
      const city = response.city ? response.city : COUNTRY_API_FAILED;

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
  catch (err) {
    errorTrack(err);
  }
}

setInterval(() => skipNetflixAndPrime(), 1000);
