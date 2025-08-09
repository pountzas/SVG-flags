import { CountryCode, CountryInfo } from './types';
import { AVAILABLE_COUNTRIES, isAvailableCountry } from './country-list';

// Import all SVG files directly
const flagSvgs: Record<string, string> = {};

// This will be populated at build time
// For now, let's create a simple fallback
const createFallbackSvg = (countryCode: string): string => {
  return `<svg width="512" height="336" viewBox="0 0 512 336" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="336" fill="#f0f0f0"/>
    <text x="256" y="168" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="24" fill="#666">
      ${countryCode.toUpperCase()}
    </text>
  </svg>`;
};

/**
 * Normalize country code to lowercase
 */
export const normalizeCountryCode = (code: string): CountryCode => {
  return code.toLowerCase().trim();
};

/**
 * Validate if a country code is in the correct format and available
 */
export const isValidCountryCode = (code: string): boolean => {
  const normalized = normalizeCountryCode(code);
  return /^[a-z]{2}$/.test(normalized) && isAvailableCountry(normalized);
};

/**
 * Get flag file path by country code
 */
export const getFlagPath = (country: CountryCode): string => {
  return `../flags/${country}.svg`;
};

/**
 * Load SVG content from file
 */
export const loadSvgContent = async (country: CountryCode): Promise<string | null> => {
  try {
    // Try to import the SVG file dynamically
    const svgModule = await import(`../flags/${country}.svg?raw`);
    return svgModule.default;
  } catch (error) {
    console.warn(`Failed to load flag for country: ${country}`, error);
    // Return a fallback SVG
    return createFallbackSvg(country);
  }
};

/**
 * Extract viewBox from SVG string
 */
export const extractViewBox = (svg: string): string | null => {
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  return viewBoxMatch ? viewBoxMatch[1] : null;
};

/**
 * Extract width and height from SVG string
 */
export const extractDimensions = (svg: string): { width: number; height: number } | null => {
  const widthMatch = svg.match(/width="([^"]+)"/);
  const heightMatch = svg.match(/height="([^"]+)"/);
  
  if (widthMatch && heightMatch) {
    return {
      width: parseInt(widthMatch[1], 10),
      height: parseInt(heightMatch[1], 10)
    };
  }
  
  return null;
};

/**
 * Calculate aspect ratio from SVG dimensions
 */
export const calculateAspectRatio = (svg: string): number | null => {
  const dimensions = extractDimensions(svg);
  if (dimensions) {
    return dimensions.width / dimensions.height;
  }
  return null;
};

/**
 * Resize SVG to specified dimensions
 */
export const resizeSvg = (svg: string, width: number, height: number): string => {
  return svg
    .replace(/width="[^"]*"/, `width="${width}"`)
    .replace(/height="[^"]*"/, `height="${height}"`);
};

/**
 * Add CSS classes to SVG
 */
export const addSvgClasses = (svg: string, className: string): string => {
  return svg.replace(/<svg/, `<svg class="${className}"`);
};

/**
 * Add inline styles to SVG
 */
export const addSvgStyles = (svg: string, styles: Record<string, string>): string => {
  const styleString = Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
  
  return svg.replace(/<svg/, `<svg style="${styleString}"`);
};

/**
 * Make SVG accessible by adding ARIA attributes
 */
export const makeSvgAccessible = (svg: string, alt: string): string => {
  return svg
    .replace(/<svg/, `<svg role="img" aria-label="${alt}"`)
    .replace(/<svg/, `<svg tabindex="0"`);
};

/**
 * Get all available country codes from the flags directory
 */
export const getAvailableCountryCodes = (): CountryCode[] => {
  return AVAILABLE_COUNTRIES as CountryCode[];
};

/**
 * Country information database
 */
export const countryDatabase: Record<CountryCode, CountryInfo> = {
  us: {
    code: 'us',
    name: 'United States',
    nativeName: 'United States',
    continent: 'North America',
    capital: 'Washington, D.C.',
    population: 331002651,
    area: 9833517,
    currency: 'USD',
    languages: ['English']
  },
  gb: {
    code: 'gb',
    name: 'United Kingdom',
    nativeName: 'United Kingdom',
    continent: 'Europe',
    capital: 'London',
    population: 67886011,
    area: 242495,
    currency: 'GBP',
    languages: ['English']
  },
  // Add more countries as needed
};

/**
 * Get country information by code
 */
export const getCountryInfo = (country: CountryCode): CountryInfo | null => {
  return countryDatabase[normalizeCountryCode(country)] || null;
};

/**
 * Search countries by name
 */
export const searchCountries = (query: string): CountryInfo[] => {
  const normalizedQuery = query.toLowerCase();
  return Object.values(countryDatabase).filter(country =>
    country.name.toLowerCase().includes(normalizedQuery) ||
    country.nativeName?.toLowerCase().includes(normalizedQuery)
  );
};
