import getConstants from './constants/constants'
import crypto from 'crypto'



function makeId ({name, site, masterPassword, symbols, length, release}) {
  return name + site + masterPassword + symbols + length + release
}

function makeHashCode(str){
  let h = 7;

  for (let chr of str) {
    h += (h*19 + chr.charCodeAt(0))
  }

  return h;
}

function replacePasswordSymbols(password, symbols, hashCode, regex) {
  let newSymbolIndex;
  const isSymbol = chr => regex.test(chr);
  const passwordArray = password.split('')

  for (var i = 0; i < password.length; i++) {
    if(isSymbol(password[i])){
      newSymbolIndex = ((i + 1) * hashCode) % symbols.length
      passwordArray[i] = symbols[newSymbolIndex]
    }
  }

  return passwordArray.join('');
}

function insertSymbol(password, symbols, hashCode) {
  const passwordArray = password.split('')
  const insertIndex = hashCode % password.length
  passwordArray[insertIndex] = symbols[hashCode % symbols.length]
  return passwordArray.join('')
}

function makePassword (args) {
  console.log(args);
  let password;
  let hashCode
  const constants = getConstants(args.locale)
  const useSymbols = args => Boolean(args.symbols)
  const typeOfSymbols = constants.typeOfSymbols[args.symbols]
  const useUnambigiousSymbols = args => args.symbols === constants.typeOfSymbols.unambiguous
  const hasSymbols = str => constants.regex.symbols.test(str)
  const id = makeId(args)
  const shaHash = crypto.createHash('sha512').update(id);

  if(useSymbols(args)){
    password = shaHash.digest('base64').substring(0, args.length)
    console.log('useSymbols', password);
    hashCode = makeHashCode(password);

    if(hasSymbols(password) && useUnambigiousSymbols(args)){
      password = replacePasswordSymbols(password, constants.symbols.unambiguous, hashCode, constants.regex.symbols)
      console.log('hasSymbols && useUnambigiousSymbols', password);
    } else if(!hasSymbols(password)){
      password = insertSymbol(password, constants.symbols[typeOfSymbols], hashCode)
      console.log('!hasSymbols', password);
    }

  } else {
    password = shaHash.digest('hex').substring(0, args.length)
    console.log('!useSymbols', password);
  }

  return password;
}

export default makePassword
