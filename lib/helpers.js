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

function validateArgs(args, constants) {
  const isString = v => typeof v === 'string';
  const validations = {
    name: n => isString(n),
    site: s => isString(s),
    masterPassword: m => isString(m),
    length: l => l >= constants.minLength && l <= constants.maxLength,
    symbols: v => Object.keys(constants.symbols).indexOf(v) !== -1,
    release: r => isString(r) && constants.regex.release.test(r),
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
