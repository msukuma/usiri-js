import options from 'options-parser'
import constants from './constants/constants'


const result = options.parse(constants.options);
export default result;
