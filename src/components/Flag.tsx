import React, { useMemo } from 'react';
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
 * Web Flag component. Reads embedded SVG strings synchronously so React DOM,
 * Vite, and Next.js (SSR / RSC-friendly when not using click handlers) all work
 * without Vite-only `?raw` dynamic imports or client-only loading flashes.
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
  const normalizedCountry = useMemo(() => normalizeCountryCode(country), [country]);
  const countryInfo = useMemo(() => getCountryInfo(normalizedCountry), [normalizedCountry]);
  const calculatedHeight = height ?? width * (336 / 512);

  const svgContent = useMemo(() => {
    if (!isValidCountryCode(normalizedCountry)) {
      return null;
    }
    return getEmbeddedFlag(normalizedCountry);
  }, [normalizedCountry]);

  const processedSvg = useMemo(() => {
    if (!svgContent) {
      return null;
    }

    let processed = resizeSvg(svgContent, width, calculatedHeight);

    if (className) {
      processed = addSvgClasses(processed, className);
    }

    const svgStyles: Record<string, string> = {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
      ...Object.fromEntries(
        Object.entries(style).filter(([, value]) => value !== undefined).map(([key, value]) => [key, String(value)])
      )
    };

    if (showBorder) {
      svgStyles['border'] = `${borderWidth}px solid ${borderColor}`;
      svgStyles['borderRadius'] = '4px';
    }

    if (clickable) {
      svgStyles['cursor'] = 'pointer';
      svgStyles['transition'] = 'transform 0.2s ease-in-out';
    }

    processed = addSvgStyles(processed, svgStyles);

    const altText = alt || `${countryInfo?.name || country} flag`;
    processed = makeSvgAccessible(processed, altText);

    return processed;
  }, [
    svgContent,
    width,
    calculatedHeight,
    className,
    style,
    showBorder,
    borderColor,
    borderWidth,
    clickable,
    alt,
    countryInfo,
    country
  ]);

  const handleClick = (_event: React.MouseEvent) => {
    if (clickable && onClick) {
      onClick(normalizedCountry);
    }
  };

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

  if (!processedSvg) {
    const error =
      !isValidCountryCode(normalizedCountry)
        ? `Invalid country code: ${country}`
        : `Flag not found for country: ${country}`;

    return (
      <div
        style={{
          width,
          height: calculatedHeight,
          backgroundColor: '#f3f4f6',
          border: showBorder ? `${borderWidth}px solid ${borderColor}` : '1px solid #fecaca',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: Math.min(width, calculatedHeight) * 0.45,
          color: '#dc2626'
        }}
        className={className}
        title={error}
        {...props}
      >
        {fallback}
      </div>
    );
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
