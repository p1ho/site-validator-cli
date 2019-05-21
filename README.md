[![Build Status](https://travis-ci.com/p1ho/site-validator-cli.svg?branch=master)](https://travis-ci.com/p1ho/site-validator-cli)
[![Coverage Status](https://coveralls.io/repos/github/p1ho/site-validator-cli/badge.svg?branch=master)](https://coveralls.io/github/p1ho/site-validator-cli?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# site-validator-cli
A command line tool that takes a URL or a file, then uses **[html-validator](https://www.npmjs.com/package/html-validator)** (a wrapper for https://validator.w3.org/nu/) to validate each page.

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
$ site-validator <path-to-online-file>
```
* Same file type and format restrictions apply.
* No redirect is allowed, the path has to be exact on this one.

## Options
### Single Page Mode
```
$ site-validator <url> --page
```
This validates the URL passed in without crawling.

### Fail Fast Mode
```
$ site-validator <path> --ff
```
This flag will stop the checking at the first error.

### Verbose Mode
```
$ site-validator <path> --verbose
```
This flag will pretty-print out the errors/warnings. Without it, it'll only tell you whether the page validated without outputting the actual errors.

### Quiet Mode
```
$ site-validator <path> --quiet
```
This flag will ignore warnings or informational messages.

### Caching
```
$ site-validator <path> --cache <minutes>
```
Because sitemap generation, as well as getting their validation information can be costly, a caching mechanism is in place. Simply put in this flag and specify the number of minutes you'd like the cache to persist.
The caches will be stored in the cache folder.

### Clear Cache
```
$ site-validator --clear-cache
```

If you want to refetch and recache sitemap for a path:
```
$ site-validator <path> --cache <minutes> --clear-cache
```

### Local Mode
```
$ site-validator localhost:80/index.html --local
```

You must have a localhost server running.

### Chaining Options
```
$ site-validator <path> --verbose --quiet --cache <minutes>
```
The optional parameters can be chained in any order, as long as they are behind the URL that is being evaluated.

If it's more convenient, you can also put the path at the end.
```
$ site-validator --verbose --quiet --path <path>
```
## Contributors
|[![](https://github.com/p1ho.png?size=50)](https://github.com/p1ho)|[![](https://github.com/zrrrzzt.png?size=50)](https://github.com/zrrrzzt)|
|---|---|
|[p1ho](https://github.com/p1ho)|[zrrrzzt](https://github.com/zrrrzzt)|

## Acknowledgement
This module was inspired by **[w3c-vadlidator-cli](https://www.npmjs.com/package/w3c-validator-cli)**. Unfortunately, it has not been updated for a while, which prompted me to make this one. This module is essentially what that one would be had it been supported till today.
