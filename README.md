# Auto Skip for Prime and NetFlix (ASPN)

[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/geikbfhmddindncdioecbgpehlhencaj?color=g&label=Chrome%20Store%20Users)](https://chrome.google.com/webstore/detail/auto-skip-intro-for-prime/geikbfhmddindncdioecbgpehlhencaj)
![Chrome Web Store](https://img.shields.io/chrome-web-store/rating/geikbfhmddindncdioecbgpehlhencaj)

Netflix, Prime, JioCinema, Hotstar Skip Intros Automatically

It is very tedious to skip those long intro sequences and recaps on OTTs, you have to press the skip button each time.

And those Ads on Amazon prime are so annoying, right? No worries, we have got you covered.

We have a solution for our super lazy user. Now you can:

- Auto Skips intros and recaps on Netflix, Prime, JioCinema, Hotstar
- Auto Skips "Continue watching on Netflix"

## Chrome Store Link

https://chrome.google.com/webstore/detail/auto-skip-intro-for-prime/geikbfhmddindncdioecbgpehlhencaj?hl=en&gl=IN

## Product Hunt

https://www.producthunt.com/posts/auto-skip-intro-for-netflix-and-prime

## Development

clone the repo and run `npm run build:dev`, make changes and test it in chrome dev mode.
I'll be delighted to receive a PR.

```
npm run build:dev
```

or

```
yarn run build:dev
```

## Add your national language (Prime)

So currently Skip Intro, Skip Recap, Next episode skip works for 22 languages supported by prime.
But skip Ads in only supported in a few languages, to enable that in your language, I would need your help in translation of the word `Skip` to your national language.

Please have a look at the file `src/utils/i18n.js`, and add the respective value against keyword `skip_ads` in `i18nMap`.

Please test it in your system, raise a PR and tag me for review. Ping me if you have any doubts.

The data is totally anonymous, you can also verify the same in the network tab.
