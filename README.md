[![Build Status](https://travis-ci.com/p1ho/site-validator-cli.svg?branch=master)](https://travis-ci.com/p1ho/site-validator-cli)
[![Coverage Status](https://coveralls.io/repos/github/p1ho/site-validator-cli/badge.svg?branch=master)](https://coveralls.io/github/p1ho/site-validator-cli?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# site-validator-cli
A command line tool that takes in a URL or a file, then uses **[html-validator](https://www.npmjs.com/package/html-validator)** (a wrapper for https://validator.w3.org/nu/) to validate each page.

## Installation
Get [Node.js](https://nodejs.org/en/download/), then
```
$ npm i site-validator-cli -g
```

## Usage

### Get Help
```
$ site-validator
$ site-validator -h
$ site-validator help
$ site-validator --help
```

### Get Version
```
$ site-validator -v
$ site-validator version
$ site-validator --version
```

### URL
```
$ site-validator <url>
```
This takes in the URL and will generate the entire sitemap, then tries to validate each page in the sitemap


### File - json
```
$ site-validator <path-to-json-file>
```

Expects a json-file with an array of URLs and tries to validate each page found in the array

```JavaScript
[
  "https://example.com/",
  "https://example.com/about",
  "https://example.com/projects"
]
```

### File - txt
```
$ site-validator <path-to-txt-file>
```

Expects a txt-file with 1 URL on each line and tries to validate each page found in the file

```
https://example.com/
https://example.com/about
https://example.com/projects
```

### File - xml
```
$ site-validator <path-to-xml-file>
```

Expects a xml-file with the following format

```XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url>
    <loc>https://example.com/</loc>
  </url>
  <url>
    <loc>https://example.com/about</loc>
  </url>
  <url>
    <loc>https://example.com/projects</loc>
  </url>
</urlset>
```

### Online File
If you would like to use an online file as a source of URLs (such as a hosted sitemap), you can also do
```
$ site-validator <url-to-online-file>
```
* Same file type and format restrictions apply.
* No redirect is allowed, the path has to be exact on this one.

## Options
| Flag | Description |
| --- | --- |
| `--page` | This validates the URL passed in without crawling. |
| `--ff` | This flag will stop the checking at the first error.<br>(Note: does not work with `--output`) |
| `--verbose` | This flag will pretty-print out the errors/warnings. Without it, it'll only tell you whether the page validated without outputting the actual errors. |
| `--quiet` | This flag will ignore warnings or informational messages. |
| `--local` | This expects the url to be a localhost url<br>(e.g. `localhost:80/index.html`) |
| `--cache <min>` | Because sitemap generation can take time, a caching mechanism is in place.<br>Simply put in this flag and specify the number of minutes you'd like the cache to persist.<br>The caches will be stored in the cache folder. |
| `--clear-cache` | `$ site-validator --clear-cache` clears all cached sitemaps.<br>If you want to refetch and recache sitemap for a url:<br>`$ site-validator <url> --cache <minutes> --clear-cache` |
| `--output <filename>` | Having this flag outputs a json file in the directory where<br>`$ site-validator` is run.<br>Filename is optional, default is current time in [ISO format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) |

### Output Schema

```JavaScript
{
  url: "url-entered",
  pages: [
    "crawled-page-1",
    "crawled-page-2",
    "crawled-page-3",
    //...
  ],
  params: {
    verbose: "boolean",
    quiet: "boolean",
    singlePage: "boolean"
  },
  passed: "boolean",
  results: {
    passed: [
      {
        url: "crawled-page",
        status: "pass",
        errors: []
      },
      //...
    ],
    failed: [
      {
        url: "crawled-page",
        status: "fail",
        errors: [
          type: "error-type",
          message: "error-message",
          location: "error-location"
        ]
      },
      {
        url: "crawled-page-not-found",
        status: "not found",
        errors: []
      },
      {
        url: "crawled-page-error",
        status: "error",
        errors: [
          "error message"
        ]
      },
      //...
    ]
  }
}
```

### Chaining Options
```
$ site-validator <url> --verbose --quiet --cache <minutes>
```
The option flags can be chained in any order, as long as they are behind the url that is being evaluated.

If it's more convenient, you can also put the url at the end.
```
$ site-validator --verbose --quiet --path <url>
```

## Contributors
|[![](https://github.com/p1ho.png?size=50)](https://github.com/p1ho)|[![](https://github.com/zrrrzzt.png?size=50)](https://github.com/zrrrzzt)|
|---|---|
|[p1ho](https://github.com/p1ho)|[zrrrzzt](https://github.com/zrrrzzt)|

## Acknowledgement
Inspired by **[w3c-vadlidator-cli](https://www.npmjs.com/package/w3c-validator-cli)** (outdated)
