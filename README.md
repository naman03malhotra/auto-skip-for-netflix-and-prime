# Auto Skip for Prime and NetFlix (ASPN)

Auto Skip Intro, Recaps for Prime and NetFlix

It is very tedious to skip those long intro sequences and recaps on Netflix and Amazon Prime, you have to press the skip button each time.

And those Ads on Amazon prime are so annoying, right? No worries, we have got you covered.

We have a solution for our super lazy user. Now you can:

- Auto Skips intros and recaps on both Netflix and Prime
- Auto Skips credits and play next episode on Prime
- Auto Skips "Continue watching on Netflix"
- Auto Skips Ads on Prime

## Chrome Store Link

https://chrome.google.com/webstore/detail/auto-skip-intro-for-prime/geikbfhmddindncdioecbgpehlhencaj?hl=en&gl=IN

## Product Hunt

https://www.producthunt.com/posts/auto-skip-intro-for-netflix-and-prime

## Development

clone the repo and run `npm run build`, make changes and test it in chrome dev mode.
I'll be delighted to receive a PR.

```
npm run build
```

or

```
yarn run build
```

## Analytics

I am pushing few analytics data points for debugging purposes.

Format

```js
{
  event: "Skipped",
  properties: {
    token: "<AuthKey>",
    extensionId: "<Chrome store extension id>",
    distinct_id: "<Chrome store extension id>",
    selector: "<Which element was skipped>",
    type: "<Prime or Netflix>",
    innerTextDatum: "<Inner text of the element>",
  },
};
```

The data is totally anonymous, you can also verify the same in the network tab.

## Feedback

If you like the extension and it solves your problem please leave a rating and review on the chrom web store.
Hit me up at `naman03malhotra@gmail.com` to say, Hi!
