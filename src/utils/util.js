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
