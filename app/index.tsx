import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Animated } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/duas';
import { getLastReadDua, getDailyDua } from '../data/storage';
import { DuaCard, TimeBasedDuas, SearchBar } from '../components';
import { searchDuas } from '../utils/search';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastReadDua, setLastReadDua] = useState(null);
  const [dailyDua, setDailyDua] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Load last read and daily dua
    // ...existing code...
  }, []);

  const searchResults = searchQuery ? searchDuas(searchQuery) : [];
  const featuredDuas = CATEGORIES.flatMap(cat => cat.duas).slice(0, 3);
  const totalDuas = CATEGORIES.reduce((acc, cat) => acc + cat.duas.length, 0);

  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.ScrollView 
      style={styles.container}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
      <Animated.View style={[
        styles.welcomeSection,
        { transform: [{ scale: headerScale }] }
      ]}>
        <Text style={styles.title}>Welcome to Dua App</Text>
        <Text style={styles.subtitle}>Your daily companion for prayers and remembrance</Text>
      </Animated.View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search duas..."
      />

      {searchQuery ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          {searchResults.map(dua => (
            <DuaCard key={dua.id} dua={dua} />
          ))}
          {searchResults.length === 0 && (
            <Text style={styles.noResults}>No duas found</Text>
          )}
        </View>
      ) : (
        <>
          <TimeBasedDuas />

          {lastReadDua && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Continue Reading</Text>
              <DuaCard dua={lastReadDua} />
            </View>
          )}

          {dailyDua && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Daily Dua</Text>
              <DuaCard dua={dailyDua} />
            </View>
          )}

          <View style={styles.quickActions}>
            <Link href="/categories" asChild>
              <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="category" size={24} color="#fff" />
                <Text style={styles.actionText}>Categories</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.categoriesGrid}>
            {CATEGORIES.slice(0, 4).map(category => (
              <Link 
                key={category.id}
                href={`/categories/${category.id}`}
                asChild
              >
                <TouchableOpacity style={styles.categoryCard}>
                  <MaterialIcons name={category.icon} size={24} color="#22a6b3" />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </>
      )}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  } as ViewStyle,
  welcomeSection: {
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  } as ViewStyle,
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  } as TextStyle,
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  } as TextStyle,
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  } as ViewStyle,
  actionButton: {
    backgroundColor: '#22a6b3',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
  } as ViewStyle,
  actionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  } as TextStyle,
  section: {
    padding: 16,
    marginBottom: 16,
  } as ViewStyle,
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  } as TextStyle,
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  } as ViewStyle,
  categoryCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 8,
    textAlign: 'center',
  } as TextStyle,
  noResults: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});
