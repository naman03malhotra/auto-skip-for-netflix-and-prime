import { secretKey } from "../secret_key";
import { sendAnalytics, version, errorTrack } from "./utils/analytics";
import {
  sleep,
  fetchDomNode,
  getInnerText,
  setInnerText,
  getCountryAndState,
} from "./utils/util";
import { elementMapping } from "./element_mapping";
import { LOADING_TEXT } from "./utils/i18n";

const COUNTRY_API_FAILED = "COUNTRY_API_FAILED";
const REQUEST_BLOCKED = "REQUEST_BLOCKED";

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
        await sleep(700);
      }

      await setInnerText(domNode, type, LOADING_TEXT);
      domNode.click();

      let response;
      try {
        response = await getCountryAndState();
        response = await response.json();
      } catch (err) {
        const errObj = {
          message: err.message,
          errCode: response ? response.status : REQUEST_BLOCKED,
        };
        errorTrack(errObj, "COUNTRY_API_FUNC");
      }

      const countryName = response
        ? response.country_name
          ? response.country_name
          : COUNTRY_API_FAILED
        : REQUEST_BLOCKED;
      const countryCode = response
        ? response.country_code
          ? response.country_code
          : COUNTRY_API_FAILED
        : REQUEST_BLOCKED;
      const city = response
        ? response.city
          ? response.city
          : COUNTRY_API_FAILED
        : REQUEST_BLOCKED;

      const data = {
        event: "Skipped",
        properties: {
          token: secretKey,
          extensionId:
            chrome.runtime && chrome.runtime.id
              ? chrome.runtime.id
              : "ID_NOT_PRESENT",
          type,
          innerTextDatum: innerText,
          countryName,
          countryCode,
          city,
          version,
          osLocale: window.navigator.language,
          ...rest,
        },
      };

      sendAnalytics(data);
    }
  } catch (err) {
    errorTrack(err);
  }
}

setInterval(() => skipNetflixAndPrime(), 850);
