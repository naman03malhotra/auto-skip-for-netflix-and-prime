import { NETFLIX } from '../element_mapping';

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

export function getInnerText(domNode, type) {
  if (type === NETFLIX && domNode.firstElementChild) {
    return domNode.firstElementChild.innerText;
  }

  return domNode.innerText;
}

export async function setInnerText(domNode, type, text) {
  if (type === NETFLIX && domNode.firstElementChild) {
    domNode.firstElementChild.innerText = text;
    await sleep(500);
    return;
  }

  domNode.innerText = text;
  await sleep(1000);
}
