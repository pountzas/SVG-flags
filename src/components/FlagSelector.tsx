import React, { useState, useMemo, useCallback } from 'react';
import { Flag } from './Flag';
import { CountryCode, CountryInfo } from '../types';
import { 
  getAvailableCountryCodes, 
  getCountryInfo, 
  searchCountries,
  normalizeCountryCode 
} from '../utils';

export interface FlagSelectorProps {
  /** Currently selected country code */
  value?: CountryCode;
  /** Callback when country is selected */
  onChange?: (country: CountryCode) => void;
  /** Placeholder text for search input */
  placeholder?: string;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** CSS class name */
  className?: string;
  /** Additional styles */
  style?: React.CSSProperties;
  /** Flag size in pixels */
  flagSize?: number;
  /** Whether to show country names */
  showNames?: boolean;
  /** Whether to show search input */
  showSearch?: boolean;
  /** Maximum number of countries to display */
  maxResults?: number;
  /** Custom filter function */
  filter?: (country: CountryInfo) => boolean;
}

/**
 * FlagSelector component for selecting countries
 */
export const FlagSelector: React.FC<FlagSelectorProps> = ({
  value,
  onChange,
  placeholder = 'Search countries...',
  disabled = false,
  className = '',
  style = {},
  flagSize = 24,
  showNames = true,
  showSearch = true,
  maxResults = 50,
  filter,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Get available countries
  const availableCountries = useMemo(() => {
    const codes = getAvailableCountryCodes();
    return codes
      .map(code => getCountryInfo(code))
      .filter((country): country is CountryInfo => country !== null)
      .filter(country => filter ? filter(country) : true);
  }, [filter]);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return availableCountries.slice(0, maxResults);
    }

    const searchResults = searchCountries(searchQuery);
    return searchResults
      .filter(country => availableCountries.some(available => available.code === country.code))
      .slice(0, maxResults);
  }, [searchQuery, availableCountries, maxResults]);

  // Handle country selection
  const handleCountrySelect = useCallback((countryCode: CountryCode) => {
    onChange?.(countryCode);
    setIsOpen(false);
    setSearchQuery('');
  }, [onChange]);

  // Handle search input change
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  // Handle dropdown toggle
  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchQuery('');
      }
    }
  }, [disabled, isOpen]);

  // Handle click outside to close dropdown
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('.flag-selector')) {
      setIsOpen(false);
    }
  }, []);

  // Add/remove click outside listener
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen, handleClickOutside]);

  const selectedCountry = value ? getCountryInfo(normalizeCountryCode(value)) : null;

  return (
    <div 
      className={`flag-selector ${className}`}
      style={{ position: 'relative', display: 'inline-block', ...style }}
      {...props}
    >
      {/* Selected flag display */}
      <div
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          backgroundColor: disabled ? '#f9fafb' : '#ffffff',
          cursor: disabled ? 'not-allowed' : 'pointer',
          minWidth: '120px',
          userSelect: 'none'
        }}
      >
        {selectedCountry ? (
          <>
            <Flag 
              country={selectedCountry.code} 
              width={flagSize} 
              height={flagSize}
              showBorder
            />
            {showNames && (
              <span style={{ fontSize: '14px', color: disabled ? '#9ca3af' : '#374151' }}>
                {selectedCountry.name}
              </span>
            )}
          </>
        ) : (
          <span style={{ fontSize: '14px', color: '#9ca3af' }}>
            Select country
          </span>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}>
          ▼
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            maxHeight: '300px',
            overflow: 'hidden'
          }}
        >
          {/* Search input */}
          {showSearch && (
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #e5e7eb' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={placeholder}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                autoFocus
              />
            </div>
          )}

          {/* Country list */}
          <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.code}
                  onClick={() => handleCountrySelect(country.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f3f4f6',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Flag 
                    country={country.code} 
                    width={flagSize} 
                    height={flagSize}
                    showBorder
                  />
                  {showNames && (
                    <span style={{ fontSize: '14px', color: '#374151' }}>
                      {country.name}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>
                {searchQuery ? 'No countries found' : 'No countries available'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagSelector;
