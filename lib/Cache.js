'use strict'

const flatCache = require('flat-cache')

module.exports = class Cache {
  constructor (name, path, cacheTime = 0) {
    this.name = name
    this.cache = flatCache.load(name, path)
    this.now = new Date().getTime()
    this.expire = cacheTime === 0 ? false : this.now + cacheTime
  }
  getKey (key) {
    var value = this.cache.getKey(key)
    if (value === undefined || value.expire !== false || value.expire < this.now) {
      return undefined
    } else {
      return value.data
    }
  }
  setKey (key, value) {
    this.cache.setKey(key, {
      expire: this.expire,
      data: value
    })
  }
  removeKey (key) {
    this.cache.removeKey(key)
  }
  save () {
    this.cache.save(true)
  }
}
