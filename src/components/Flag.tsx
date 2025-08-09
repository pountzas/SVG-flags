import React, { useState, useEffect, useMemo } from 'react';
import { FlagProps } from '../types';
import { 
  normalizeCountryCode, 
  isValidCountryCode, 
  resizeSvg,
  addSvgClasses,
  addSvgStyles,
  makeSvgAccessible,
  getCountryInfo
} from '../utils';

// Import all SVG files dynamically
const loadSvgFile = async (countryCode: string): Promise<string | null> => {
  try {
    // Try to fetch the SVG file from the flags directory
    const response = await fetch(`/flags/${countryCode}.svg`);
    if (!response.ok) {
      throw new Error(`Failed to load flag for ${countryCode}`);
    }
    const svgContent = await response.text();
    return svgContent;
  } catch (error) {
    console.warn(`Failed to load flag for country: ${countryCode}`, error);
    return null;
  }
};

/**
 * Flag component that displays SVG country flags
 */
export const Flag: React.FC<FlagProps> = ({
  country,
  width = 32,
  height,
  className = '',
  style = {},
  alt,
  clickable = false,
  onClick,
  showBorder = false,
  borderColor = '#e5e7eb',
  borderWidth = 1,
  ...props
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedCountry = useMemo(() => normalizeCountryCode(country), [country]);
  const countryInfo = useMemo(() => getCountryInfo(normalizedCountry), [normalizedCountry]);

  // Calculate height based on aspect ratio if not provided
  const calculatedHeight = useMemo(() => {
    if (height) return height;
    if (svgContent) {
      const aspectRatio = 512 / 336; // Default aspect ratio for flags
      return width / aspectRatio;
    }
    return width * (336 / 512); // Default height based on common flag ratio
  }, [height, width, svgContent]);

  // Load SVG content
  useEffect(() => {
    if (!isValidCountryCode(normalizedCountry)) {
      setError(`Invalid country code: ${country}`);
      setIsLoading(false);
      return;
    }

    const loadFlag = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load actual SVG file
        const content = await loadSvgFile(normalizedCountry);
        
        if (content) {
          setSvgContent(content);
        } else {
          setError(`Flag not found for country: ${country}`);
        }
      } catch (err) {
        setError(`Failed to load flag for ${country}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadFlag();
  }, [normalizedCountry, country]);

  // Process SVG content
  const processedSvg = useMemo(() => {
    if (!svgContent) return null;

    let processed = svgContent;

    // Resize SVG
    processed = resizeSvg(processed, width, calculatedHeight);

    // Add CSS classes
    if (className) {
      processed = addSvgClasses(processed, className);
    }

    // Add inline styles
    const svgStyles: Record<string, string> = {
      display: 'block',
      maxWidth: '100%',
      height: 'auto'
    };

    // Add custom styles from props
    Object.entries(style).forEach(([key, value]) => {
      if (value !== undefined) {
        svgStyles[key] = String(value);
      }
    });

    if (showBorder) {
      svgStyles['border'] = `${borderWidth}px solid ${borderColor}`;
      svgStyles['borderRadius'] = '4px';
    }

    if (clickable) {
      svgStyles['cursor'] = 'pointer';
      svgStyles['transition'] = 'transform 0.2s ease-in-out';
    }

    processed = addSvgStyles(processed, svgStyles);

    // Make accessible
    const altText = alt || `${countryInfo?.name || country} flag`;
    processed = makeSvgAccessible(processed, altText);

    return processed;
  }, [svgContent, width, calculatedHeight, className, style, showBorder, borderColor, borderWidth, clickable, alt, countryInfo, country]);

  // Handle click
  const handleClick = (event: React.MouseEvent) => {
    if (clickable && onClick) {
      onClick(normalizedCountry);
    }
  };

  // Handle hover effects for clickable flags
  const handleMouseEnter = (event: React.MouseEvent) => {
    if (clickable) {
      const target = event.currentTarget as HTMLElement;
      target.style.transform = 'scale(1.05)';
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (clickable) {
      const target = event.currentTarget as HTMLElement;
      target.style.transform = 'scale(1)';
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          width,
          height: calculatedHeight,
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: showBorder ? '4px' : '0',
          border: showBorder ? `${borderWidth}px solid ${borderColor}` : 'none'
        }}
        className={className}
      >
        <span style={{ fontSize: '12px', color: '#6b7280' }}>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width,
          height: calculatedHeight,
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className={className}
        title={error}
      >
        <span style={{ fontSize: '12px', color: '#dc2626' }}>⚠️</span>
      </div>
    );
  }

  if (!processedSvg) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: processedSvg }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
      {...props}
    />
  );
};

export default Flag;
