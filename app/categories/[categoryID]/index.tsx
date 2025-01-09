import { Text, FlatList, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CATEGORIES, Dua } from '../../../data/duas';
import { useMemo } from 'react';

export default function DuaListPage() {
  const router = useRouter();
  const { categoryID } = useLocalSearchParams<{ categoryID: string }>();
  
  const { category, isLoading } = useMemo(() => {
    const category = CATEGORIES.find(cat => cat.id === categoryID);
    return { category, isLoading: false };
  }, [categoryID]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#22a6b3" />
      </View>
    );
  }

  if (!category) {
    return (
      <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, textAlign: 'center', color: '#666' }}>
          Category not found
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Dua }) => (
    <TouchableOpacity 
      style={{ 
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      onPress={() => router.push(`/categories/${categoryID}/${item.id}`)}
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: 18, color: '#2c3e50' }}>{item.title}</Text>
      <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }} numberOfLines={2}>
        {item.translation}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f6fa' }}>
      <FlatList
        data={category.duas}
        keyExtractor={(dua) => dua.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}
