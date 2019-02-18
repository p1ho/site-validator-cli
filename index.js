#!/usr/bin/env node
'use strict'

/*
Require statements
 */
const fs               = require('fs');
const path             = require('path');
const normalizer       = require('normalize-url');
const validator        = require('html-validator');
const xml_parser       = require('fast-xml-parser');
const minimist         = require('minimist');
const clc              = require('cli-color');
const flat_cache       = require('flat-cache');
const urlsFromCrawling = require('./lib/getUrlsFromCrawler');
const getHelpText      = require('./lib/getHelpText');
const pkg              = require('./package.json');

/*
Define text styling
 */
var green_on_black  = clc.xterm(47).bgXterm(0);
var red_on_black    = clc.xterm(196).bgXterm(0);
var black_on_red    = clc.xterm(15).bgXterm(124);
var black_on_yellow = clc.xterm(0).bgXterm(11);
var cyan_on_black = clc.xterm(14).bgXterm(0);

/*
Parsing query parameters
 */
const query = process.argv[2];
const argv = minimist(process.argv.slice(2));

let options = {
  cacheTime: argv.cacheTime !== undefined ? argv.cacheTime * 1000 * 60 : 0,
  failfast: argv.ff !== undefined,
  verbose: argv.verbose !== undefined,
  quiet: argv.quiet !== undefined,
};

var now = new Date().getTime();

/*
Init Cache
 */
if (options.cacheTime !== 0) {
  var w3c_cache = flat_cache.load('w3c_cache', path.resolve('./cache'));
  var expire = now + options.cacheTime;
}

/*
Process query parameters
 */
if (!query || process.argv.indexOf('-h') !== -1 ||process.argv.indexOf('--help') !== -1) {
  console.log(getHelpText());
  process.exit(0);
}

if (!query || process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  process.exit(0);
}

options.url = argv.url ? normalizer(argv.url) : normalizer(argv._[0]);


/*
Main Process
 */
(async () => {

  function isValidHtml (result, quiet) {
    var err = (quiet) ? result.messages.filter(m => m.type === 'error') : result.messages;
    return err.length === 0;
  }

  let pagesToValidate = await urlsFromCrawling(options.url, options.cacheTime);
  let pagesTotal = pagesToValidate.length;
  console.log(`\nEvaluating a total of ${pagesTotal} pages`);


  let pagesFail = [];

  console.log('__________________________________');

  const validateNextPage = async () => {
    if (pagesToValidate.length > 0) {
      console.log(`\nChecking page ${pagesTotal + 1 - pagesToValidate.length} of ${pagesTotal} pages`);

      const getResult = async (url) => {
        let data = await validator({ url: url});
        if (options.cacheTime !== 0) {
          var cache_new = {
            expire: expire,
            data: data,
          };
          w3c_cache.setKey(url, cache_new);
          w3c_cache.save(true);
        }
        return data;
      }

      const printResult = (json) => {
        if (isValidHtml(json, options.quiet)) {
          console.log(green_on_black('Validated') + ` ${page_url}`);
        } else {
          console.log(red_on_black('Failed') + ` ${page_url}`);
          pagesFail.push(page_url);

          const printError = (msg) => {

            var firstLine = msg.firstLine   || msg.lastLine;
            var lastLine  = msg.lastLine    || msg.firstLine;
            var firstCol  = msg.firstColumn || msg.lastColumn;
            var lastCol   = msg.lastColumn  || msg.firstColumn;

            var error_type = (msg.subType || msg.type).toUpperCase();

            if (msg.type === "error") {
              console.log(`\n[${error_type}] From line ${firstLine}, column ${firstCol}; ` +
                          `to line ${lastLine}, column ${lastCol}`);
              console.log(black_on_red(msg.message) + ' \n');
            } else {
              if (!options.quiet) {
                console.log(`\n[${error_type}] From line ${firstLine}, column ${firstCol}; ` +
                            `to line ${lastLine}, column ${lastCol}`);
                console.log(black_on_yellow(msg.message) + ' \n');
              }
            }
          }

          if (options.verbose) {
            if (json.messages.length === 1) {
              printError(json.messages[0]);
            } else {
              for (let error of json.messages) {
                printError(error);
              }
            }
          }
        }
      }

      let page_url = pagesToValidate.shift();
      if (options.cacheTime !== 0 && w3c_cache !== undefined) {
        let cache_old = w3c_cache.getKey(page_url);
        if (cache_old !== undefined && cache_old.expire >= now) {
          console.log('\nPage validation cache found!');
          printResult(JSON.parse(cache_old.data));
        } else {
          console.log('\nPage validation cache not available, revalidating...');
          let result = await getResult(page_url);
          printResult(JSON.parse(result));
        }
      } else {
        let result = await getResult(page_url);
        printResult(JSON.parse(result));
      }
      console.log('__________________________________');
      if (options.failfast && pagesFail.length > 0) {
        console.log("\n" + red_on_black("Fast Fail Mode: Site Failed Validation") + ' \n');
        process.exit(1);
      } else {
        await validateNextPage();
      }
    } else {
      if (pagesFail.length === 0) {
        console.log("\n" + green_on_black("Site Validated") + ` No problems were found for ${options.url}`);
      } else {
        console.log("\n" + red_on_black("Site Failed Validation") +
        ` ${pagesFail.length} out of ${pagesTotal} pages failed validation for ${options.url}:\n`);
        pagesFail.forEach( (e) => { console.log(e) } );
      }
      console.log(cyan_on_black('\nFinished Checking, have an A-1 Day!') + ' \n');
    }
  }

  await validateNextPage();

})();
