import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { AppContainer } from '../components/AppContainer';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/layout';
import { api } from '../api/client';

const MovementScreen = ({ route, navigation }) => {
  const { product, direction: initialDirection, barcode } = route.params || {};
  const [direction, setDirection] = useState(initialDirection || 'IN');
  const [quantity, setQuantity] = useState('1');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    const qty = Number(quantity.replace(',', '.'));
    if (!qty || Number.isNaN(qty) || qty <= 0) {
      Alert.alert('Invalid quantity', 'Please enter a positive number.');
      return;
    }

    const payload = {
      productId: product?.id ?? null,
      barcode: product?.barcode || barcode || null,
      direction,
      quantity: qty,
      note: note || null
    };

    setSaving(true);
    try {
      await api.post('/api/stock-movements', payload);
      Alert.alert('Success', 'Movement recorded.', [
        {
          text: 'OK',
          onPress: () => {
            navigation.popToTop();
          }
        }
      ]);
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', 'Could not save movement.');
    } finally {
      setSaving(false);
    }
  };

  const title =
    product && product.name
      ? `Movement - ${product.name}`
      : barcode
      ? `Movement - ${barcode}`
      : 'Movement';

  return (
    <AppContainer>
      <Header title={title} onBack={() => navigation.goBack()} />
      <View style={{ flex: 1, padding: spacing.xl }}>
        <Text style={{ color: colors.textSoft, marginBottom: spacing.lg }}>Direction</Text>
        <View style={{ flexDirection: 'row', marginBottom: spacing.lg, justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <PrimaryButton
              title="Stock In"
              onPress={() => setDirection('IN')}
              variant={direction === 'IN' ? 'primary' : 'outline'}
            />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <PrimaryButton
              title="Stock Out"
              onPress={() => setDirection('OUT')}
              variant={direction === 'OUT' ? 'danger' : 'outline'}
            />
          </View>
        </View>

        <Input
          label="Quantity"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />

        <Input
          label="Note (optional)"
          value={note}
          onChangeText={setNote}
          placeholder="Reason for this movement"
        />

        <View style={{ marginTop: spacing.xl }}>
          <PrimaryButton
            title={saving ? 'Saving...' : 'Save Movement'}
            onPress={handleSubmit}
            disabled={saving}
          />
        </View>
      </View>
    </AppContainer>
  );
};

export default MovementScreen;
