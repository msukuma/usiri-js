require('./string');
const assert = require('assert');
const crypto = require('crypto');
const helpers = require('./helpers');
const hasLocale = helpers.hasLocale;
const getLocale = helpers.getLocale;
const isSymbol = helpers.isSymbol;
const hasSymbols = helpers.hasSymbols;
const validateArgs = helpers.validateArgs;

class Usiri {
  constructor(locale = 'en') {
    if (!hasLocale(locale)) {
      throw new Error(`Invalid locale: ${locale}`);
    }

    this.locale = locale;
    this.constants = getLocale(locale);
  }

  makeId({ name, site, masterPassword, symbols, length, release }) {
    return name + site + masterPassword + symbols + length + release;
  }

  replaceSymbols(password, symbols) {
    let symIndex;
    const hashCode = password.hashCode();

    return password.split('').map((chr, i) => {
      if (isSymbol(chr)) {
        symIndex = ((i + 1) * hashCode) % symbols.length;
        return symbols[symIndex];
      }

      return chr;
    }).join('');
  }

  insertSymbol(password, symbols) {
    const hashCode = password.hashCode();
    const charArray = password.split('');
    const i = hashCode % password.length;
    charArray[i] = symbols[hashCode % symbols.length];
    return charArray.join('');
  }

  makePassword(args) {
    validateArgs(args, this.constants);
    let password;
    const useSymbols = Boolean(args.symbols);
    const symbols = this.constants.symbols[args.symbols];
    const hash = crypto.createHash('sha512').update(this.makeId(args));

    password = hash.digest('base64').substring(0, args.length);

    if (useSymbols && hasSymbols(password)) {
      password = this.replaceSymbols(password, symbols);
    } else {
      password = this.insertSymbol(password, symbols);
    }

    return password;
  }
}

module.exports = Usiri;
