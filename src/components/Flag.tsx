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
import { getEmbeddedFlag } from '../embedded-flags';

/**
 * Flag component that displays SVG country flags
 * Uses embedded SVG content for instant loading - no HTTP requests needed!
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
  fallback = '⚠️',
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

  // Load SVG content instantly from embedded data
  useEffect(() => {
    if (!isValidCountryCode(normalizedCountry)) {
      setError(`Invalid country code: ${country}`);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Get SVG content instantly from embedded data
      const content = getEmbeddedFlag(normalizedCountry);
      
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
  const handleClick = (_event: React.MouseEvent) => {
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
          backgroundColor: '#1e2939',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: showBorder ? '4px' : '0',
          border: showBorder ? `${borderWidth}px solid ${borderColor}` : 'none'
        }}
        className={className}
      >
        <span ></span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width,
          height: calculatedHeight,
          backgroundColor: '',
          border: '',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: Math.min(width, calculatedHeight) ,
          color: '#dc2626'
        }}
        className={className}
        title={error}
      >
        {fallback}
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
