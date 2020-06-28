import { secretKey } from "../secret_key";
import { sendAnalytics } from "./utils/analytics";
import {
  sleep,
  fetchDomNode,
  getInnerText,
  setInnerText,
  getLocaleForPrime,
  syncLocalData,
} from "./utils/util";

import { elementMapping, LOADING_TEXT } from "./element_mapping";

async function skipNetflixAndPrime() {
  let skipButton = fetchDomNode(elementMapping);
  let obj = {};

  obj = await syncLocalData("data");
  console.log("obj", obj);
  console.log("str", JSON.stringify(obj));

  if (!skipButton) {
    return;
  }

  const { domNode, type, selector, extraWait, i18n } = skipButton;

  if (domNode) {
    const innerText = getInnerText(domNode, type);

    if (innerText.toLowerCase() === LOADING_TEXT.toLowerCase()) {
      return;
    }

    const localeForPrime = getLocaleForPrime();
    if (!obj[localeForPrime]) obj[localeForPrime] = {};
    obj[localeForPrime][i18n] = innerText;
    console.log("fin", obj);
    chrome.storage.sync.set({ data: JSON.stringify(obj) }, function () {
      console.log("Data saved");
    });

    if (extraWait) {
      await sleep(800);
    }

    // await setInnerText(domNode, type, LOADING_TEXT);

    const data = {
      event: "Skipped_test",
      properties: {
        token: secretKey,
        extensionId:
          chrome.runtime && chrome.runtime.id
            ? chrome.runtime.id
            : "ID_NOT_PRESENT",
        distinct_id:
          chrome.runtime && chrome.runtime.id
            ? chrome.runtime.id
            : "ID_NOT_PRESENT",
        selector,
        type,
        innerTextDatum: innerText,
      },
    };
    console.log(domNode, "clicked");
    domNode.click();
    sendAnalytics(data);
  }
}

setInterval(() => skipNetflixAndPrime(), 1000);
