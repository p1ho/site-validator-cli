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
```
$ site-validator <url> [options]
```
This takes in the URL and will generate the entire sitemap, then tries to validate each page in the sitemap

```
$ site-validator <path-to-file> [options]
```
This takes in a file accepting one of the following formats: `.json`/`.xml`/`.txt`, then tries to validate each page from the file. supports both local and online files. (**[File Content Guidelines](#file-content-guidelines)**)

```
$ site-validator [options] --url <url>
                           --path <path-to-file>
```
If it's more convenient, you can also put the url/path at the end, but you have to prepend with `--url` or `--path`.

## Options
| Flag | Description |
| --- | --- |
| `--verbose` | This flag will pretty-print out the errors/warnings.<br>Without it, it'll only say whether page validated. |
| `--quiet` | This flag will ignore warnings or informational messages. |
| `--local` | This expects the url to be a localhost url<br>(e.g. `http://localhost`), if the site is not served on port 80, you have to specify the port number (e.g. `http://localhost:3000`). localhost sites served over HTTPS is not currently supported. |
| `--cache <min>` | By default, the sitemap generated will be cached for 60 minutes. Use this flag to change how long you want to cache the sitemap for. |
| `--clear-cache` | `$ site-validator --clear-cache` clears all cached sitemaps.<br>If you want to refetch and recache sitemap for a url:<br>`$ site-validator <url> --clear-cache` |
| `--output <filename>` | Outputs a json file in the current directory.<br>Filename optional, defaults to [ISO format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) current time<br>**[Output Schema](#output-schema)** |
| `--view <filename>` | Prints report from output json file (without `.json`) to console.<br>`$ site-validator <filename> --view`<br>`$ site-validator --view <filename>`<br>both works. |
| `--page` | This validates the URL passed in without crawling. |
| `--ff` | (Fail Fast) This flag will stop the checking at the first error.<br>(Note: does not work with `--output`) |

## Other Commands

### Help
```
$ site-validator -h, help, --help
```

### Version
```
$ site-validator -v, version, --version
```

## File Content Guidelines

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

## Output Schema

```Javascript
{
  url: "url-entered",
  pages: [
    "crawled-page-1",
    "crawled-page-2",
    "crawled-page-3",
    //...
  ],
  quiet: "boolean",
  singlePage: "boolean",
  passed: "boolean",
  results: {
    passed: [
      {
        url: "crawled-page-pass",
        status: "pass",
        errors: []
      },
      //...
    ],
    failed: [
      // may contain the following types
      {
        url: "crawled-page-fail",
        status: "fail",
        errors: [
          {
            type: "error-type",
            message: "error-message",
            location: "error-location"  
          },
          //...
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

## Contributors
|[![](https://github.com/p1ho.png?size=50)](https://github.com/p1ho)|[![](https://github.com/zrrrzzt.png?size=50)](https://github.com/zrrrzzt)|
|---|---|
|[p1ho](https://github.com/p1ho)|[zrrrzzt](https://github.com/zrrrzzt)|

## Acknowledgement
Inspired by **[w3c-vadlidator-cli](https://www.npmjs.com/package/w3c-validator-cli)** (outdated)
