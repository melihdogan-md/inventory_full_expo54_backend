import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { colors } from '../theme/colors';

export const AppContainer = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
};
