import { View, Text, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/duas';

export function TimeBasedDuas() {
  const morningEveningCategory = CATEGORIES.find(cat => cat.id === '1');
  const currentTime = new Date().getHours();
  const isEvening = currentTime >= 17 || currentTime < 5;

  const relevantDua = morningEveningCategory?.duas.find(dua => 
    isEvening ? dua.title.toLowerCase().includes('evening') : dua.title.toLowerCase().includes('morning')
  );

  if (!relevantDua) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.timeLabel}>
        {isEvening ? 'Evening Dua' : 'Morning Dua'}
      </Text>
      <Text style={styles.arabic}>{relevantDua.arabic}</Text>
      <Text style={styles.translation}>{relevantDua.translation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22a6b3',
    marginBottom: 8,
  },
  arabic: {
    fontSize: 20,
    textAlign: 'right',
    marginVertical: 8,
    lineHeight: 36,
  },
  translation: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});
