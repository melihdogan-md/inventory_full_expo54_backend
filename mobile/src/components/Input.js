import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/layout';

export const Input = ({ label, ...props }) => {
  return (
    <View style={{ marginBottom: spacing.md }}>
      {label ? (
        <Text style={{ color: colors.textSoft, marginBottom: 4, fontSize: 13 }}>{label}</Text>
      ) : null}
      <TextInput
        placeholderTextColor={colors.textSoft}
        style={{
          backgroundColor: colors.backgroundAlt,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          borderWidth: 1,
          borderColor: colors.border,
          color: colors.text,
          fontSize: 16
        }}
        {...props}
      />
    </View>
  );
};
