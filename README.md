# site-validator-cli
A CLI that takes a URL and retrieves its sitemap, then uses **[html-validator](https://www.npmjs.com/package/html-validator)** (a wrapper for https://validator.w3.org/nu/) to validate each page.
## Installation
This is not published on [npm](https://www.npmjs.com/) yet, so the following is how you could install the developer version.

Navigate inside to where you cloned the repo and type
```
$ npm install
```
This installs all the dependencies. If this throws no error, the script should be usable.

## Usage
```
$ node index.js <url>
```
This takes in the url you specify, generate the entire sitemap for that domain, and tries to validate each page found in the sitemap

## Options
### Verbose Mode
```
$ node index.js <url> --verbose
```
This flag will pretty-print out the errors/warnings. Without it, it'll only tell you whether the page validated without outputting the actual errors.
### Quiet Mode
```
$ node index.js <url> --quiet
```
This flag will ignore warnings or informational messages.
### Caching
```
$ node index.js <url> --cacheTime <minutes>
```
Because sitemap generation, as well as getting their validation information can be costly, a caching mechanism is in place. Simply put in this flag and specify the number of minutes you'd like this cache to live.
The caches will be stored in the cache folder.

### Chaining Options
```
$ node index.js <url> --verbose --quiet --cacheTime <minutes>
```
The optional parameters can be chained in any order, as long as they are behind the URL that is being evaluated.
## Acknowledgement
* I have gotten a lot of help from [zrrrzzt](https://github.com/zrrrzzt) who actually gave me a [working starter code](https://gist.github.com/zrrrzzt/f0f2e5d64f2b69b330f377423717d7a7).

* This module was inspired by **[w3c-vadlidator-cli](https://www.npmjs.com/package/w3c-validator-cli)**. Unfortunately, it has not been updated for a while, which prompted me to make this one. This module is essentially what that one would be had it been supported till today.

## Contact
I can be contacted at hopokuan@umich.edu
