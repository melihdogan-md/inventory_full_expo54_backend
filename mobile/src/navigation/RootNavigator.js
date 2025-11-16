import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProductListScreen from '../screens/Products/ProductListScreen';
import ProductDetailScreen from '../screens/Products/ProductDetailScreen';
import ScanScreen from '../screens/ScanScreen';
import MovementScreen from '../screens/MovementScreen';
import MovementsHistoryScreen from '../screens/MovementsHistoryScreen';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { InventoryProvider } from '../context/InventoryContext';
import AddProductScreen from '../screens/Products/AddProductScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <InventoryProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="Products" component={ProductListScreen} />
              <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
              <Stack.Screen name="AddProduct" component={AddProductScreen} />
              <Stack.Screen name="Scan" component={ScanScreen} />
              <Stack.Screen name="Movement" component={MovementScreen} />
              <Stack.Screen name="MovementFromScan" component={MovementScreen} />
              <Stack.Screen name="MovementsHistory" component={MovementsHistoryScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </InventoryProvider>
  );
};

const RootNavigator = () => (
  <AuthProvider>
    <AppStack />
  </AuthProvider>
);

export default RootNavigator;
