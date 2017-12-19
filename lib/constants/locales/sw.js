import {makeParseOption} from '../helpers'
import {
  defaults as uDefaults,
  minLength,
  maxLength } from './universal';

const typeOfSymbols = {
  yoyote: 'any',
  safi: 'unambiguous',
  bila: 'none'
}

const defaults = {
  symbols: 'yoyote'
}

const envVars = {
  name: 'JINA_USIRI'
}

const regex = {
  cli_options: /^-[jsautTm]$|^--jina$|^--siti$|^--alama$|^--urefu$|^--toleo$|^--Toleo$|^--msaada/
}

const info = {
  welcome: '👐🏾  Karibu! Ingiza au chagua chaguozako alafu bonyeza "enter" kuendelea',
  name: 'Jina itayotumwika kutengeneza siri',
  site: 'Siti itayotumwika kutengeneza siri',
  masterPassword: 'Siri ku',
  passwordOptions: 'Tumiya chaguo haya kutengeneza siri.'+
                ' Bonyeza "spacebar" kukubali aw kukataa chaguo.',
  symbols: `Aina ya alama | moja katita [${Object.values(typeOfSymbols).join(' ,')}]`,
  length: `Urefu wa siri. msingi: ${uDefaults.length}, wastan wa chini: ${minLength}, wastan wa ju: ${maxLength}`,
  release: `Toleo itayotumwika kutengeneza siri. msingi: ${uDefaults.release}`,
  help: 'Oneysha meseji hii',
  version: 'Oneysha toleo ya programu hii',
  tryAgain: '**JARIBU TENA**',
  passwordCopied: '🙌🏾  Siri ime copiwa kwenye ubao. Karibu tena! ',
  peaceOut: 'Kwaheri ✌🏾'
}

const options = {
  name: {
    name: 'jina',
    short: 'j',
    help: info.name
 },
  site: {
    name: 'siti',
    short: 's',
    help: info.site
 },
  symbols: {
    name: 'alama',
    short: 'a',
    default: defaults.symbols,
    help: info.symbols
 },
  length: {
    name: 'urefu',
    short: 'u',
    help: info.length
 },
  release: {
    name: 'toleo',
    short: 't',
    help: info.release
 },
  version: {
    name: 'Toleo',
    short: 'T',
    help: info.version
 },
  help: {
    name: 'msaada',
    short: 'm',
    help: info.help
 },
}

const sw =  {
  typeOfSymbols: typeOfSymbols,
  defaults: defaults,
  envVars: envVars,
  regex: regex,
  info: info,
  options: options,

}
export default sw;
