import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, scale } from '../theme/typography';
import { University } from '../data/universities';

interface CardProps {
  university: University;
  onPress: () => void;
}

const getCountryFlag = (country: string) => {
  switch (country.toLowerCase()) {
    case 'united kingdom':
    case 'uk':
      return '🇬🇧';
    case 'canada':
      return '🇨🇦';
    case 'india':
      return '🇮🇳';
    case 'united arab emirates':
    case 'uae':
      return '🇦🇪';
    default:
      return '🌐';
  }
};

const getShortTuition = (uniId: string) => {
  switch (uniId) {
    case 'univ_01': return '£18k-23k';
    case 'univ_02': return '£16k-21.5k';
    case 'univ_03': return '₹4.5L-6L';
    case 'univ_04': return 'AED 38k-45k';
    case 'univ_05': return '$21k-28.5k';
    case 'univ_06': return 'AED 45k-60k';
    default: return 'Contact';
  }
};

const getRatingCount = (uniId: string) => {

  switch (uniId) {
    case 'univ_01': return 154;
    case 'univ_02': return 98;
    case 'univ_03': return 320;
    case 'univ_04': return 76;
    case 'univ_05': return 112;
    case 'univ_06': return 85;
    default: return 50;
  }
};

export const Card: React.FC<CardProps> = ({ university, onPress }) => {
  const { theme, colors } = useTheme();
  const styles = getStyles(colors, theme);
  const [gradientStart] = university.accentGradient;

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(25)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 25,
      bounciness: 5,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 25,
      bounciness: 5,
    }).start();
  };

  const flag = getCountryFlag(university.country);
  const shortTuition = getShortTuition(university.id);
  const ratingCount = getRatingCount(university.id);

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: opacityAnim,
            transform: [
              { translateY: translateYAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        {}
        <View style={[styles.thumbnailBox, { backgroundColor: gradientStart + '25' }]}>
          <Text style={styles.flagText}>{flag}</Text>
          <View style={styles.priceTag}>
            <Text style={styles.priceTagText}>{shortTuition}</Text>
          </View>
        </View>

        {}
        <View style={styles.detailsContainer}>
          {}
          <View style={styles.metaRow}>
            <Text numberOfLines={1} style={styles.countryLabel}>
              {university.country.toUpperCase()}
            </Text>
            <View style={styles.ratingGroup}>
              <Text style={styles.starText}>★</Text>
              <Text style={styles.ratingText}>{university.rating}</Text>
              <Text style={styles.ratingCountText}>({ratingCount})</Text>
            </View>
          </View>

          {}
          <Text numberOfLines={2} style={styles.universityName}>
            {university.name}
          </Text>

          {}
          <Text numberOfLines={1} style={styles.cityRankText}>
            {university.city} • <Text style={styles.rankHighlight}>{university.globalRanking.split(' ')[0]}</Text>
          </Text>

          {}
          <View style={styles.footerRow}>
            {}
            <View style={styles.avatarSocialContainer}>
              <View style={styles.avatarStack}>
                <View style={[styles.studentAvatar, { backgroundColor: '#C7D2FE', zIndex: 3 }]}>
                  <Text style={styles.avatarEmoji}>👩🏻</Text>
                </View>
                <View style={[styles.studentAvatar, { backgroundColor: '#FDE68A', zIndex: 2, marginLeft: scale(-8) }]}>
                  <Text style={styles.avatarEmoji}>👦🏼</Text>
                </View>
                <View style={[styles.studentAvatar, { backgroundColor: '#A7F3D0', zIndex: 1, marginLeft: scale(-8) }]}>
                  <Text style={styles.avatarEmoji}>👧🏽</Text>
                </View>
              </View>
              <Text style={styles.appliedCountText}>
                +{ratingCount * 2} applied
              </Text>
            </View>

            {}
            <View style={[styles.actionButton, { backgroundColor: gradientStart }]}>
              <Text style={styles.actionButtonText}>→</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const getStyles = (colors: any, theme: string) => StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: scale(20),
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: colors.border,
    padding: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: theme === 'light' ? 0.06 : 0.2,
    shadowRadius: 10,
    elevation: theme === 'light' ? 3 : 5,
  },
  thumbnailBox: {
    width: scale(90),
    height: scale(115),
    borderRadius: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  flagText: {
    fontSize: scale(38),
    marginBottom: scale(10),
  },
  priceTag: {
    position: 'absolute',
    bottom: scale(6),
    left: scale(6),
    right: scale(6),
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: scale(8),
    paddingVertical: scale(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceTagText: {
    color: '#FFFFFF',
    fontSize: scale(9),
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: scale(12),
    height: scale(115),
    justifyContent: 'space-between',
    paddingVertical: scale(2),
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryLabel: {
    color: colors.textSecondary,
    fontSize: scale(9),
    fontWeight: TYPOGRAPHY.weights.bold,
    letterSpacing: 0.8,
    flex: 1,
    marginRight: scale(6),
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    color: colors.warning,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginRight: scale(3),
  },
  ratingText: {
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  ratingCountText: {
    color: colors.textMuted,
    fontSize: scale(9),
    marginLeft: scale(2),
  },
  universityName: {
    color: colors.textPrimary,
    fontSize: scale(14),
    fontWeight: TYPOGRAPHY.weights.bold,
    lineHeight: scale(18),
  },
  cityRankText: {
    color: colors.textSecondary,
    fontSize: scale(11),
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  rankHighlight: {
    color: colors.textHighlight,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarSocialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentAvatar: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.cardBg,
  },
  avatarEmoji: {
    fontSize: scale(11),
  },
  appliedCountText: {
    color: colors.textSecondary,
    fontSize: scale(10),
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: scale(6),
  },
  actionButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: scale(14),
    fontWeight: TYPOGRAPHY.weights.black,
  },
});

