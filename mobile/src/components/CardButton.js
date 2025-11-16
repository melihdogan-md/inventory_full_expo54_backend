import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/layout';

export const CardButton = ({ label, description, color, onPress }) => {
  const accent = color || colors.primary;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.card,
        padding: spacing.lg,
        borderRadius: radius.xl,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: colors.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing.lg
        }}
      >
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 8,
            backgroundColor: accent
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>{label}</Text>
        {description ? (
          <Text style={{ color: colors.textSoft, marginTop: 4, fontSize: 13 }}>{description}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
