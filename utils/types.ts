// Core interfaces and types for the prayer times application
export enum PrayerName {
  Fajr = "Fajr",
  Dhuhr = "Dhuhr",
  Asr = "Asr",
  Maghrib = "Maghrib",
  Isha = "Isha",
}

export interface PrayerTimes {
  [PrayerName.Fajr]: string;
  [PrayerName.Dhuhr]: string;
  [PrayerName.Asr]: string;
  [PrayerName.Maghrib]: string;
  [PrayerName.Isha]: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

// Configuration types
export const CALCULATION_METHODS = ["1", "2", "3", "4", "5"] as const;
export type CalculationMethod = (typeof CALCULATION_METHODS)[number];

export const MADHABS = ["shafi", "hanafi", "maliki", "hanbali"] as const;
export type Madhab = (typeof MADHABS)[number];

export const LANGUAGES = ["en", "ar"] as const;
export type Language = (typeof LANGUAGES)[number];

export const THEMES = ["light", "dark", "auto"] as const;
export type Theme = (typeof THEMES)[number];

export interface Settings {
  calculationMethod: CalculationMethod;
  madhab: Madhab;
  language: Language;
  theme: Theme;
  notifications: {
    prayerTimes: boolean;
    dailyTip: boolean;
    quranReminder: boolean;
  };
}

// Add validation helpers
export const isValidPrayerTime = (time: string): boolean => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

export const isValidLocation = (location: Location): boolean => {
  return (
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
};

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  "Prayer Times": undefined;
  Settings: undefined;
  Quran: undefined;
  Hadith: undefined;
  Duas: undefined;
};
