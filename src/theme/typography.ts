import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GUIDELINE_BASE_WIDTH = 375;

export const scale = (size: number): number => {
  const scaledSize = (SCREEN_WIDTH / GUIDELINE_BASE_WIDTH) * size;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

export const verticalScale = (size: number): number => {
  const GUIDELINE_BASE_HEIGHT = 812;
  const scaledSize = (SCREEN_HEIGHT / GUIDELINE_BASE_HEIGHT) * size;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

export const TYPOGRAPHY = {

  sizes: {
    xs: scale(10),
    sm: scale(12),
    base: scale(14),
    md: scale(16),
    lg: scale(18),
    xl: scale(20),
    xxl: scale(24),
    xxxl: scale(32),
  },

  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
  },

  fonts: {
    primary: 'System',
    primaryItalic: 'System',
  },
};

export const SCREEN_DIMENSIONS = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_WIDTH < 360,
  isTablet: SCREEN_WIDTH >= 600,
};
