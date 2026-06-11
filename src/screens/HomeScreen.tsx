import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, scale } from '../theme/typography';
import { Card } from '../components/Card';
import { FilterBadge } from '../components/FilterBadge';
import { UNIVERSITIES, University } from '../data/universities';

interface HomeScreenProps {
  onSelectUniversity: (university: University) => void;
}

const COUNTRIES = [
  { key: 'All', label: '🌎 All' },
  { key: 'Canada', label: '🇨🇦 Canada' },
  { key: 'United Kingdom', label: '🇬🇧 UK' },
  { key: 'India', label: '🇮🇳 India' },
  { key: 'United Arab Emirates', label: '🇦🇪 UAE' }
];

const ACTIVE_APPLICATIONS = [
  {
    id: 'app_01',
    university: 'Cardiff University ISC',
    course: 'MSc International Relations',
    progress: 0.75,
    status: 'Doc Verification',
    color: '#3B82F6',
    flag: '🇬🇧',
  },
  {
    id: 'app_02',
    university: 'Aston University',
    course: 'BSc Computer Science',
    progress: 0.40,
    status: 'LOD Pending',
    color: '#F59E0B',
    flag: '🇬🇧',
  },
  {
    id: 'app_03',
    university: 'BITS Pilani',
    course: 'B.E. Computer Science',
    progress: 0.95,
    status: 'Visa Prep',
    color: '#10B981',
    flag: '🇮🇳',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectUniversity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const { colors, theme } = useTheme();
  const styles = getStyles(colors, theme);

  const heroFadeAnim = useRef(new Animated.Value(0)).current;
  const heroTranslateAnim = useRef(new Animated.Value(-15)).current;

  const statsScaleAnim = useRef(new Animated.Value(0.9)).current;
  const statsOpacityAnim = useRef(new Animated.Value(0)).current;

  const searchOpacityAnim = useRef(new Animated.Value(0)).current;
  const searchTranslateAnim = useRef(new Animated.Value(10)).current;

  const filterOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [

      Animated.parallel([
        Animated.timing(heroFadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(heroTranslateAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.spring(statsScaleAnim, {
          toValue: 1,
          tension: 45,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(statsOpacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(searchOpacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(searchTranslateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(filterOpacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter((uni) => {
      const matchesCountry =
        selectedCountry === 'All' || uni.country.toLowerCase() === selectedCountry.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        uni.name.toLowerCase().includes(query) ||
        uni.country.toLowerCase().includes(query) ||
        uni.city.toLowerCase().includes(query) ||
        uni.popularCourse.toLowerCase().includes(query) ||
        uni.programs.some((prog) => prog.name.toLowerCase().includes(query));

      return matchesCountry && matchesSearch;
    });
  }, [searchQuery, selectedCountry]);

  const renderHeaderComponent = () => (
    <View style={styles.headerSection}>
      {}
      <Animated.View
        style={[
          styles.heroCard,
          { opacity: heroFadeAnim, transform: [{ translateY: heroTranslateAnim }] }
        ]}
      >
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroSubText}>STUDY ABROAD MASTERY</Text>
          <Text style={styles.heroCardTitle}>Explore Pathways To Global Success</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.heroIllustrationContainer}>
          <Text style={styles.heroStudentEmoji}>🧑‍🎓</Text>
        </View>
      </Animated.View>

      {}
      <Animated.View
        style={[
          styles.statsRow,
          {
            opacity: statsOpacityAnim,
            transform: [{ scale: statsScaleAnim }]
          }
        ]}
      >
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>350+</Text>
          <Text style={styles.statLabel}>Universities</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>156+</Text>
          <Text style={styles.statLabel}>Programs</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>94%</Text>
          <Text style={styles.statLabel}>Visa Rate</Text>
        </View>
      </Animated.View>

      {}
      <Animated.View
        style={[
          styles.searchRowContainer,
          {
            opacity: searchOpacityAnim,
            transform: [{ translateY: searchTranslateAnim }]
          }
        ]}
      >
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search programs or locations..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Text onPress={() => setSearchQuery('')} style={styles.clearIcon}>
              ✕
            </Text>
          )}
        </View>

        {}
        <TouchableOpacity activeOpacity={0.8} style={styles.filterButton}>
          <Text style={styles.filterButtonIcon}>🎛️</Text>
        </TouchableOpacity>
      </Animated.View>

      {}
      <Animated.View style={[styles.filterSection, { opacity: filterOpacityAnim }]}>
        <Text style={styles.sectionHeadingTitle}>Explore Destinations</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {COUNTRIES.map((country) => (
            <FilterBadge
              key={country.key}
              label={country.label}
              isActive={selectedCountry === country.key}
              onPress={() => setSelectedCountry(country.key)}
            />
          ))}
        </ScrollView>
      </Animated.View>

      {}
      <View style={styles.activePathwaysSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeadingTitle}>Active Pathways</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>3 In Progress</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.applicationsScroll}
        >
          {ACTIVE_APPLICATIONS.map((app) => (
            <View key={app.id} style={styles.applicationCard}>
              <View style={styles.appHeaderRow}>
                <Text style={styles.appFlag}>{app.flag}</Text>
                <View style={[styles.statusTag, { backgroundColor: app.color + '15' }]}>
                  <Text style={[styles.statusTagText, { color: app.color }]}>{app.status}</Text>
                </View>
              </View>

              <Text numberOfLines={1} style={styles.appUniName}>
                {app.university}
              </Text>
              <Text numberOfLines={1} style={styles.appCourseName}>
                {app.course}
              </Text>

              {}
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${app.progress * 100}%`, backgroundColor: app.color }
                    ]}
                  />
                </View>
                <Text style={styles.progressPctText}>{Math.round(app.progress * 100)}%</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.listTitleHeading}>
        Popular Programs ({filteredUniversities.length})
      </Text>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎓</Text>
      <Text style={styles.emptyTitle}>No Programs Found</Text>
      <Text style={styles.emptySub}>
        We couldn't find any universities matching your search query. Try broadening your keywords or resetting filters.
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <FlatList
        data={filteredUniversities}
        renderItem={({ item }) => (
          <Card university={item} onPress={() => onSelectUniversity(item)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderHeaderComponent}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

const getStyles = (colors: any, theme: string) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(32),
  },
  headerSection: {
    paddingTop: scale(16),
    paddingBottom: scale(8),
  },
  heroCard: {
    backgroundColor: '#4F46E5', // Premium brand Indigo-purple background
    borderRadius: scale(22),
    padding: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(18),
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  heroTextContainer: {
    flex: 1.3,
    justifyContent: 'center',
  },
  heroSubText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: scale(9),
    fontWeight: TYPOGRAPHY.weights.black,
    letterSpacing: 1.2,
    marginBottom: scale(4),
  },
  heroCardTitle: {
    color: '#FFFFFF',
    fontSize: scale(18),
    fontWeight: TYPOGRAPHY.weights.black,
    lineHeight: scale(23),
    marginBottom: scale(12),
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(10),
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#4F46E5',
    fontSize: scale(11),
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  heroIllustrationContainer: {
    flex: 0.7,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroStudentEmoji: {
    fontSize: scale(60),
    marginRight: scale(4),
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: scale(18),
    paddingVertical: scale(12),
    paddingHorizontal: scale(8),
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: scale(18),
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: theme === 'light' ? 0.04 : 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: colors.textHighlight,
    fontSize: scale(15),
    fontWeight: TYPOGRAPHY.weights.black,
    marginBottom: scale(1),
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: scale(9),
    fontWeight: TYPOGRAPHY.weights.semibold,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: colors.border,
  },
  searchRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(18),
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scale(14),
    paddingHorizontal: scale(12),
    height: scale(46),
    marginRight: scale(10),
  },
  searchIcon: {
    fontSize: scale(16),
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: scale(13),
    height: '100%',
    padding: 0,
  },
  clearIcon: {
    color: colors.textSecondary,
    fontSize: scale(14),
    padding: scale(6),
  },
  filterButton: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(14),
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme === 'light' ? 0.03 : 0.15,
    shadowRadius: 5,
    elevation: 2,
  },
  filterButtonIcon: {
    fontSize: scale(18),
  },
  filterSection: {
    marginBottom: scale(20),
  },
  sectionHeadingTitle: {
    color: colors.textPrimary,
    fontSize: scale(15),
    fontWeight: TYPOGRAPHY.weights.black,
    marginBottom: scale(10),
  },
  filterScroll: {
    paddingRight: scale(16),
  },
  activePathwaysSection: {
    marginBottom: scale(22),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  activeBadge: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
  },
  activeBadgeText: {
    color: colors.secondary,
    fontSize: scale(9),
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  applicationsScroll: {
    paddingRight: scale(16),
  },
  applicationCard: {
    width: scale(190),
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: scale(16),
    padding: scale(12),
    marginRight: scale(10),
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: theme === 'light' ? 0.04 : 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  appHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  appFlag: {
    fontSize: scale(20),
  },
  statusTag: {
    borderRadius: scale(6),
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
  },
  statusTagText: {
    fontSize: scale(8),
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  appUniName: {
    color: colors.textPrimary,
    fontSize: scale(12),
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: scale(1),
  },
  appCourseName: {
    color: colors.textSecondary,
    fontSize: scale(10),
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: scale(10),
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarBg: {
    flex: 1,
    height: scale(5),
    backgroundColor: colors.border,
    borderRadius: scale(3),
    marginRight: scale(8),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: scale(3),
  },
  progressPctText: {
    color: colors.textPrimary,
    fontSize: scale(9),
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  listTitleHeading: {
    color: colors.textPrimary,
    fontSize: scale(15),
    fontWeight: TYPOGRAPHY.weights.black,
    marginBottom: scale(12),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(40),
  },
  emptyIcon: {
    fontSize: scale(48),
    marginBottom: scale(16),
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: scale(8),
  },
  emptySub: {
    color: colors.textSecondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    textAlign: 'center',
    lineHeight: scale(18),
    paddingHorizontal: scale(24),
  },
});
