export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchDomNode(elements) {
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

export function throttle(passedFunc, time = 0) {
  let lastTime = 0;
  return function(...args) {
    const currentTime = Date.now();
    if (currentTime - lastTime > time) {
      lastTime = currentTime;
      return passedFunc.apply(this, args);
    }
  }
}
