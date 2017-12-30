function isSymbol(chr) {
  return /[\W_]/.test(chr);
}

function getLocale(locale) {
  return require(`./constants/${locale}`);
}

function hasLocale(locale) {
  const fs = require('fs');
  const path = require('path');

  return fs.readdirSync(path.resolve(__dirname, 'constants'))
            .map(f => path.basename(f, '.js'))
            .indexOf(locale) !== -1;
}

function isA(v, ...types) {
  for (let i = 0; i < types.length; i++) {
    if (typeof v === types[i]) return true;
  }

  return false;
}

function validateArgs(args, constants) {
  const validations = {
    name: n => isA(n, 'string'),
    site: s => isA(s, 'string'),
    masterPassword: m => isA(m, 'string'),
    length: l => isA(l, 'number') && l >= constants.minLength && l <= constants.maxLength,
    symbols: v => Object.keys(constants.symbols).indexOf(v) !== -1,
    release: r => isA(r, 'string', 'number') && constants.regex.release.test(r),
  };

  Object.entries(validations).forEach(([arg, valid]) => {

    if (!args.hasOwnProperty(arg)) {
      throw new Error(`Missing argument key: ${arg}`);
    }

    if (!valid(args[arg])) {
      throw new Error(constants.info[arg]);
    }

  });
}

module.exports  = {
  isSymbol: isSymbol,
  hasSymbols: isSymbol,
  hasLocale: hasLocale,
  getLocale: getLocale,
  validateArgs: validateArgs,
};
