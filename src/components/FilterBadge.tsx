import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, scale } from '../theme/typography';

interface FilterBadgeProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const FilterBadge: React.FC<FilterBadgeProps> = ({ label, isActive, onPress }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        isActive ? styles.activeContainer : styles.inactiveContainer,
      ]}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.activeText : styles.inactiveText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    marginRight: scale(8),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContainer: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  inactiveContainer: {
    backgroundColor: colors.cardBg,
    borderColor: colors.border,
  },
  text: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: colors.textSecondary,
  },
});
