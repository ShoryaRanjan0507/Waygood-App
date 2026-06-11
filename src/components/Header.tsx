import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, scale } from '../theme/typography';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = false, onBack }) => {
  const { theme, colors, toggleTheme } = useTheme();
  const styles = getStyles(colors, theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {showBack ? (

          <>
            <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text numberOfLines={1} style={styles.titleText}>
              {title}
            </Text>
          </>
        ) : (

          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarEmoji}>👨🏻‍🎓</Text>
            </View>
            <View style={styles.welcomeTextGroup}>
              <Text style={styles.welcomeSubtitle}>Welcome!</Text>
              <Text style={styles.welcomeName}>User 🎓</Text>
            </View>
          </View>
        )}

        {}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleTheme}
          style={styles.themeToggle}
        >
          <Text style={styles.themeToggleText}>{theme === 'light' ? '🌙' : '☀️'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (colors: any, theme: string) => StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: Platform.OS === 'android' ? scale(12) : 0,
  },
  container: {
    height: scale(64),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: theme === 'light' ? 'rgba(79, 70, 229, 0.08)' : 'rgba(99, 102, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
    borderWidth: 1.5,
    borderColor: colors.secondary,
  },
  avatarEmoji: {
    fontSize: scale(20),
  },
  welcomeTextGroup: {
    justifyContent: 'center',
  },
  welcomeSubtitle: {
    color: colors.secondary,
    fontSize: scale(11),
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  welcomeName: {
    color: colors.textPrimary,
    fontSize: scale(14),
    fontWeight: TYPOGRAPHY.weights.black,
    marginTop: scale(1),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scale(12),
    height: '100%',
    width: scale(75),
  },
  backArrow: {
    color: colors.secondary,
    fontSize: scale(18),
    fontWeight: TYPOGRAPHY.weights.bold,
    marginRight: scale(4),
  },
  backText: {
    color: colors.textSecondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  titleText: {
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    textAlign: 'center',
  },
  themeToggle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: colors.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: theme === 'light' ? 0.05 : 0.25,
    shadowRadius: 5,
    elevation: theme === 'light' ? 2 : 4,
  },
  themeToggleText: {
    fontSize: scale(16),
  },
});
