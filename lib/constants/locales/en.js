import {makeParseOption} from '../helpers'
import {
  defaults as uDefaults,
  minLength,
  maxLength } from './universal';

const typeOfSymbols =  {
  any: 'any',
  unambiguous: 'unambiguous',
  none: 'none'
}



const envVars = {
  name: 'USIRI_NAME'
}

// const cliOptNames = ['name', 'site', 'symbols', 'length', 'release', 'version', 'help',]

const regex = {
  cli_options: /^-[nsSlrvh]$|^--name$|^--site$|^--symbols$|^--length$|^--release$|^--version$|^--help$/
}

const info = {
  welcome: '👐🏾 '+' Welcome!'+
          ' type or select your choices then press "enter" to continue',
  name: 'Name used to generate password',
  site: 'Site used to generate password',
  masterPassword: 'Master password',
  passwordOptions: 'Use these options to generate password.'+
                ' Press "spacebar" accept or refuse a setting.',
  symbols: `Type of symbols to use | one of [${Object.values(typeOfSymbols).join(' ,')}]`,
  length: `Length of password. Default: ${uDefaults.length}, min: ${minLength}, max: ${maxLength}`,
  release: `release/version of password related to name and site. Default: ${uDefaults.release}`,
  help: 'Show this help message',
  version: 'Show version of Usiri',
  tryAgain: '**Try Again**',
  passwordCopied: '🙌🏾 '+ ' Password has been copied to your clipboard! ',
  peaceOut: ' ✌🏾'
}

const options = {
  name: {
    name: 'name',
    short: 'n',
    help: info.name
  },
  site: {
    name: 'site',
    short: 's',
    help: info.site
  },
  symbols: {
    name: 'symbols',
    short: 'S',
    default: defaults.symbols,
    help: info.symbols,
  },
  length: {
    name: 'length',
    short: 'l',
    help: info.length
  },
  release: {
    name: 'release',
    short: 'r',
    help: info.release
  },
  version: {
    name: 'version',
    short: 'v',
    help: info.version
  },
  help: {
    name: 'help',
    short: 'h',
    help: info.help
  }
}

const en = {
  typeOfSymbols: typeOfSymbols,
  defaults: defaults,
  envVars: envVars,
  regex: regex,
  info: info,
  options: makeParseOption(options),
}

export default en;
