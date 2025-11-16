import React from 'react';
import { View, Text } from 'react-native';
import { AppContainer } from '../components/AppContainer';
import { Header } from '../components/Header';
import { CardButton } from '../components/CardButton';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/layout';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <AppContainer>
      <Header
        title="Dashboard"
        right={
          <PrimaryButton
            title="Logout"
            variant="outline"
            onPress={logout}
          />
        }
      />
      <View style={{ flex: 1, padding: spacing.xl }}>
        <Text style={{ color: colors.textSoft, marginBottom: spacing.xl }}>
          {user ? `Signed in as ${user.username || user.name || ''}` : 'Signed in'}
        </Text>

        <CardButton
          label="Scan & Move Stock"
          description="Open the camera and immediately post stock in/out movements."
          color={colors.primary}
          onPress={() => navigation.navigate('Scan')}
        />

        <CardButton
          label="Products"
          description="Browse catalog, see stock levels and details."
          color={colors.success}
          onPress={() => navigation.navigate('Products')}
        />

        <CardButton
          label="Recent Movements"
          description="Review last operations for audit and control."
          color={colors.warning}
          onPress={() => navigation.navigate('MovementsHistory')}
        />
      </View>
    </AppContainer>
  );
};

export default DashboardScreen;
