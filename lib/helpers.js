function isSymbol(chr) {
  return /[\W_]/.test(chr);
}

module.exports  = {
  isSymbol: isSymbol,
  hasSymbols: isSymbol,
};
