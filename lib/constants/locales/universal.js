import {makeAnySymbols, makeUnambiguosSymbols} from '../helpers'
const minLength = 16;
const maxLength = 88;

const defaults = {
  // symbols: 'any',
  length: 23,
  release: '1.0'
};

const regex = {
  length: /^[1-7][6-9]$|^[2-7][0-9]$|^8[0-8]$/,
  version: /^-?[\d]+\.?[\d]*$/,
  symbols: /[\W_]/
}

const options = {
  length: {
    default: defaults.length
  },
  release: {
    default: defaults.release
  }
}

const symbols = {
  any: makeAnySymbols(),
  unambiguous: makeUnambiguosSymbols()
}

const universal = {
  minLength: minLength,
  maxLength: maxLength,
  defaults: defaults,
  regex: regex,
  options: options,
  symbols: symbols,
}

export {minLength, maxLength, defaults, regex}
export default universal
