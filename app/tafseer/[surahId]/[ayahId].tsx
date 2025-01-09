import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TafseerVersePage() {
    const { surahId, ayahId } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tafseer for Surah {surahId}, Verse {ayahId}</Text>
            <Text style={styles.comingSoon}>(Coming Soon)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
    comingSoon: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    }
});
