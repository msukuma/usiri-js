const assert = require('assert');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

exports.makeArgs = function makeArgs(constants, custom = {}) {
  return {
    name: custom.name || constants.test,
    site: custom.site || constants.test,
    masterPassword: custom.masterPassword || constants.test,
    symbols: custom.symbols || constants.defaults.symbols,
    length: custom.length ||  constants.defaults.length,
    release: custom.release || constants.defaults.release,
  };
};

exports.passedAndType = function passedAndType(args, arg, type) {
  it(`should validate that ${arg} was passed`, () => {
    assert.throws(() => {
      delete args[arg];
      usiri.makePassword(args);
    });
  });

  it(`should validate that ${arg} is a ${type}`, () => {
    assert.throws(() => {
      args[arg] = 54;
      usiri.makePassword(args);
    });
  });
};
