import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { useApp } from '../../contexts/AppContext';

// Settings page component displaying all app configurations
const SettingsPage: React.FC = () => {
    const { settings, updateSettings } = useApp();

    const sections = [
        {
            title: 'Prayer Time Settings',
            items: [
                { label: 'Change Location', screen: 'LocationSettings' },
                { label: 'Calculation Method', screen: 'CalculationSettings' },
                { label: 'School of Thought', screen: 'MadhabSettings' },
            ]
        },
        {
            title: 'App Settings',
            items: [
                { label: 'Language', screen: 'LanguageSettings' },
                { 
                    label: 'Dark Theme',
                    type: 'switch',
                    value: settings.theme === 'dark',
                    onChange: (value: boolean) => 
                        updateSettings({ theme: value ? 'dark' : 'light' })
                },
            ]
        },
        {
            title: 'Notifications',
            items: [
                {
                    label: 'Prayer Times',
                    type: 'switch',
                    value: settings.notifications.prayerTimes,
                    onChange: (value: boolean) =>
                        updateSettings({ 
                            notifications: { ...settings.notifications, prayerTimes: value }
                        })
                },
                // ... other notification settings
            ]
        }
    ];

    return (
        <ScrollView style={styles.container}>
            {sections.map((section, index) => (
                <View key={index} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {section.items.map((item, itemIndex) => (
                        <View key={itemIndex} style={styles.option}>
                            <Text>{item.label}</Text>
                            {item.type === 'switch' ? (
                                <Switch
                                    value={item.value}
                                    onValueChange={item.onChange}
                                />
                            ) : (
                                <Text style={styles.arrow}>→</Text>
                            )}
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        fontSize: 24,
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 16,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    arrow: {
        fontSize: 18,
        color: '#999',
    },
});

export default SettingsPage;
