export const COLORS = {
  primary: '#009688',
  primaryDark: '#00796B',
  primaryLight: '#B2DFDB',
  secondary: '#FFC107',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  error: '#D32F2F',
  success: '#388E3C',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  section: 24,
};

export const TYPOGRAPHY = {
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
  },
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600' as const,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: 'normal' as const,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal' as const,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
};
