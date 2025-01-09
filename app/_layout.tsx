import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './index';
import PrayerTimesPage from './prayer-times';
import SettingsPage from './settings'; // Assuming you have a settings page
import { AppProvider, useApp } from '../contexts/AppContext';

const Tab = createBottomTabNavigator();

const AppLayout: React.FC = () => {
    const { settings } = useApp();
    const systemTheme = useColorScheme();
    const currentTheme = settings.theme === 'auto' ? systemTheme || 'light' : settings.theme;

    return (
        <AppProvider>
            <NavigationContainer theme={currentTheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName: keyof typeof Ionicons.glyphMap = 'home';
                            if (route.name === 'Prayer Times') iconName = 'time';
                            if (route.name === 'Settings') iconName = 'settings';
                            return <Ionicons name={iconName} size={size} color={color} />;
                        }
                    })}
                >
                    <Tab.Screen name="Home" component={HomePage} />
                    <Tab.Screen name="Prayer Times" component={PrayerTimesPage} />
                    <Tab.Screen name="Settings" component={SettingsPage} />
                </Tab.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
};

export default AppLayout;
