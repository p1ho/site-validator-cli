'use strict'

const flatCache = require('flat-cache')

module.exports = class Cache {
  constructor (name, path, cacheTime = 0) {
    this.name = name
    this.path = path
    this.cache = flatCache.load(name, path)
    this.expire = cacheTime === 0 ? false : cacheTime * 1000 * 60
  }
  getKey (key) {
    var now = new Date().getTime()
    var value = this.cache.getKey(key)
    if (value === undefined || (value.expire !== false && value.expire < now)) {
      return undefined
    } else {
      return value.data
    }
  }
  setKey (key, value) {
    var now = new Date().getTime()
    this.cache.setKey(key, {
      expire: this.expire === false ? false : now + this.expire,
      data: value
    })
  }
  removeKey (key) {
    this.cache.removeKey(key)
  }
  save () {
    this.cache.save(true)
  }
  remove () {
    flatCache.clearCacheById(this.name, this.path)
  }
}
