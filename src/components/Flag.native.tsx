import React, { useMemo } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { FlagProps } from '../types';
import {
  normalizeCountryCode,
  isValidCountryCode,
  resizeSvg,
  makeSvgAccessible,
  getCountryInfo
} from '../utils';
import { getEmbeddedFlag } from '../embedded-flags';

/**
 * React Native Flag component. Renders embedded SVG via react-native-svg SvgXml.
 */
export const Flag: React.FC<FlagProps> = ({
  country,
  width = 32,
  height,
  style = {},
  alt,
  clickable = false,
  onClick,
  showBorder = false,
  borderColor = '#e5e7eb',
  borderWidth = 1,
  fallback = '⚠️'
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

  const xml = useMemo(() => {
    if (!svgContent) {
      return null;
    }

    let processed = resizeSvg(svgContent, width, calculatedHeight);
    const altText = alt || `${countryInfo?.name || country} flag`;
    processed = makeSvgAccessible(processed, altText);
    return processed;
  }, [svgContent, width, calculatedHeight, alt, countryInfo, country]);

  const containerStyle: ViewStyle = {
    width,
    height: calculatedHeight,
    overflow: 'hidden',
    ...(showBorder
      ? {
          borderWidth,
          borderColor,
          borderRadius: 4
        }
      : {}),
    ...style
  };

  const accessibilityLabel = alt || `${countryInfo?.name || country} flag`;

  if (!xml) {
    const errorStyle: ViewStyle = {
      ...containerStyle,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6'
    };

    return (
      <View style={errorStyle} accessibilityLabel={accessibilityLabel}>
        <Text
          style={{
            fontSize: Math.min(width, calculatedHeight) * 0.45,
            color: '#dc2626',
            textAlign: 'center'
          }}
        >
          {fallback}
        </Text>
      </View>
    );
  }

  const flag = (
    <SvgXml
      xml={xml}
      width={width}
      height={calculatedHeight}
      accessibilityLabel={accessibilityLabel}
    />
  );

  if (clickable && onClick) {
    return (
      <Pressable
        onPress={() => onClick(normalizedCountry)}
        style={containerStyle}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
      >
        {flag}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{flag}</View>;
};

export default Flag;
