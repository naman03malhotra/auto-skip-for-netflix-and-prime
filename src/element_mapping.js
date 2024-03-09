import { translateLocale, memoizedLocale } from "./utils/util";
import {
  SKIP_INTRO,
  SKIP_RECAP,
  NEXT_EPISODE,
  SKIP_ADS,
  NETFLIX,
  PRIME,
  HOTSTAR,
  JIOCINEMA,
  SKIP_CONTINUE_WATCHING_NETFLIX
} from "./utils/i18n";

const locale = memoizedLocale("locale");

export const elementMapping = [
  {
    type: NETFLIX,
    selector: "[aria-label='Skip Intro']",
    locale,
    skipEvent: SKIP_INTRO,
  },
  {
    type: NETFLIX,
    selector: "[data-uia='player-skip-intro']",
    locale,
  },
  {
    type: NETFLIX,
    selector: ".skip-credits > a",
    locale,
    skipEvent: SKIP_INTRO,
  },
  // disabled it for now until I work on the UI

  // {
  //   type: NETFLIX,
  //   selector:
  //       "[data-uia='next-episode-seamless-button']",
  //   locale,
  // },

  // {
  //   type: NETFLIX,
  //   selector: "[aria-label='Skip Recap']",
  //   locale,
  // },
  // {
  //   type: NETFLIX,
  //   selector: "[data-uia='player-skip-recap']",
  //   locale,
  // },
  {
    type: NETFLIX,
    selector: "[aria-label='Continue Playing']",
    locale,
    skipEvent: SKIP_CONTINUE_WATCHING_NETFLIX,
  },
  // {
  //   type: NETFLIX,
  //   selector: "[aria-label='next-episode-seamless-button']",
  //   locale,
  // },
  {
    type: NETFLIX,
    selector: ".interrupter-actions > .nf-icon-button:first-child",
    locale,
    skipEvent: SKIP_CONTINUE_WATCHING_NETFLIX,
  },
  {
    type: PRIME,
    selector: ".skipElement",
    locale,
    skipEvent: SKIP_INTRO,
  },
  {
    type: PRIME,
    selector: ".adSkipButton",
    locale,
    skipEvent: SKIP_INTRO,
  },
  // {
  //   type: PRIME,
  //   selector: ".nextUpCard",
  //   locale,
  // },
  {
    type: PRIME,
    skipEvent: SKIP_INTRO,
    selector: `//*[text()="${translateLocale(SKIP_INTRO).translatedText}"]`,
    xpath: true,
    ...translateLocale(SKIP_INTRO),
  },
  // {
  //   type: PRIME,
  //   skipEvent: SKIP_RECAP,
  //   selector: `//*[text()="${translateLocale(SKIP_RECAP).translatedText}"]`,
  //   xpath: true,
  //   ...translateLocale(SKIP_RECAP),
  // },
  {
    type: PRIME,
    skipEvent: SKIP_ADS,
    selector: `//*[text()="${translateLocale(SKIP_ADS).translatedText}"]`,
    xpath: true,
    ...translateLocale(SKIP_ADS),
  },
  // {
  //   type: PRIME,
  //   skipEvent: NEXT_EPISODE,
  //   selector: `//*[text()="${
  //     translateLocale(NEXT_EPISODE).translatedText
  //   }"]/parent::div/following-sibling::div`,
  //   extraWait: true,
  //   xpath: true,
  //   ...translateLocale(NEXT_EPISODE),
  // },
  {
    type: HOTSTAR,
    skipEvent: SKIP_INTRO,
    selector: `//*[text()="${translateLocale(SKIP_INTRO).translatedText}"]`,
    xpath: true,
    ...translateLocale(SKIP_INTRO),
  },
  // {
  //   type: HOTSTAR,
  //   skipEvent: NEXT_EPISODE,
  //   selector: `//*[text()="${translateLocale(NEXT_EPISODE).translatedText}"]`,
  //   xpath: true,
  //   extraWait: true,
  //   ...translateLocale(NEXT_EPISODE),
  // },
  {
    type: JIOCINEMA,
    skipEvent: SKIP_INTRO,
    selector: '[aria-label="skip intro"]',
    locale,
  },
  {
    type: JIOCINEMA,
    skipEvent: SKIP_ADS,
    selector: '[aria-label="Skip Ad"]',
    locale,
  }
];
