function toBase64(data) {
  return btoa(JSON.stringify(data));
}

async function sendData(data) {
  await fetch(`https://api.mixpanel.com/track/?data=${data}`);
}

export function sendAnalytics(data) {
  const base64data = toBase64(data);
  sendData(base64data);
}
