import React, { useCallback } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'arabic': require('../assets/fonts/me_quran.ttf'), // Update font path and name
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'fade_from_bottom',
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      />
    </View>
  );
}
