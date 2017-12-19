import makePassword from '../lib/usiri'
import getConstants from '../lib/constants/constants'
import { exec, execSync, spawn } from 'child_process'
import path from 'path'
import assert from 'assert'

const locale = 'sw'
const constants = getConstants(locale)
const test = 'test'

const args = {
  name: test,
  site: test,
  masterPassword: test,
  length:  constants.defaults.length,
  symbols: constants.defaults.symbols,
  release: constants.defaults.release,
  locale: locale,
}

const binPath = path.resolve(__dirname, '..', '..', 'usiri', 'bin', 'usiri')
const cmd = `${binPath} -j ${test} -s ${test} -p ${test} -a ${args.symbols} -u ${args.length} -t ${args.release}`;

const usiriRb = exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  const pw = execSync('pbpaste').toString();
  const password = makePassword(args)
  assert.equal(pw, password)
  // console.log(assert)
  // console.log(assert.equal)
})
