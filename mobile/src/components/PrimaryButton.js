import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/layout';

export const PrimaryButton = ({ title, onPress, variant = 'primary', disabled }) => {
  const background =
    variant === 'danger' ? colors.danger : variant === 'outline' ? 'transparent' : colors.primary;
  const borderColor =
    variant === 'outline' ? colors.primary : variant === 'danger' ? colors.danger : colors.primary;
  const textColor = variant === 'outline' ? colors.primary : '#ffffff';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        paddingVertical: spacing.md,
        borderRadius: radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: disabled ? '#4b5563' : background,
        borderWidth: 1,
        borderColor
      }}
    >
      <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );
};
