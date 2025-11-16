import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { AppContainer } from '../components/AppContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/layout';
import { api } from '../api/client';

const MovementsHistoryScreen = ({ navigation }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/stock-movements?limit=50');
      setRows(res.data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation]);

  return (
    <AppContainer>
      <Header title="Recent Movements" onBack={() => navigation.goBack()} />
      <View style={{ flex: 1, padding: spacing.xl }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={rows}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: colors.card,
                  borderRadius: radius.lg,
                  padding: spacing.lg,
                  marginBottom: spacing.md,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
              >
                <Text style={{ color: colors.text, fontWeight: '600' }}>
                  {item.productName || item.barcode}
                </Text>
                <Text style={{ color: colors.textSoft, marginTop: 2, fontSize: 12 }}>
                  {item.direction === 'IN' ? 'Stock In' : 'Stock Out'} · Qty {item.quantity}
                </Text>
                <Text style={{ color: colors.textSoft, marginTop: 2, fontSize: 12 }}>
                  {item.performedBy || '—'} · {item.performedAt}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ color: colors.textSoft }}>No movements found.</Text>
            }
          />
        )}
      </View>
    </AppContainer>
  );
};

export default MovementsHistoryScreen;
