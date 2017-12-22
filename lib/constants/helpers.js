const isPlainObject = require('is-plain-object');
const osLocale = require('os-locale');
const path = require('path');
const readdirSync = require('fs').readdirSync;

function merge(a, b) {
  const cloned =  clone(a);
  _merge(cloned, clone(b));
  return cloned;
}

function _merge(a, b) {
  Object.entries(b).forEach(([key, value]) => {
    if (a.hasOwnProperty(key)) {
      if (isPlainObject(value)) {
        _merge(a[key], value);
      } else {
        a[key] = value;
      }
    } else {
      a[key] = value;
    }
  });
}

function clone(obj) {
  let c = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      c[key] = clone(value);
    } else {
      c[key] = (new Object(value)).valueOf();
    }
  });

  return c;
}

const range = (from, to) => [...Array(to - from + 1)].map((_, i) => i + from);

function codeToCharArray(_range) {
  return _range.map(r => String.fromCharCode(...range(r.from, r.to))).join('');
}

function alphaNumberic() {
  return codeToCharArray([
    { from: 65, to: 90 },
    { from: 97, to: 122 },
  ]);
}

function anySymbols() {
  return codeToCharArray([
    { from: 33, to: 47 },
    { from: 58, to: 64 },
    { from: 91, to: 96 },
    { from: 123, to: 126 },
  ]);
}

function unambiguosSymbols() {
  return '!#$%&*+-<=>?@[]^{}';
}

module.exports =  {
  merge: merge,
  alphaNumberic: alphaNumberic,
  anySymbols: anySymbols,
  unambiguosSymbols: unambiguosSymbols,
};
