const universal = require('./universal');
const merge = require('./helpers').merge;
const defaults = universal.defaults;
const minLength = universal.minLength;
const maxLength = universal.maxLength;

const translation = {
  name: 'jina',
  site: 'siti',
  masterPassword: 'siri_ku',
  symbols: 'alama',
  typeOfSymbols: {
    yoyote: universal.any,
    safi: universal.unambiguous,
    bila: universal.none,
  },
  any: 'yoyote',
  unambiguous: 'safi',
  none: 'bila',
  length: 'urefu',
  release: 'toleo',
  version: 'Toleo',
  help: 'msaada',
};

const envVars = {
  name: 'JINA_USIRI',
};

const regex = {
  cli_options: /^-[jsautTm]$|^--jina$|^--siti$|^--alama$|^--urefu$|^--toleo$|^--Toleo$|^--msaada/,
};

const info = {
  welcome: '👐🏾  Karibu! Ingiza au chagua chaguozako alafu bonyeza "enter" kuendelea',
  name: 'Jina itayotumwika kutengeneza siri',
  site: 'Siti itayotumwika kutengeneza siri',
  masterPassword: 'Siri ku',
  passwordOptions: 'Tumiya chaguo haya kutengeneza siri.' +
                ' Bonyeza "spacebar" kukubali aw kukataa chaguo.',
  symbols: `Aina ya alama | moja katita [${Object.keys(translation.typeOfSymbols).join(' ,')}]`,
  length: `Urefu wa siri. msingi: ${defaults.length}, wastan wa chini: ${minLength}, wastan wa ju: ${maxLength}`,
  release: `Toleo itayotumwika kutengeneza siri. msingi: ${defaults.release}`,
  help: 'Oneysha meseji hii',
  version: 'Oneysha toleo ya programu hii',
  tryAgain: '**JARIBU TENA**',
  passwordCopied: '🙌🏾  Siri ime copiwa kwenye ubao. Karibu tena! ',
  peaceOut: 'Kwaheri ✌🏾',
};

const partial = {
  translation: translation,
  typeOfSymbols: typeOfSymbols,
  envVars: envVars,
  regex: regex,
  info: info,
};

const sw =  merge(universal, partial);
console.log(sw);

module.exports = sw;
