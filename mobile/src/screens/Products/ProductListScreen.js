import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { AppContainer } from '../../components/AppContainer';
import { Header } from '../../components/Header';
import { useInventory } from '../../context/InventoryContext';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/layout';
import { PrimaryButton } from '../../components/PrimaryButton';

const SORT_MODES = [
  { key: 'createdAt', label: 'En Yeni' },
  { key: 'name', label: 'İsme göre' },
  { key: 'category', label: 'Kategori' }
];

const ProductListScreen = ({ navigation }) => {
  const { products, loading, reloadProducts } = useInventory();
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState('createdAt');

  useEffect(() => {
    reloadProducts(sortMode);
  }, [sortMode]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    const base = products.filter((p) => {
      return (
        !s ||
        p.name?.toLowerCase().includes(s) ||
        p.sku?.toLowerCase().includes(s) ||
        p.barcode?.toLowerCase().includes(s)
      );
    });

    // frontend’de de küçük bir sıralama desteği:
    return [...base].sort((a, b) => {
      if (sortMode === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortMode === 'category') {
        return (a.categoryName || '').localeCompare(b.categoryName || '');
      }
      // createdAt
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [products, search, sortMode]);

  return (
    <AppContainer>
      <Header
        title="Ürünler"
        onBack={() => navigation.goBack()}
        right={
          <TouchableOpacity onPress={() =>   navigation.navigate("AddProduct", {
            reloadProducts: loadProducts,
          })}>
            <Text style={{ color: colors.primary, fontWeight: '600' }}>+ Ürün</Text>
          </TouchableOpacity>
        }
      />
      <View style={{ paddingHorizontal: spacing.xl, paddingVertical: spacing.md, flex: 1 }}>
        {/* Arama */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.backgroundAlt,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.md,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: spacing.md
          }}
        >
          <TextInput
            placeholder="İsim, SKU veya barkod ara"
            placeholderTextColor={colors.textSoft}
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1, color: colors.text, paddingVertical: spacing.sm }}
          />
        </View>

        {/* Sıralama butonları */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: spacing.md,
            justifyContent: 'space-between'
          }}
        >
          {SORT_MODES.map((m) => {
            const active = sortMode === m.key;
            return (
              <TouchableOpacity
                key={m.key}
                onPress={() => setSortMode(m.key)}
                style={{
                  flex: 1,
                  paddingVertical: spacing.sm,
                  marginHorizontal: 4,
                  borderRadius: radius.lg,
                  borderWidth: 1,
                  borderColor: active ? colors.primary : colors.border,
                  backgroundColor: active ? colors.primarySoft : colors.backgroundAlt,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    color: active ? colors.primary : colors.textSoft,
                    fontSize: 12,
                    fontWeight: active ? '600' : '400'
                  }}
                >
                  {m.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Liste */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            loading ? (
              <View style={{ marginTop: spacing.xl, alignItems: 'center' }}>
                <ActivityIndicator color={colors.primary} />
              </View>
            ) : (
              <View style={{ marginTop: spacing.xl }}>
                <Text style={{ color: colors.textSoft }}>Ürün bulunamadı.</Text>
              </View>
            )
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
              style={{
                backgroundColor: colors.card,
                borderRadius: radius.lg,
                padding: spacing.lg,
                marginBottom: spacing.md,
                borderWidth: 1,
                borderColor: colors.border
              }}
            >
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
                {item.name}
              </Text>
              <Text style={{ color: colors.textSoft, marginTop: 2, fontSize: 13 }}>
                SKU: {item.sku || '-'}
              </Text>
              <Text style={{ color: colors.textSoft, marginTop: 2, fontSize: 13 }}>
                Barkod: {item.barcode || '-'}
              </Text>
              {item.categoryName && (
                <Text style={{ color: colors.textSoft, marginTop: 2, fontSize: 13 }}>
                  Kategori: {item.categoryName}
                </Text>
              )}
              <Text style={{ color: colors.primary, marginTop: 8, fontWeight: '600' }}>
                Stok: {item.currentQuantity ?? 0} {item.unit || ''}
              </Text>
              {item.price != null && (
                <Text style={{ color: colors.textSoft, marginTop: 2, fontSize: 13 }}>
                  Fiyat: {item.price.toFixed(2)} ₺
                </Text>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </AppContainer>
  );
};

export default ProductListScreen;
