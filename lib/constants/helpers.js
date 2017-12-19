import isPlainObject from 'is-plain-object';
import osLocale from 'os-locale'
import path from 'path'
import {readdirSync} from 'fs'


function merge(a, b) {
  const cloned =  clone(a);
  _merge(cloned, clone(b));
  return cloned;
}

function _merge(a, b) {
  Object.entries(b).forEach(([key, value]) => {
    if(a.hasOwnProperty(key)){
      if(isPlainObject(value)){
        _merge(a[key], value)
      } else {
        a[key] = value
      }
    } else {
      a[key] = value
    }
  })
}

function clone(obj) {
  let c = {};

  Object.entries(obj).forEach(([key, value]) => {
    if(isPlainObject(value)){
      c[key] = clone(value);
    } else {
      c[key] = (new Object(value)).valueOf();
    }
  });

  return c;
}

const localesPath = path.join(__dirname, 'locales');
export const locales = new Set(readdirSync(localesPath).map(l => path.basename(l, '.js')));
const requireLocale = locale => require(`./locales/${locale}`).default;

function getParentLocale(locale) {
  const seperatorIndex = locale.indexOf('_');
  let parent;

  if(seperatorIndex !== -1 ){
    parent = locale.substring(0, seperatorIndex);

    if(locales.has(parent)){
      return requireLocale(parent)
    }
  }

  return null;
}

function getLocale(locale) {
  const _locale = locale ? locale : osLocale.sync();

  if(locales.has(_locale)){
    return requireLocale(_locale)
  } else {
    return getParentLocale(_locale);
  }
}

function makeParseOption(options) {
  const opts = {}

  Object.entries(options).forEach(([opt, props]) => {
    opts[props.name] = props
  })

  return opts;
}

const range = (from, to) => [...Array(to-from+1)].map((_,i) => i + from);

function makeAnySymbols() {
  return [
    {from: 33, to: 47},
    {from: 58, to: 64},
    {from: 91, to: 96},
    {from: 123, to: 126},
  ].map(r => String.fromCharCode(...range(r.from,r.to)))
   .join('')
   .split('')
}

function makeUnambiguosSymbols() {
  return '!#$%&*+-<=>?@[]^{}'.split('')
}


export {
  merge,
  getLocale,
  makeParseOption,
  makeAnySymbols,
  makeUnambiguosSymbols,
}
