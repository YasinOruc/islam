import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIES } from './duas';

const STORAGE_KEYS = {
  LAST_READ_DUA: 'lastReadDua',
  DAILY_DUA: 'dailyDua',
  ARABIC_TEXT_SIZE: 'arabicTextSize',
  ONBOARDING_COMPLETE: 'onboardingComplete',
};

export async function setLastReadDua(duaId: string) {
  await AsyncStorage.setItem(STORAGE_KEYS.LAST_READ_DUA, duaId);
}

export async function getLastReadDua(): Promise<string | null> {
  return AsyncStorage.getItem(STORAGE_KEYS.LAST_READ_DUA);
}

function generateRandomDuaId(): string {
  const allDuas = CATEGORIES.flatMap(cat => cat.duas);
  const randomIndex = Math.floor(Math.random() * allDuas.length);
  return allDuas[randomIndex].id;
}

export async function getDailyDua(): Promise<string> {
  const today = new Date().toDateString();
  const storedDate = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_DUA);
  
  if (storedDate !== today) {
    const randomDuaId = generateRandomDuaId();
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_DUA, today);
    return randomDuaId;
  }
  
  return storedDate;
}
