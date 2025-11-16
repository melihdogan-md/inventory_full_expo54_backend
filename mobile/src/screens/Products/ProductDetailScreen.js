import React from 'react';
import { View, Text } from 'react-native';
import { AppContainer } from '../../components/AppContainer';
import { Header } from '../../components/Header';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/layout';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const openMovement = (direction) => {
    navigation.navigate('Movement', { product, direction });
  };

  return (
    <AppContainer>
      <Header title="Product" onBack={() => navigation.goBack()} />
      <View style={{ flex: 1, padding: spacing.xl }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700', marginBottom: 8 }}>
          {product.name}
        </Text>
        <Text style={{ color: colors.textSoft, marginBottom: 4 }}>SKU: {product.sku}</Text>
        <Text style={{ color: colors.textSoft, marginBottom: 4 }}>
          Barcode: {product.barcode || '-'}
        </Text>
        <Text style={{ color: colors.textSoft, marginBottom: spacing.lg }}>
          Category: {product.categoryName || '-'}
        </Text>

        <Text style={{ color: colors.text, fontSize: 18, marginBottom: spacing.lg }}>
          Current stock:{' '}
          <Text style={{ color: colors.primary, fontWeight: '700' }}>
            {product.currentQuantity ?? 0} {product.unit || ''}
          </Text>
        </Text>

        <View style={{ gap: spacing.md }}>
          <PrimaryButton title="Stock In" onPress={() => openMovement('IN')} />
          <PrimaryButton title="Stock Out" variant="danger" onPress={() => openMovement('OUT')} />
        </View>
      </View>
    </AppContainer>
  );
};

export default ProductDetailScreen;
