import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useApp } from '../contexts/AppContext';

type RootStackParamList = {
    Settings: undefined;
    Home: undefined;
};

const Header: React.FC = () => {
    const { settings } = useApp();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={[
            styles.header,
            { backgroundColor: settings.theme === 'dark' ? '#222' : '#f8f8f8' }
        ]}>
            <Text style={[
                styles.title,
                { color: settings.theme === 'dark' ? '#fff' : '#000' }
            ]}>
                Prayer Times
            </Text>
            <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;
