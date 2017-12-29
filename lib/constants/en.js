const universal = require('./universal');
const merge = require('./helpers').merge;
const defaults = universal.defaults;
const minLength = universal.minLength;
const maxLength = universal.maxLength;

const translation = {
  name: 'name',
  site: 'site',
  masterPassword: 'masterPassword',
  symbols: 'symbols',
  typeOfSymbols: {
    any: universal.any,
    unambiguous: universal.unambiguous,
    none: universal.none,
  },
  any: universal.any,
  unambiguous: universal.unambiguous,
  none: universal.none,
  length: 'length',
  release: 'release',
  version: 'version',
  help: 'help',
};

const envVars = {
  name: 'USIRI_NAME',
};

const regex = {
  cli_options: /^-[nsSlrvh]$|^--name$|^--site$|^--symbols$|^--length$|^--release$|^--version$|^--help$/,
};

const info = {
  welcome: '👐🏾 ' + ' Welcome!' +
          ' type or select your choices then press "enter" to continue',
  name: 'Name used to generate password',
  site: 'Site used to generate password',
  masterPassword: 'Master password',
  passwordOptions: 'Use these options to generate password.' +
                ' Press "spacebar" accept or refuse a setting.',
  symbols: `Type of symbols to use | one of [${Object.keys(translation.typeOfSymbols).join(' ,')}]`,
  length: `Length of password. Default: ${defaults.length}, min: ${minLength}, max: ${maxLength}`,
  release: `release/version of password related to name and site. Default: '${defaults.release}'`,
  help: 'Show this help message',
  version: 'Show version of Usiri',
  tryAgain: '**Try Again**',
  passwordCopied: '🙌🏾 ' + ' Password has been copied to your clipboard! ',
  peaceOut: ' ✌🏾',
};

const partial = {
  translation: translation,
  defaults: defaults,
  envVars: envVars,
  regex: regex,
  info: info,
};

const en = merge(universal, partial);
// console.log(en);

module.exports = en;
