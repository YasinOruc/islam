import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings, PrayerTimes, Location } from '../utils/types';

interface AppContextType {
    settings: Settings;
    updateSettings: (settings: Partial<Settings>) => void;
    prayerTimes: PrayerTimes | null;
    setPrayerTimes: (times: PrayerTimes | null) => void;
    location: Location | null;
    setLocation: (location: Location | null) => void;
    isLoading: boolean;
    error: Error | null;
    clearError: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
    SETTINGS: '@prayer_app_settings',
    LOCATION: '@prayer_app_location'
} as const;

const DEFAULT_SETTINGS: Settings = {
    calculationMethod: '2',
    madhab: 'shafi',
    language: 'en',
    theme: 'light',
    notifications: {
        prayerTimes: true,
        dailyTip: true,
        quranReminder: false,
    }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        loadStoredData();
    }, []);

    const loadStoredData = async () => {
        try {
            const [storedSettings, storedLocation] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.SETTINGS),
                AsyncStorage.getItem(STORAGE_KEYS.LOCATION)
            ]);

            if (storedSettings) {
                setSettings(JSON.parse(storedSettings));
            }
            if (storedLocation) {
                setLocation(JSON.parse(storedLocation));
            }
        } catch (error) {
            console.error('Error loading stored data:', error);
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateSettings = async (newSettings: Partial<Settings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
        } catch (error) {
            console.error('Error saving settings:', error);
            setError(error as Error);
        }
    };

    const handleError = (error: Error) => {
        setError(error);
        console.error('App Error:', error);
    };

    const clearError = () => setError(null);

    return (
        <AppContext.Provider value={{
            settings,
            updateSettings,
            prayerTimes,
            setPrayerTimes,
            location,
            setLocation,
            isLoading,
            error,
            clearError
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
