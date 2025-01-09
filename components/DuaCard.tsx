import { View, Text, StyleSheet, Pressable, Animated, TextStyle, ViewStyle } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Dua } from '../data/duas';
import { COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

type DuaCardProps = {
  dua: Dua;
  onPress?: () => void;
};

export function DuaCard({ dua, onPress }: DuaCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bookmarkAnim = useRef(new Animated.Value(0)).current;

  const animatePress = Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      damping: 15,
      stiffness: 150,
      useNativeDriver: true,
    }),
  ]);

  const handlePress = () => {
    animatePress.start();
    onPress?.();
  };

  const animateBookmark = () => {
    setIsBookmarked(!isBookmarked);
    Animated.sequence([
      Animated.spring(bookmarkAnim, {
        toValue: 2,
        useNativeDriver: true,
        damping: 4,
      }),
      Animated.spring(bookmarkAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 4,
      }),
    ]).start();
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[
        styles.card,
        { transform: [{ scale: scaleAnim }] },
      ]}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{dua.title}</Text>
          <Animated.View style={{ transform: [{ scale: bookmarkAnim }] }}>
            <Pressable onPress={animateBookmark}>
              <MaterialIcons
                name={isBookmarked ? "bookmark" : "bookmark-border"}
                size={24}
                color={COLORS.primary}
              />
            </Pressable>
          </Animated.View>
        </View>

        <View style={styles.content}>
          <Text style={styles.arabic}>{dua.arabic}</Text>
          <Text style={styles.translation} numberOfLines={3}>{dua.translation}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.source}>{dua.source}</Text>
          <MaterialIcons name="arrow-forward" size={20} color={COLORS.primary} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 16,
    ...SHADOWS.medium,
    marginVertical: SPACING.sm,
    marginHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  } as ViewStyle,
  content: {
    paddingVertical: SPACING.md,
  } as ViewStyle,
  title: {
    ...TYPOGRAPHY.title2,
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.md,
  } as TextStyle,
  arabic: {
    fontFamily: 'arabic',
    fontSize: 24,
    textAlign: 'right',
    marginVertical: SPACING.md,
    lineHeight: 40,
    color: COLORS.text,
  } as TextStyle,
  translation: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  } as TextStyle,
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  } as ViewStyle,
  source: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  } as TextStyle,
});
