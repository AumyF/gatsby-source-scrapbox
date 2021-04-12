# gatsby-source-scrapbox

Gatsby source plugin for sourcing data from [Scrapbox](https://scrapbox.io).

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

A string that represents project name you want to source from.
