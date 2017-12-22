const constHelpers = require('./helpers');
const alphaNumberic = constHelpers.alphaNumberic;
const anySymbols = constHelpers.anySymbols;
const unambiguosSymbols = constHelpers.unambiguosSymbols;

const minLength = 16;
const maxLength = 88;

const test = 'test';
const any = 'any';
const unambiguous = 'unambiguous';
const none = 'none';

const defaults = {
  symbols: any,
  length: 23,
  release: '1.0',
};

const regex = {
  length: /^[1-7][6-9]$|^[2-7][0-9]$|^8[0-8]$/,
  version: /^-?[\d]+\.?[\d]*$/,
  symbols: /[\W_]/,
};

const symbols = {
  any: anySymbols(),
  unambiguous: unambiguosSymbols(),
  none: alphaNumberic(),
};

module.exports = {
  minLength: minLength,
  maxLength: maxLength,
  test: test,
  any: any,
  unambiguous: unambiguous,
  none: none,
  defaults: defaults,
  regex: regex,
  symbols: symbols,
};
