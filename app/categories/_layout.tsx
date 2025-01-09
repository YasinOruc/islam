import { Stack } from 'expo-router';

export default function CategoriesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#22a6b3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Categories',
        }}
      />
      <Stack.Screen
        name="[categoryID]/index"
        options={{
          title: 'Duas',
        }}
      />
      <Stack.Screen
        name="[categoryID]/[duaID]"
        options={{
          title: 'Dua Details',
        }}
      />
    </Stack>
  );
}
