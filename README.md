<h1 align="center">
 markdown-it-meta-yaml
</h1>

<h3 align="center">
  Markdown-It plugin for parsing YAML front matter.
</h3>

[![NPM version](https://img.shields.io/npm/v/markdown-it-meta-yaml?color=a1b858&label=)](https://www.npmjs.com/package/markdown-it-meta-yaml)

Parsing YAML-formatted metadata from markdown files and converting it into JSON-formatted data. 

🥳 All YAML values are supported - powered by [js-yaml](https://github.com/nodeca/js-yaml)

```markdown
---
title: Hello Markdown
date: 2023-03-25 12:00
score: 1.8
tags:
  - frontend
  - markdown
---
```

👇🏻

```json
{
  "title": "Hello Markdown",
  "date": "2023-03-25 12:00",
  "score": 1.8,
  "tags": [
    "frontend",
    "markdown"
  ]
}
```

## Usage

Use it as a plugin for [markdown-it](https://github.com/markdown-it/markdown-it)

```bash
npm install markdown-it-meta-yaml
```

```ts
import MarkdownIt from 'markdown-it'
import markdownItMetaYaml from 'markdown-it-meta-yaml'

const markdownIt = new MarkdownIt()
markdownIt.use(markdownItMetaYaml, {
  cb: (metaJSON, metaRaw) => console.log(metaJSON, metaRaw)
})

// metaJSON =>
// {
//   "title": "Hello Markdown",
//   "date": "2023-03-25 12:00",
//   "score": 1.8,  
//   "tags": [
//     "frontend",
//     "markdown"
//   ]
// }

// metaRaw =>
// title: Hello Markdown
// date: 2023-03-25 12:00
// score: 1.8
// tags:
//   - frontend
//   - markdown
```

## License

[MIT](./LICENSE) License © 2023 [Kricsleo](https://github.com/kricsleo)
