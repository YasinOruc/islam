import { useState } from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { CATEGORIES, Category } from '../../data/duas';
import { SearchBar } from '../../components/SearchBar';
import { searchCategories } from '../../utils/search';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCategories = searchQuery ? searchCategories(searchQuery) : CATEGORIES;

  const renderItem = ({ item }: { item: Category }) => (
    <Link href={`/categories/${item.id}`} asChild>
      <TouchableOpacity 
        style={{ 
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 12,
          marginBottom: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name={item.icon} size={24} color="#22a6b3" />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f6fa' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 50 }}>
        Dua Categories
      </Text>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search categories..."
      />
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
