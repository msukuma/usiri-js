const assert = require('assert');
const constants = require('../lib/constants/en');
const isSymbol = require('../lib/helpers').isSymbol;
const Usiri = require('../lib/usiri');
const helpers = require('./helpers');
const makeArgs = helpers.makeArgs;
const passedAndType = helpers.passedAndType;
let usiri;
let password;
let args;

describe('Usiri', () => {
  beforeEach(() => {
    usiri = new Usiri();
    args = makeArgs(constants);
    password = usiri.makePassword(args);
  });

  describe('constructor', ()=> {
    it('should be a class', () => {
      assert(usiri.constructor === Usiri);
    });

    it('should validate locale', () => {
      assert.throws(() => new Usiri('fake'));
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
    let password = '"';
    let got;

    it('should return password with same length', () => {
      got = usiri.replaceSymbols(password, constants.symbols.none);
      assert(password.length === got.length);
    });

    it('should replace symbols with at least one from symbols provided', () => {
      assert(password !== got);
      assert(!isSymbol(got));

      got = usiri.replaceSymbols(password, constants.symbols.unambiguous);
      assert(password !== got);
      assert(isSymbol(got));

      password = 'h';
      got = usiri.replaceSymbols(password, constants.symbols.none);
      assert(password === got);
    });
  });

  describe('#insertSymbol', () => {
    let password = 'p';
    let got;

    it('should return password with same length', () => {
      got = usiri.insertSymbol(password, constants.symbols.none);
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

    it('should return a password string', () => {
      assert(typeof password === 'string');
    });

    describe('args.name', () => {
      passedAndType(makeArgs(constants), 'name', 'string');
    });

    describe('args.site', () => {
      passedAndType(makeArgs(constants), 'site', 'string');
    });

    describe('args.masterPassword', () => {
      passedAndType(makeArgs(constants), 'masterPassword', 'string');
    });

    describe('args.symbols', () => {
      passedAndType(makeArgs(constants), 'symbols', 'string');

      it('should be one of [any, unambiguous, none]', () => {
        assert.throws(() => {
          args.symbols = 'throwError';
          usiri.makePassword(args);
        });

        assert.doesNotThrow(() => {usiri.makePassword(makeArgs(constants));});
        assert.doesNotThrow(() => {usiri.makePassword(makeArgs(constants, { symbols: 'unambiguous' }));});
        assert.doesNotThrow(() => {usiri.makePassword(makeArgs(constants, { symbols: 'none' }));});
      });

      describe('any', () => {
        it('should return a password with any symbols', () => {
          password = usiri.makePassword(args);
          assert(constants.regex.symbols.test(password));
        });
      });

      describe('unambiguous', () => {
        it('should return a password with unambiguous symbols', () => {
          args.symbols = constants.unambiguous;
          password = usiri.makePassword(args);
          assert(constants.regex.symbols.test(password));

          password.get((chr) => {
            if (isSymbol(chr)) {
              assert(constants.symbols.unambiguous.indexOf(chr) !== -1);
              return true;
            }
          });

        });
      });

      describe('none', () => {
        it('should return a password without symbols', () => {
          args.symbols = constants.none;
          password = usiri.makePassword(args);
          assert(!constants.regex.symbols.test(password));
        });
      });
    });

    describe('args.length', () => {
      passedAndType(makeArgs(constants), 'length', 'number');

      it('should default to 23 characters', () => {
        args.symbols = constants.defaults.symbols;
        assert(password.length === constants.defaults.length);
      });

      it('should return a password of desired length', () => {
        let newLength = 17;
        args.length = newLength;
        password = usiri.makePassword(args);
        assert(password.length === newLength);
      });

      it('should allow a minimum password length of 16 characters', () => {
        assert.throws(() => {
          args.length = 15;
          usiri.makePassword(args);
        });
      });

      it('should limit password length to 88 characters', () => {
        assert.throws(() => {
          args.length = 89;
          usiri.makePassword(args);
        });
      });
    });

    describe('args.release', () => {
      it('should return a password that\'s different from that of another release', () => {
        args.release = '1.1';
        let newPassword = usiri.makePassword(args);
        assert(password !== newPassword);
      });
    });
  });
});
