import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AppContainer } from '../components/AppContainer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/layout';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Missing data', 'Please fill username and password.');
      return;
    }
    setSubmitting(true);
    try {
      await login(username, password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }]
      });
    } catch (e) {
      console.warn(e);
      Alert.alert('Login failed', 'Please check your credentials or server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppContainer>
      <Header title="Sign In" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: spacing.xl,
            paddingTop: spacing.xl,
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 26,
              fontWeight: '700',
              marginBottom: spacing.lg
            }}
          >
            Inventory Control
          </Text>
          <Text style={{ color: colors.textSoft, marginBottom: spacing.xl, fontSize: 14 }}>
            Scan, track and control stock movements directly from the shop floor.
          </Text>

          <Input
            label="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            placeholder="jane.doe"
          />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
          />
          <View style={{ height: spacing.lg }} />
          <PrimaryButton title={submitting ? 'Signing in...' : 'Sign In'} onPress={handleLogin} disabled={submitting} />
        </View>
      </KeyboardAvoidingView>
    </AppContainer>
  );
};

export default LoginScreen;
