export interface FlagProps {
  /** The country code (e.g., 'us', 'gb', 'fr') */
  country: string;
  /** Width of the flag in pixels */
  width?: number;
  /** Height of the flag in pixels */
  height?: number;
  /** CSS class name for styling */
  className?: string;
  /** Additional CSS styles */
  style?: React.CSSProperties;
  /** Alt text for accessibility */
  alt?: string;
  /** Whether the flag should be clickable */
  clickable?: boolean;
  /** Click handler function */
  onClick?: (country: string) => void;
  /** Whether to show a border around the flag */
  showBorder?: boolean;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
}

export interface FlagData {
  /** Country code */
  code: string;
  /** Country name */
  name: string;
  /** Flag SVG content */
  svg: string;
}

export interface CountryInfo {
  /** ISO 3166-1 alpha-2 country code */
  code: string;
  /** Country name in English */
  name: string;
  /** Country name in native language */
  nativeName?: string;
  /** Continent */
  continent?: string;
  /** Capital city */
  capital?: string;
  /** Population */
  population?: number;
  /** Area in square kilometers */
  area?: number;
  /** Currency code */
  currency?: string;
  /** Languages spoken */
  languages?: string[];
}

export type CountryCode = string;

export interface FlagLibrary {
  /** Get flag SVG content by country code */
  getFlag: (country: CountryCode) => string | null;
  /** Get all available country codes */
  getCountryCodes: () => CountryCode[];
  /** Get country information */
  getCountryInfo: (country: CountryCode) => CountryInfo | null;
  /** Check if a country code is valid */
  isValidCountry: (country: CountryCode) => boolean;
}
