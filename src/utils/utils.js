import CFG from './cfg'

const oproto = Object.prototype
const serialize = oproto.toString

export function isPlainObject (obj) {
  return (
    serialize.call(obj) === '[object Object]' &&
    Object.getPrototypeOf(obj) === oproto
  )
}

export function isArray (ary) {
  return Array.isArray || serialize.call(ary) === '[object Array]'
}

export function isFunction (fn) {
  return serialize.call(fn) === '[object Function]'
}

export function isObject (obj) {
  return Object(obj) === obj
}

export function isString (s) {
  return typeof s === 'string'
}

export function isUndefined (a) {
  return typeof a === 'undefined'
}

export function isDefined (a) {
  return typeof a !== 'undefined'
}

/**
 * 遍历
 */
export function each (ary, func, context) {
  if (isDefined(ary.length)) {
    for (var i = 0, len = ary.length; i < len; i++) {
      if (func.call(context, ary[i], i, ary) === false) {
        break
      }
    }
  } else {
    for (var k in ary) {
      if (func.call(context, ary[k], k, ary) === false) {
        break
      }
    }
  }
}

/**
 * 替代eval方法
 */
export function evil (fn) {
  let Fn = Function
  return new Fn('return ' + fn)()
}

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
export function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url
  if (url.indexOf('#') !== -1 && url.indexOf('http') === -1) {
    const port = reqUrl.substr(reqUrl.indexOf(':'))
    reqUrl = `/ifrm/urlPath?src=${CFG.URL('BASE_API')}${port}${reqUrl.replace('#', '').replace(port, '')}&name=${name}`
  } else if (url.indexOf('http') !== -1) {
    reqUrl = `/ifrm/urlPath?src=${reqUrl}&name=${name}`
  } else {
    reqUrl = `${reqUrl}`
  }
  return reqUrl
}
