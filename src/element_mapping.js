import { translateLocale } from './utils/util';
import {
  SKIP_INTRO,
  SKIP_RECAP,
  NEXT_EPISODE,
  SKIP_ADS,
  NETFLIX,
  PRIME
} from './utils/i18n';

export const elementMapping = [{
  type: NETFLIX,
  selector: "[aria-label='Skip Intro']",
}, {
  type: NETFLIX,
  selector: ".skip-credits > a",
}, {
  type: NETFLIX,
  selector: "[aria-label='Skip Recap']",
}, {
  type: NETFLIX,
  selector: "[aria-label='Continue Playing']",
}, {
  type: NETFLIX,
  selector: ".interrupter-actions > .nf-icon-button:first-child",
}, {
  type: PRIME,
  selector: ".skipElement",
}, {
  type: PRIME,
  selector: ".adSkipButton",
}, {
  type: PRIME,
  selector: ".nextUpCard",
}, {
  type: PRIME,
  skipEvent: SKIP_INTRO,
  selector: `//div[text()="${translateLocale(SKIP_INTRO).translatedText}"]`,
  xpath: true,
  ...translateLocale(SKIP_INTRO),
}, {
  type: PRIME,
  skipEvent: SKIP_RECAP,
  selector: `//div[text()="${translateLocale(SKIP_RECAP).translatedText}"]`,
  xpath: true,
  ...translateLocale(SKIP_RECAP),
}, {
  type: PRIME,
  skipEvent: SKIP_ADS,
  selector: `//div[text()="${translateLocale(SKIP_ADS).translatedText}"]`,
  xpath: true,
  ...translateLocale(SKIP_ADS)
}, {
  type: PRIME,
  skipEvent: NEXT_EPISODE,
  selector: `//div[text()="${translateLocale(NEXT_EPISODE).translatedText}"]/parent::div/following-sibling::div`,
  extraWait: true,
  xpath: true,
  ...translateLocale(NEXT_EPISODE),
}];
