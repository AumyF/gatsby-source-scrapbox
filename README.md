# gatsby-source-scrapbox

Gatsby source plugin for sourcing data from [Scrapbox](https://scrapbox.io).

> This plugin is not developed by Scrapbox and please do not report issues to them.

> As described in https://scrapbox.io/help-jp/API, Scrapbox's API is subject to change without notice. If you find the plugin breaking, feel free to open an issue.

## Installation

(not published yet)

```
npm i gatsby-source-scrapbox
```

```js
// in your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-scrapbox`,
    options: {
      projectName: `name-of-your-project`,
    },
  },
];
```

## Options

### `projectName`

- type: `string`
- required

A string that represents project name you want to source from.

### `limit`

- type: `number`
- optional

Maximum number of pages to fetch.

### `skip`

- type: `number`
- optional

Number of pages to skip fetching.
