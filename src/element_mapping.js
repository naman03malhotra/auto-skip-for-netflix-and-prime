const NETFLIX = 'netflix';
const PRIME = 'prime';

export const elementMapping = [{
  type: NETFLIX,
  selector: "[aria-label='Skip Intro']",
},{
  type: NETFLIX,
  selector: "[aria-label='Skip Recap']",
},{
  type: PRIME,
  selector: ".skipElement",
},{
  type: PRIME,
  selector: ".adSkipButton",
},{
  type: PRIME,
  selector: ".nextUpCard",
}];
