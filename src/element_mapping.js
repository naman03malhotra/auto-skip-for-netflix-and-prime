import { SKIP_INTRO, SKIP_RECAP, NEXT_EPISODE } from "./utils/i18n";

export const LOADING_TEXT = "Skipping...";

export const NETFLIX = "netflix";
const PRIME = "prime";

export const elementMapping = [
  {
    type: PRIME,
    selector: ".f1oordr3.f989gul.f1ap0gh8.fq4bwzw.f1ns8ocy.fx1l1v6.f19qnh9o",
    i18n: SKIP_RECAP,
  },
  {
    type: PRIME,
    selector: ".f17xk4du.fovm8oe",
    i18n: NEXT_EPISODE,
  },
  // {
  //   type: NETFLIX,
  //   selector: "[aria-label='Skip Intro']",
  // }, {
  //   type: NETFLIX,
  //   selector: ".skip-credits > a",
  // }, {
  //   type: NETFLIX,
  //   selector: "[aria-label='Skip Recap']",
  // }, {
  //   type: NETFLIX,
  //   selector: "[aria-label='Continue Playing']",
  // }, {
  //   type: NETFLIX,
  //   selector: ".interrupter-actions > .nf-icon-button:first-child",
  // }, {
  //   type: PRIME,
  //   selector: ".skipElement",
  // }, {
  //   type: PRIME,
  //   selector: ".adSkipButton",
  // }, {
  //   type: PRIME,
  //   selector: ".nextUpCard",
  // }, {
  //   type: PRIME,
  //   selector: "//div[text()='Skip Intro']",
  //   xpath: true
  // }, {
  //   type: PRIME,
  //   selector: "//div[text()='Skip Recap']",
  //   xpath: true
  // }, {
  //   type: PRIME,
  //   selector: "//div[text()='Skip']",
  //   xpath: true
  // }, {
  //   type: PRIME,
  //   selector: "//div[text()='Next Up']/parent::div/following-sibling::div",
  //   xpath: true,
  //   extraWait: true,
  // }
];
