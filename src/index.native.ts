// Components (React Native)
export { default as Flag, Flag as FlagComponent } from './components/Flag.native';
export {
  default as FlagSelector,
  FlagSelector as FlagSelectorComponent
} from './components/FlagSelector.native';

// Types
export type {
  FlagProps,
  FlagData,
  CountryInfo,
  CountryCode,
  FlagLibrary
} from './types';

// Utilities
export {
  normalizeCountryCode,
  isValidCountryCode,
  getFlagPath,
  loadSvgContent,
  extractViewBox,
  extractDimensions,
  calculateAspectRatio,
  resizeSvg,
  addSvgClasses,
  addSvgStyles,
  makeSvgAccessible,
  getAvailableCountryCodes,
  getCountryInfo,
  searchCountries,
  countryDatabase
} from './utils';

// Country list
export { AVAILABLE_COUNTRIES, isAvailableCountry } from './country-list';
export type { AvailableCountryCode } from './country-list';

// Embedded flags (works without React / react-native-svg)
export {
  EMBEDDED_FLAGS,
  getEmbeddedFlag,
  getEmbeddedCountryCodes,
  isEmbeddedCountryAvailable
} from './embedded-flags';
export type { EmbeddedCountryCode } from './embedded-flags';

import Flag from './components/Flag.native';
export default Flag;
