import { Dua, Category, CATEGORIES } from '../data/duas';

export function searchDuas(query: string): Dua[] {
  const searchTerm = query.toLowerCase().trim();
  return CATEGORIES.flatMap(cat => cat.duas.filter(dua => 
    dua.title.toLowerCase().includes(searchTerm) ||
    dua.translation.toLowerCase().includes(searchTerm) ||
    dua.transliteration.toLowerCase().includes(searchTerm)
  ));
}

export function searchCategories(query: string): Category[] {
  const searchTerm = query.toLowerCase().trim();
  return CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(searchTerm) ||
    category.description.toLowerCase().includes(searchTerm)
  );
}
