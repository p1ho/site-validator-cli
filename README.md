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
This flags will pretty-print out the errors/warnings. Without it, it'll only tell you whether the page validated without outputting the actual errors.
### Quiet Mode
```
$ node index.js <url> --quiet
```
This flag will ignore warnings or informational messages.
### Caching
```
$node index.js <url> --cacheTime <minutes>
```
Because sitemap generation, as well as getting their validation information can be costly, a caching mechanism is in place. Simply put in this flag and specify the number of minutes you'd like this cache to live.
The caches will be stored in the cache folder.
## Contact
I can be contacted at hopokuan@umich.edu
