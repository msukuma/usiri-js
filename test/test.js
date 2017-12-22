const assert = require('assert');
const constants = require('../lib/constants/en');
const isSymbol = require('../lib/helpers').isSymbol;
const Usiri = require('../lib/usiri');
let usiri;
const args = {
  name: constants.test,
  site: constants.test,
  masterPassword: constants.test,
  symbols: constants.defaults.symbols,
  length:  constants.defaults.length,
  release: constants.defaults.release,
};

console.log(args);

describe('Usiri', () => {
  describe('class definition', ()=> {
    it('should be a class', () => {
      assert(usiri.constructor === Usiri);
    });

    it('should accept a plain object with locale defined', () => {
      assert(usiri.constructor === Usiri);
    });
  });

  describe('#makeId', () => {
    it('should return a string id', () => {
      const expected = Object.values(args).reduce((a, b) => a + b);
      const got = usiri.makeId(args);
      assert.equal(expected, got);
    });
  });

  describe('#replaceSymbols', () => {
    const password = '"';
    let got = usiri.replaceSymbols(password, constants.symbols.none);

    it('should return password with same length', () => {
      assert(password.length === got.length);
    });

    it('should replace symbols with at least one from symbols provided', () => {
      assert(password !== got);
      assert(!isSymbol(got));

      got = usiri.replaceSymbols(password, constants.symbols.unambiguous);

      assert(password !== got);
      assert(isSymbol(got));
    });
  });

  describe('#insertSymbol', () => {
    const password = 'p';
    let got = usiri.insertSymbol(password, constants.symbols.none);

    it('should return password with same length', () => {
      assert(password.length === got.length);
    });

    it('should insert a symbols from symbols provided', () => {
      assert(password !== got);
      assert(!isSymbol(got));

      got = usiri.insertSymbol(password, constants.symbols.unambiguous);

      assert(password !== got);
      assert(isSymbol(got));
    });
  });

  describe('#makePassword', () => {
    let password = usiri.makePassword(args);

    it('should return a password string based on inputs', () => {
      assert(typeof password === 'string');
    });
  });
});
