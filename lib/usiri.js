require('./string');
const crypto = require('crypto');
const helpers = require('./helpers');
const isSymbol = helpers.isSymbol;
const hasSymbols = helpers.hasSymbols;

function makeId({ name, site, masterPassword, symbols, length, release }) {
  return name + site + masterPassword + symbols + length + release;
}

function replaceSymbols(password, symbols) {
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

function insertSymbol(password, symbols) {
  const hashCode = password.hashCode();
  const charArray = password.split('');
  const i = hashCode % password.length;
  charArray[i] = symbols[hashCode % symbols.length];
  return charArray.join('');
}

function makePassword(args) {
  let password;
  const constants = getConstants(args.locale);
  const useSymbols = Boolean(args.symbols);
  const typeOfSymbols = constants.typeOfSymbols[args.symbols];
  const symbols = constants.symbols[typeOfSymbols];
  const useUnambigiousSymbols = args.symbols === constants.typeOfSymbols.unambiguous;
  const id = makeId(args);
  const shaHash = crypto.createHash('sha512').update(id);

  password = shaHash.digest('base64').substring(0, args.length);

  if (useSymbols && hasSymbols(password)) {
    password = replaceSymbols(password, symbols);
  } else {
    password = insertSymbol(password, symbols);
  }

  return password;
}

module.exports =  makePassword;
module.exports.makeId = makeId;
module.exports.replaceSymbols = replaceSymbols;
module.exports.insertSymbol = insertSymbol;
module.exports.makePassword = makePassword;
