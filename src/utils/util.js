import { NETFLIX } from '../element_mapping';

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchDomNode(elements) {
  for (element of elements) {
    const { selector, xpath } = element;
    let domNode;
    if (!xpath) {
      domNode = document.querySelector(selector);
    }

    if (!domNode && xpath) {
      domNode = document.evaluate(element.selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    if (domNode) {
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
