// Components
export { default as Flag, Flag as FlagComponent } from './components/Flag';
export { default as FlagSelector, FlagSelector as FlagSelectorComponent } from './components/FlagSelector';

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

// Default export for convenience
import Flag from './components/Flag';
export default Flag;
