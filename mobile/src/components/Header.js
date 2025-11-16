import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/layout';

export const Header = ({ title, right, onBack }) => {
  return (
    <View
      style={{
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.backgroundAlt
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={{
              width: 40,
              height: 40,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.md
            }}
          >
            <Text style={{ color: colors.primary, fontSize: 24 }}>{'‹'}</Text>
          </TouchableOpacity>
        )}
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: '600' }}>{title}</Text>
      </View>
      {right}
    </View>
  );
};
