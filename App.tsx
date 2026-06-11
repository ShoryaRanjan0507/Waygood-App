

import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, View, BackHandler, Animated, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { scale } from './src/theme/typography';
import { Header } from './src/components/Header';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { University } from './src/data/universities';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function AppContent() {
  const [currentTab, setCurrentTab] = useState<'home' | 'search' | 'applications' | 'chat' | 'profile'>('home');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const { theme, colors } = useTheme();
  const styles = getStyles(colors, theme);

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    const onBackPress = () => {
      if (selectedUniversity) {
        navigateToHome();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [selectedUniversity]);

  const navigateToDetails = (uni: University) => {
    setSelectedUniversity(uni);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 380,
      useNativeDriver: true,
    }).start();
  };

  const navigateToHome = () => {

    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 340,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setSelectedUniversity(null);
      }
    });
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen onSelectUniversity={navigateToDetails} />;
      case 'search':
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderEmoji}>🔍</Text>
            <Text style={styles.placeholderTitle}>Search Portals</Text>
            <Text style={styles.placeholderDesc}>Advanced search options, filtering sliders, and map visualizations are coming soon to this tab!</Text>
          </View>
        );
      case 'applications':
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderEmoji}>🎓</Text>
            <Text style={styles.placeholderTitle}>Active Applications</Text>
            <Text style={styles.placeholderDesc}>Track details for Cardiff, Aston, BITS Pilani, and other university application forms in progress here.</Text>
          </View>
        );
      case 'chat':
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderEmoji}>💬</Text>
            <Text style={styles.placeholderTitle}>Consultant Chat</Text>
            <Text style={styles.placeholderDesc}>Connect with our expert counselors in real time. Submit an application form to start your chat channel!</Text>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderEmoji}>👤</Text>
            <Text style={styles.placeholderTitle}>My Student Ledger</Text>
            <Text style={styles.placeholderDesc}>Upload IELTS score sheets, CGPA records, letters of recommendation, and passport details here.</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaProvider style={[styles.safeProvider, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
        translucent={false}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {}
        <Header
          title={selectedUniversity ? selectedUniversity.name : 'Waygood'}
          showBack={selectedUniversity !== null}
          onBack={navigateToHome}
        />

        {}
        <View style={styles.mainContent}>
          {renderTabContent()}
        </View>

        {}
        <View style={styles.bottomTabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('home')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, currentTab === 'home' && styles.tabIconActive]}>🏠</Text>
            <Text style={[styles.tabLabel, currentTab === 'home' && styles.tabLabelActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('search')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, currentTab === 'search' && styles.tabIconActive]}>🔍</Text>
            <Text style={[styles.tabLabel, currentTab === 'search' && styles.tabLabelActive]}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('applications')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, currentTab === 'applications' && styles.tabIconActive]}>🎓</Text>
            <Text style={[styles.tabLabel, currentTab === 'applications' && styles.tabLabelActive]}>Applications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('chat')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, currentTab === 'chat' && styles.tabIconActive]}>💬</Text>
            <Text style={[styles.tabLabel, currentTab === 'chat' && styles.tabLabelActive]}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setCurrentTab('profile')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, currentTab === 'profile' && styles.tabIconActive]}>👤</Text>
            <Text style={[styles.tabLabel, currentTab === 'profile' && styles.tabLabelActive]}>Profile</Text>
          </TouchableOpacity>
        </View>

        {}
        {selectedUniversity && (
          <Animated.View
            style={[
              styles.detailsOverlay,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <DetailsScreen university={selectedUniversity} />
          </Animated.View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const getStyles = (colors: any, theme: string) => StyleSheet.create({
  safeProvider: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  bottomTabBar: {
    flexDirection: 'row',
    height: scale(62),
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: Platform.OS === 'ios' ? scale(12) : 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: theme === 'light' ? 0.04 : 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(6),
    flex: 1,
  },
  tabIcon: {
    fontSize: scale(18),
    opacity: 0.6,
    marginBottom: scale(2),
    color: colors.textMuted,
  },
  tabIconActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
    color: colors.secondary,
  },
  tabLabel: {
    fontSize: scale(9),
    fontWeight: '500',
    color: colors.textMuted,
  },
  tabLabelActive: {
    fontWeight: '700',
    color: colors.secondary,
  },
  detailsOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: scale(56),
    bottom: 0,
    backgroundColor: colors.background,
    zIndex: 999,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(32),
  },
  placeholderEmoji: {
    fontSize: scale(48),
    marginBottom: scale(16),
  },
  placeholderTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: scale(8),
    textAlign: 'center',
  },
  placeholderDesc: {
    fontSize: scale(13),
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: scale(18),
  },
});

export default App;
