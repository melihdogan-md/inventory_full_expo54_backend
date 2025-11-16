import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { AppContainer } from '../../components/AppContainer';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { PrimaryButton } from '../../components/PrimaryButton';
import { colors } from '../../theme/colors';
import { spacing, radius } from '../../theme/layout';
import { useInventory } from '../../context/InventoryContext';
import { api } from '../../api/client';

const AddProductScreen = ({ navigation }) => {
  const { categories, reloadProducts } = useInventory();

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Eksik bilgi', 'Ürün adı zorunludur.');
      return;
    }

    const payload = {
      name: name.trim(),
      sku: sku.trim() || null,
      barcode: barcode.trim() || null,
      unit: unit.trim() || null,
      categoryId,
      price: price ? Number(price.replace(',', '.')) : null
    };

    if (payload.price != null && (isNaN(payload.price) || payload.price < 0)) {
      Alert.alert('Hatalı fiyat', 'Geçerli bir fiyat giriniz.');
      return;
    }

    setSaving(true);
    try {
      await api.post('/api/products', payload);
      await reloadProducts('createdAt');
      Alert.alert('Başarılı', 'Ürün eklendi.', [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack()
        }
      ]);
    } catch (e) {
      console.warn(e);
      Alert.alert('Hata', 'Ürün kaydedilirken bir sorun oluştu.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppContainer>
      <Header title="Yeni Ürün" onBack={() => navigation.goBack()} />
      <ScrollView
        style={{ flex: 1, padding: spacing.xl }}
        keyboardShouldPersistTaps="handled"
      >
        <Input label="Ürün Adı *" value={name} onChangeText={setName} />

        <Input label="SKU" value={sku} onChangeText={setSku} />

        <Input label="Barkod" value={barcode} onChangeText={setBarcode} />

        <Input label="Birim" value={unit} onChangeText={setUnit} placeholder="Adet, Kutu, Kg..." />

        <Input
          label="Fiyat (opsiyonel)"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
          placeholder="Örn: 120.50"
        />

        {/* Basit kategori seçici */}
        <Text style={{ color: colors.textSoft, marginTop: spacing.md, marginBottom: 4 }}>
          Kategori (opsiyonel)
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: spacing.lg
          }}
        >
          <TouchableOpacity
            onPress={() => setCategoryId(null)}
            style={{
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: categoryId == null ? colors.primary : colors.border,
              backgroundColor: categoryId == null ? colors.primarySoft : colors.backgroundAlt,
              marginRight: 6,
              marginBottom: 6
            }}
          >
            <Text style={{ color: categoryId == null ? colors.primary : colors.textSoft }}>
              Yok
            </Text>
          </TouchableOpacity>

          {categories.map((c) => {
            const active = categoryId === c.id;
            return (
              <TouchableOpacity
                key={c.id}
                onPress={() => setCategoryId(c.id)}
                style={{
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  borderRadius: radius.lg,
                  borderWidth: 1,
                  borderColor: active ? colors.primary : colors.border,
                  backgroundColor: active ? colors.primarySoft : colors.backgroundAlt,
                  marginRight: 6,
                  marginBottom: 6
                }}
              >
                <Text style={{ color: active ? colors.primary : colors.textSoft }}>
                  {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <PrimaryButton
          title={saving ? 'Kaydediliyor...' : 'Kaydet'}
          onPress={handleSave}
          disabled={saving}
        />
      </ScrollView>
    </AppContainer>
  );
};

export default AddProductScreen;
