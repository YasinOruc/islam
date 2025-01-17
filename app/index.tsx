import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchPrayerTimes } from "../utils/api";
import { PrayerTimes, Location, RootStackParamList } from "../utils/types";
import { useApp } from "../contexts/AppContext";

type PrayerTimeItem = [string, string];

const HomePage: React.FC = () => {
  const { settings, prayerTimes, location, isLoading } = useApp();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [dailyTip, setDailyTip] = useState<string>(""); // Placeholder for daily tip

  useEffect(() => {
    if (prayerTimes) {
      const now = new Date();
      const times = Object.entries(prayerTimes).map(([name, time]) => ({
        name,
        time: new Date(`${now.toDateString()} ${time}`),
      }));
      const next = times.find((t) => t.time > now);
      setNextPrayer(next ? next.name : null);
    }
  }, [prayerTimes]);

  const getNextPrayerTime = (): string => {
    if (!prayerTimes || !nextPrayer || !(nextPrayer in prayerTimes)) {
      return "";
    }
    return prayerTimes[nextPrayer as keyof PrayerTimes];
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: settings.theme === "dark" ? "#000" : "#fff" },
      ]}
    >
      <Header />
      <View style={styles.main}>
        <Text
          style={[
            styles.heading,
            { color: settings.theme === "dark" ? "#fff" : "#000" },
          ]}
        >
          Dashboard Overzicht
        </Text>
        <Text style={styles.subheading}>Eerstvolgende Gebedstijd</Text>
        {nextPrayer && (
          <Text style={styles.nextPrayer}>
            {nextPrayer}: {getNextPrayerTime()}
          </Text>
        )}
        <Text style={styles.subheading}>Dagelijkse Tip</Text>
        <Text style={styles.dailyTip}>{dailyTip}</Text>
        <View style={styles.quickAccess}>
          <Button
            title="Gebedstijden"
            onPress={() => navigation.navigate("Prayer Times")}
          />
          <Button title="Quran" onPress={() => navigation.navigate("Quran")} />
          <Button
            title="Hadith"
            onPress={() => navigation.navigate("Hadith")}
          />
          <Button title="Dua's" onPress={() => navigation.navigate("Duas")} />
          <Button
            title="Instellingen"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  nextPrayer: {
    fontSize: 16,
    marginBottom: 16,
  },
  dailyTip: {
    fontSize: 16,
    marginBottom: 16,
  },
  quickAccess: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export default HomePage;
