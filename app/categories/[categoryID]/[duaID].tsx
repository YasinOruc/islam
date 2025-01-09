import { Text, ScrollView, View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { CATEGORIES } from '../../../data/duas';
import { useMemo } from 'react';

export default function DuaDetailPage() {
  const { categoryID, duaID } = useLocalSearchParams<{ categoryID: string; duaID: string }>();
  
  const { dua, isLoading } = useMemo(() => {
    const category = CATEGORIES.find(cat => cat.id === categoryID);
    const dua = category?.duas.find(d => d.id === duaID);
    return { dua, isLoading: false };
  }, [categoryID, duaID]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#22a6b3" />
      </View>
    );
  }

  if (!dua) {
    return (
      <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, textAlign: 'center', color: '#666' }}>
          Dua not found
        </Text>
      </View>
    );
  }

  const Section = ({ title, content }: { title: string; content: string }) => (
    <View style={{ 
      marginBottom: 20, 
      backgroundColor: '#fff', 
      padding: 15, 
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#22a6b3', marginBottom: 8 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 16, lineHeight: 24 }}>{content}</Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f6fa' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          textAlign: 'center', 
          marginBottom: 20,
          color: '#2c3e50'
        }}>
          {dua.title}
        </Text>
        
        <Section title="Arabic" content={dua.arabic} />
        <Section title="Transliteration" content={dua.transliteration} />
        <Section title="Translation" content={dua.translation} />
        
        {dua.benefits && (
          <Section title="Benefits" content={dua.benefits} />
        )}
        
        <Section title="Source" content={dua.source} />
      </View>
    </ScrollView>
  );
}
