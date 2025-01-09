import { MaterialIcons } from '@expo/vector-icons';

// Get the icon names type from MaterialIcons
type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export type Dua = {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
  category_id: string;
  benefits?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: MaterialIconName; // Now using the correct type
  description: string;
  duas: Dua[];
};

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Morning & Evening',
    icon: 'wb-sunny', // This is a valid Material Icons name
    description: "Duas for starting and ending your day",
    duas: [
      {
        id: '101',
        title: 'Morning Remembrance',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيْكَ لَهُ',
        transliteration: "Asbahna wa asbahal-mulku lillah walhamdu lillah la ilaha illal-lah wahdahu la sharika lah",
        translation: "We have reached the morning and kingship belongs to Allah, praise is to Allah. None has the right to be worshipped except Allah, alone, without partner",
        source: "Abu Dawud 4:317",
        category_id: '1',
        benefits: "Recommended to say this dua three times in the morning"
      },
      // ...more morning & evening duas...
    ]
  },
  {
    id: '2',
    name: 'Protection',
    icon: 'security', // Changed from 'shield' to 'security' which is a valid name
    description: "Duas for seeking Allah's protection",
    duas: [
      {
        id: '201',
        title: 'Protection from Evil',
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: "A'udhu bikalimatil-lahit-tammati min sharri ma khalaq",
        translation: "I seek refuge in Allah's perfect words from the evil of what He has created",
        source: "Muslim 4:2080",
        category_id: '2',
        benefits: "Protection from harm and evil"
      },
      // ...more protection duas...
    ]
  },
  {
    id: '3',
    name: 'Daily Activities',
    icon: 'access-time', // Changed from 'schedule' to 'access-time'
    description: "Duas for daily activities like eating, sleeping, etc.",
    duas: [
      // ...daily activities duas...
    ]
  },
  // Add more categories as needed
];
