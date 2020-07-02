import { secretKey } from "../../secret_key";
import { memoizedLocaleForPrime } from "./util";

export const { version = 'NOT_RECEIVED' } = chrome.runtime.getManifest();

function toBase64(data) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

async function sendData(data) {
  await fetch(`https://api.mixpanel.com/track/?data=${data}`);
}

export function sendAnalytics(data) {
  const base64data = toBase64(data);
  sendData(base64data);
}

export function errorTrack(error, triggerPoint = "GENERIC_ERROR") {
  const errData = {
    event: "ExecError",
    properties: {
      token: secretKey,
      message: error.message,
      errCode: error.errCode,
      osLocale: window.navigator.language,
      locale: memoizedLocaleForPrime('locale'),
      triggerPoint,
      version
    }
  }

  sendAnalytics(errData);
}
