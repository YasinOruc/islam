import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './index';
import PrayerTimesPage from './prayer-times';
import QuranPage from './quran';
import HadithPage from './hadith';
import DuasPage from './duas';
import SettingsPage from './settings';
import { AppProvider, useApp } from '../contexts/AppContext';
import { RootStackParamList } from '../utils/types';

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator = () => {
    const { settings } = useApp();
    
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';
                    
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Prayer Times':
                            iconName = focused ? 'time' : 'time-outline';
                            break;
                        case 'Quran':
                            iconName = focused ? 'book' : 'book-outline';
                            break;
                        case 'Hadith':
                            iconName = focused ? 'library' : 'library-outline';
                            break;
                        case 'Duas':
                            iconName = focused ? 'heart' : 'heart-outline';
                            break;
                        case 'Settings':
                            iconName = focused ? 'settings' : 'settings-outline';
                            break;
                    }
                    
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: settings.theme === 'dark' ? '#fff' : '#000',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: settings.theme === 'dark' ? '#222' : '#fff',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Prayer Times" component={PrayerTimesPage} />
            <Tab.Screen name="Quran" component={QuranPage} />
            <Tab.Screen name="Hadith" component={HadithPage} />
            <Tab.Screen name="Duas" component={DuasPage} />
            <Tab.Screen name="Settings" component={SettingsPage} />
        </Tab.Navigator>
    );
};

const AppLayout: React.FC = () => {
    return (
        <AppProvider>
            <TabNavigator />
        </AppProvider>
    );
};

export default AppLayout;
