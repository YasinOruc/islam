import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useApp } from '../contexts/AppContext';

const Footer: React.FC = () => {
    const { settings, updateSettings } = useApp();

    const toggleNotifications = () => {
        updateSettings({
            notifications: {
                ...settings.notifications,
                prayerTimes: !settings.notifications.prayerTimes
            }
        });
    };

    return (
        <View style={[
            styles.footer,
            { backgroundColor: settings.theme === 'dark' ? '#222' : '#f8f8f8' }
        ]}>
            <Text style={{ color: settings.theme === 'dark' ? '#fff' : '#000' }}>
                Prayer Notifications
            </Text>
            <Switch 
                value={settings.notifications.prayerTimes}
                onValueChange={toggleNotifications}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default Footer;
