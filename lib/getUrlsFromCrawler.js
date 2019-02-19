'use strict'

module.exports = (url, cacheTime) => {
  return new Promise(async function (resolve, reject) {
    try {
      const path       = require('path');
      const clc        = require('cli-color');
      const flat_cache = require('flat-cache');
      const url_hash   = require('crypto').createHash('sha1').update(url).digest('hex');
      const Crawler    = require('simplecrawler');

      var green_on_black  = clc.xterm(47).bgXterm(0);
      var now = new Date().getTime();
      var expire = now + cacheTime;
      var cache_path = path.resolve(__dirname + `/../cache/sitemap/`);
      var urls_cache = flat_cache.load(url_hash, cache_path);

      if (cacheTime !== 0 && urls_cache !== undefined) {
        let cache_old = urls_cache.getKey(url);
        if (cache_old !== undefined && cache_old.expire >= now) {
          console.log("\n" + green_on_black("Success") + ` Site URLs Cache found for ${url}`);
          return resolve(cache_old.data);
        } else {
          console.log(`\nSite urls cache not available, refetching URLs for ${url} ...`);
        }
      } else {
        console.log(`\nFetching Site Urls for ${url} ...`);
      }

      var urls = [];
      var crawler = Crawler(url);

      /*
      Commented out because maybe we could use later
      There seems to be problem with caching mechanism for node.js v10
      https://github.com/simplecrawler/simplecrawler/pull/447

      Right now will use flat caching which should work just as well.
       */
      // crawler.cache = Crawler.cache(__dirname + '/../cache');

      crawler.addDownloadCondition((queueItem, response, callback) => {
            callback(null,
              queueItem.stateData.contentType.includes("text/html")
            );
          })

      crawler.on("fetchcomplete", (queueItem, data, res) => {
            urls.push(queueItem.url);
          })

      crawler.on("complete", async () => {
            if (cacheTime !== 0) {
              urls_cache.setKey(url, {
                expire: expire,
                data: urls,
              });
              urls_cache.save(true);
            }
            return resolve(urls);
          })

      /*
      The following code logs error during crawling, commenting out because
      it's not needed for the module to be functional, but keeping it in case
      it becomes useful later.
       */
      /*
      var errors = [];
      
      crawler.on("invaliddomain", (queueItem) => {
            errors.push("Ignored Domain: " + queueItem.url);
          })

      crawler.on("fetchdisallowed", (queueItem) => {
            errors.push("Disallowed: " + queueItem.url);
          })

      crawler.on("fetchconditionerror", (queueItem, error) => {
            errors.push("Fetch Condition Error: " + queueItem.url + " -> " + error);
          })

      crawler.on("fetcherror", (queueItem, response) => {
            errors.push("Fetch Error: " + queueItem.url + " -> " + response);
          })

      crawler.on("fetchtimeout", (queueItem, timeout) => {
            errors.push("Timeout: " + queueItem.url + " timed out after " + timeout + "ms");
          })

      crawler.on("fetchclienterror", (queueItem, error) => {
            errors.push("Request Error: "+ queueItem.url + " -> " + error);
          })

      crawler.on("downloadconditionerror", (queueItem, error) => {
            errors.push("Download Condition Error: " + queueItem.url + " -> " + error);
          })

      crawler.on("fetchdataerror", (queueItem, response) => {
            errors.push("Fetch Data Error: " + queueItem.url + " -> " + response);
          });
      */

      crawler.start();

    } catch (error) {

      return reject(error);

    }
  });
}
