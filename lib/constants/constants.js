import universal from './locales/universal'
import { merge, getLocale, locales } from './helpers';


export default function getConstants(locale) {
  let constants;
  const _locale = getLocale(locale);

  if(_locale === null){
    throw new Error(`Locale not found. Expected one of ${locales.join(' ,')}!`);
  }

  constants =  merge(universal, _locale);
  return constants
  // console.log(constants);
};
