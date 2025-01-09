import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { fetchPrayerTimes } from '../../utils/api';
import { PrayerTimes, Location } from '../../utils/types';
import { useApp } from '../../contexts/AppContext';

const PrayerTimesPage: React.FC = () => {
    const { settings, isLoading, error, clearError } = useApp();
    const [location, setLocation] = useState<Location | null>(null);
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [nextPrayer, setNextPrayer] = useState<string | null>(null);

    // Fetch prayer times when location or calculation method changes
    useEffect(() => {
        if (location) {
            fetchPrayerTimes(location, settings.calculationMethod)
                .then(setPrayerTimes)
                .catch(console.error);
        }
    }, [location, settings.calculationMethod]);

    // Calculate next prayer time
    useEffect(() => {
        if (prayerTimes) {
            const now = new Date();
            const times = Object.entries(prayerTimes).map(([name, time]) => ({
                name,
                time: new Date(`${now.toDateString()} ${time}`)
            }));
            const next = times.find(t => t.time > now);
            setNextPrayer(next?.name ?? null);
        }
    }, [prayerTimes]);

    if (isLoading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error.message}</Text>
                <Button title="Retry" onPress={() => clearError()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.main}>
                <Text style={styles.heading}>Location Selection</Text>
                <Text style={styles.heading}>Prayer Times</Text>
                {prayerTimes && (
                    <FlatList
                        data={Object.entries(prayerTimes)}
                        keyExtractor={([name]) => name}
                        renderItem={({ item: [name, time] }) => (
                            <Text style={styles.prayerTime}>
                                {name}: {time} {nextPrayer === name && (
                                    <Text style={styles.nextPrayer}>(Next)</Text>
                                )}
                            </Text>
                        )}
                    />
                )}
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        padding: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    prayerTime: {
        fontSize: 16,
        marginBottom: 4,
    },
    nextPrayer: {
        fontWeight: 'bold',
        color: 'red',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    errorText: {
        color: 'red',
        marginBottom: 16
    }
});

export default PrayerTimesPage;
