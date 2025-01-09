import { View, TextInput, StyleSheet, Animated, Keyboard, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { COLORS, SHADOWS, SPACING } from '../constants/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [{
          scale: animatedWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.02],
          }),
        }],
      },
    ]}>
      <MaterialIcons 
        name="search" 
        size={24} 
        color={isFocused ? COLORS.primary : COLORS.textSecondary} 
      />
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search...'}
        placeholderTextColor="#999"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
        onSubmitEditing={Keyboard.dismiss}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')}>
          <MaterialIcons name="close" size={20} color={COLORS.textSecondary} />
        </Pressable>
      )}
      <Animated.View
        style={[
          styles.focusLine,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    margin: SPACING.md,
    ...SHADOWS.small,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  inputFocused: {
    color: '#22a6b3',
  },
  focusLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#22a6b3',
  },
});
