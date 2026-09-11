import React from 'react';
import { Text, View } from 'react-native';

/**
 * FlagSelector uses DOM inputs and is web-only.
 * On React Native, use Flag or getEmbeddedFlag + SvgXml instead.
 */
export const FlagSelector: React.FC<Record<string, unknown>> = () => {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    console.warn(
      'svg-flags: FlagSelector is web-only. Use <Flag /> or getEmbeddedFlag with SvgXml on React Native.'
    );
  }

  return (
    <View>
      <Text>FlagSelector is web-only</Text>
    </View>
  );
};

export default FlagSelector;
