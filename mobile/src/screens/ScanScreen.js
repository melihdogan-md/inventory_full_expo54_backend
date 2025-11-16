import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { AppContainer } from '../components/AppContainer';
import { Header } from '../components/Header';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/layout';

const ScanScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedCode, setScannedCode] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const onBarcodeScanned = ({ data }) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setScannedCode(data);
    Alert.alert('Barcode scanned', data, [
      {
        text: 'Create Movement',
        onPress: () => {
          navigation.navigate('MovementFromScan', { barcode: data });
          setIsProcessing(false);
        }
      },
      {
        text: 'Scan Again',
        style: 'cancel',
        onPress: () => {
          setIsProcessing(false);
        }
      }
    ]);
  };

  if (!permission) {
    return (
      <AppContainer>
        <Header title="Scan" onBack={() => navigation.goBack()} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.text }}>Checking camera permissions...</Text>
        </View>
      </AppContainer>
    );
  }

  if (!permission.granted) {
    return (
      <AppContainer>
        <Header title="Scan" onBack={() => navigation.goBack()} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl }}>
          <Text style={{ color: colors.text, textAlign: 'center', marginBottom: spacing.lg }}>
            Camera permission is required to scan barcodes.
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.md,
              borderRadius: radius.lg
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Header title="Scan barcode" onBack={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: spacing.lg, borderRadius: radius.xl, overflow: 'hidden' }}>
          <CameraView
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'upc_a', 'upc_e']
            }}
            onBarcodeScanned={isProcessing ? undefined : onBarcodeScanned}
          />
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: '8%',
              right: '8%',
              top: '25%',
              bottom: '25%',
              borderWidth: 2,
              borderColor: colors.primary,
              borderRadius: radius.lg
            }}
          />
        </View>
        <View style={{ padding: spacing.lg }}>
          <Text style={{ color: colors.textSoft, textAlign: 'center' }}>
            Align the barcode inside the frame. Scanning will be done automatically.
          </Text>
          {scannedCode ? (
            <Text
              style={{
                color: colors.textSoft,
                textAlign: 'center',
                marginTop: spacing.md,
                fontSize: 12
              }}
            >
              Last scanned: {scannedCode}
            </Text>
          ) : null}
        </View>
      </View>
    </AppContainer>
  );
};

export default ScanScreen;
