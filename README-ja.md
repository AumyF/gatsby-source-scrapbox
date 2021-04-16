# gatsby-source-scrapbox

[Scrapbox](https://scrapbox.io) からデータを取得する Gatsby の source plugin です.

> このプラグインは非公式です。このプラグインの問題を Scrapbox 公式に投げないでください。

> https://scrapbox.io/help-jp/API にもあるように、Scrapbox の API は予告なしで変更されます。プラグインが動作しなくなっていることに気付いた際には issue をお願いします。

## 機能

- [x] プロジェクトのページ一覧の取得
- [ ] ページの詳細な情報の取得
- [ ] 画像の取得

## インストール

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

## プラグインのオプション

### `projectName`

- type: `string`
- 必須

取得したい Scrapbox のプロジェクト名です。

### `limit`

- type: `number`
- 省略可

取得するページの最大数です。

### `skip`

- type: `number`
- 省略可

何番目から取得するかを指定します。
