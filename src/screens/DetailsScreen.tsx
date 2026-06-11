import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { TYPOGRAPHY, scale } from '../theme/typography';
import { Button } from '../components/Button';
import { University, Program } from '../data/universities';

interface DetailsScreenProps {
  university: University;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ university }) => {
  const { theme, colors } = useTheme();
  const styles = getStyles(colors, theme);
  const [gradientStart] = university.accentGradient;

  const [gpaPercent, setGpaPercent] = useState('80');
  const [ieltsBand, setIeltsBand] = useState('6.5');
  const [visaProbability, setVisaProbability] = useState<number | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<Program>(university.programs[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateVisaSuccess = () => {
    const gpa = parseFloat(gpaPercent);
    const ielts = parseFloat(ieltsBand);

    if (isNaN(gpa) || gpa < 0 || gpa > 100) {
      Alert.alert('Invalid Input', 'Please enter a valid GPA percentage (0-100)');
      return;
    }
    if (isNaN(ielts) || ielts < 0 || ielts > 9) {
      Alert.alert('Invalid Input', 'Please enter a valid IELTS band (0-9)');
      return;
    }

    setCalcLoading(true);
    setTimeout(() => {

      let prob = university.visaSuccessBase;

      const ieltsDiff = ielts - 6.5;
      prob += ieltsDiff * 5;

      const gpaDiff = gpa - 75;
      prob += gpaDiff * 0.2;

      const finalProb = Math.min(Math.max(Math.round(prob), 40), 99);

      setVisaProbability(finalProb);
      setCalcLoading(false);
    }, 800);
  };

  const handleApply = () => {
    if (!applicantName.trim() || !applicantEmail.trim() || !applicantPhone.trim()) {
      Alert.alert('Required Fields', 'Please fill in all details to apply.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1200);
  };

  const closeApplyModal = () => {
    setModalVisible(false);
    setShowSuccess(false);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {}
      <View style={[styles.heroBanner, { backgroundColor: gradientStart }]}>
        <View style={styles.badgeRow}>
          <View style={styles.countryBadge}>
            <Text style={styles.countryBadgeText}>{university.country}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.starText}>★</Text>
            <Text style={styles.ratingText}>{university.rating} / 5</Text>
          </View>
        </View>

        <Text style={styles.uniName}>{university.name}</Text>
        <Text style={styles.uniCity}>{university.city}</Text>
      </View>

      {}
      <View style={styles.contentContainer}>
        {}
        <View style={styles.quickStatsRow}>
          <View style={styles.quickStatCol}>
            <Text style={styles.quickStatLabel}>GLOBAL RANK</Text>
            <Text style={styles.quickStatVal}>{university.globalRanking.replace(' globally', '')}</Text>
          </View>
          <View style={styles.quickStatCol}>
            <Text style={styles.quickStatLabel}>ANNUAL FEES</Text>
            <Text numberOfLines={1} style={styles.quickStatVal}>
              {university.averageTuition.split(' /')[0]}
            </Text>
          </View>
          <View style={styles.quickStatCol}>
            <Text style={styles.quickStatLabel}>INTAKE</Text>
            <Text style={styles.quickStatVal}>{university.intake}</Text>
          </View>
        </View>

        {}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Entry Requirements</Text>
          <View style={styles.requirementsGrid}>
            <View style={styles.reqItem}>
              <Text style={styles.reqEmoji}>🗣️</Text>
              <View>
                <Text style={styles.reqLabel}>IELTS Requirement</Text>
                <Text style={styles.reqValue}>{university.ieltsScore} Minimum</Text>
              </View>
            </View>
            <View style={styles.reqItem}>
              <Text style={styles.reqEmoji}>📈</Text>
              <View>
                <Text style={styles.reqLabel}>GPA Cut-off</Text>
                <Text style={styles.reqValue}>{university.gpaRequirement}</Text>
              </View>
            </View>
          </View>
        </View>

        {}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About the University</Text>
          <Text style={styles.descriptionText}>{university.description}</Text>
        </View>

        {}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Academic Offerings</Text>
          {university.programs.map((prog, index) => (
            <View key={index} style={styles.programCard}>
              <View style={styles.progCardHeader}>
                <Text style={styles.progName}>{prog.name}</Text>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelBadgeText}>{prog.level}</Text>
                </View>
              </View>

              <View style={styles.progMetaRow}>
                <View style={styles.progMetaCol}>
                  <Text style={styles.progMetaLabel}>Duration</Text>
                  <Text style={styles.progMetaVal}>{prog.duration}</Text>
                </View>
                <View style={styles.progMetaCol}>
                  <Text style={styles.progMetaLabel}>Tuition Fee</Text>
                  <Text style={styles.progMetaVal}>{prog.tuitionFee}</Text>
                </View>
              </View>

              <Text style={styles.progDesc}>{prog.description}</Text>

              <Button
                label="Apply for this Program"
                onPress={() => {
                  setSelectedProgram(prog);
                  setModalVisible(true);
                }}
                style={styles.progApplyBtn}
                textStyle={{ fontSize: TYPOGRAPHY.sizes.sm }}
              />
            </View>
          ))}
        </View>

        {}
        <View style={[styles.sectionContainer, styles.calculatorContainer]}>
          <Text style={styles.calcHeaderTitle}>✈️ Waygood Visa Success Calculator</Text>
          <Text style={styles.calcSubtitle}>
            Determine your visa success chance instantly based on academics and test preparation.
          </Text>

          <View style={styles.inputLabelRow}>
            <Text style={styles.inputLabel}>Academic GPA / Percentage (%)</Text>
            <Text style={styles.inputValueHint}>{gpaPercent}%</Text>
          </View>
          <TextInput
            style={styles.calcInput}
            keyboardType="numeric"
            maxLength={3}
            placeholder="e.g. 80"
            placeholderTextColor={colors.textMuted}
            value={gpaPercent}
            onChangeText={setGpaPercent}
          />

          <View style={styles.inputLabelRow}>
            <Text style={styles.inputLabel}>IELTS Overall Band Score</Text>
            <Text style={styles.inputValueHint}>{ieltsBand}</Text>
          </View>
          <TextInput
            style={styles.calcInput}
            keyboardType="numeric"
            maxLength={3}
            placeholder="e.g. 6.5"
            placeholderTextColor={colors.textMuted}
            value={ieltsBand}
            onChangeText={setIeltsBand}
          />

          <Button
            label="Calculate Success Probability"
            loading={calcLoading}
            onPress={calculateVisaSuccess}
            style={styles.calcBtn}
          />

          {visaProbability !== null && (
            <View style={styles.calcResultBox}>
              <Text style={styles.calcResultTitle}>Visa Approval Chance</Text>
              <Text
                style={[
                  styles.calcResultScore,
                  { color: visaProbability > 85 ? colors.success : colors.warning },
                ]}
              >
                {visaProbability}%
              </Text>
              <Text style={styles.calcResultDesc}>
                {visaProbability > 85
                  ? 'Excellent profile! High chance of getting an direct visa. Build application now.'
                  : 'Fair profile. We recommend raising test scores or highlighting work experience.'}
              </Text>
            </View>
          )}
        </View>

        {}
        <Button
          label="Book Free Profile Consultation"
          variant="secondary"
          onPress={() => {
            setSelectedProgram(university.programs[0]);
            setModalVisible(true);
          }}
          style={styles.consultBtn}
        />
      </View>

      {}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeApplyModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            {!showSuccess ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Apply & Consultation Form</Text>
                  <TouchableOpacity onPress={closeApplyModal} style={styles.closeBtn}>
                    <Text style={styles.closeBtnText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalUniName}>{university.name}</Text>
                <Text style={styles.modalProgName}>Program: {selectedProgram.name}</Text>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Full Name *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.textMuted}
                    value={applicantName}
                    onChangeText={setApplicantName}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Email Address *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={applicantEmail}
                    onChangeText={setApplicantEmail}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Mobile Number *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. +91 9876543210"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="phone-pad"
                    value={applicantPhone}
                    onChangeText={setApplicantPhone}
                  />
                </View>

                <Button
                  label="Submit Application"
                  loading={isSubmitting}
                  onPress={handleApply}
                  style={styles.submitBtn}
                />
              </ScrollView>
            ) : (
              <View style={styles.successContainer}>
                <Text style={styles.successIcon}>🎉</Text>
                <Text style={styles.successTitle}>Application Submitted!</Text>
                <Text style={styles.successDesc}>
                  Thank you, {applicantName}. Your application for {selectedProgram.name} at {university.name} was saved.
                </Text>
                <Text style={styles.successNotice}>
                  Our senior admissions consultant from Waygood will review your file and call you at {applicantPhone} within 24 hours.
                </Text>
                <Button
                  label="Close"
                  onPress={closeApplyModal}
                  style={styles.successCloseBtn}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
};

const getStyles = (colors: any, theme: string) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroBanner: {
    paddingTop: scale(40),
    paddingBottom: scale(28),
    paddingHorizontal: scale(20),
    borderBottomLeftRadius: scale(28),
    borderBottomRightRadius: scale(28),
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  countryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    borderRadius: scale(8),
  },
  countryBadgeText: {
    color: '#FFFFFF',
    fontWeight: TYPOGRAPHY.weights.bold,
    fontSize: TYPOGRAPHY.sizes.xs,
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(8),
  },
  starText: {
    color: colors.warning,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginRight: scale(4),
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  uniName: {
    color: '#FFFFFF',
    fontSize: scale(24),
    fontWeight: TYPOGRAPHY.weights.black,
    lineHeight: scale(30),
    marginBottom: scale(8),
  },
  uniCity: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  contentContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(40),
  },
  quickStatsRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: scale(14),
    marginTop: scale(-16),
    marginBottom: scale(20),
    justifyContent: 'space-around',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: theme === 'light' ? 0.06 : 0.25,
    shadowRadius: 6,
    elevation: theme === 'light' ? 2 : 4,
  },
  quickStatCol: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatLabel: {
    color: colors.textMuted,
    fontSize: scale(9),
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: scale(4),
    letterSpacing: 0.5,
  },
  quickStatVal: {
    color: colors.textHighlight,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  sectionContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: scale(16),
    padding: scale(16),
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: scale(16),
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: scale(12),
  },
  requirementsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reqEmoji: {
    fontSize: scale(20),
    marginRight: scale(10),
  },
  reqLabel: {
    color: colors.textSecondary,
    fontSize: scale(10),
    fontWeight: TYPOGRAPHY.weights.regular,
  },
  reqValue: {
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  descriptionText: {
    color: colors.textSecondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    lineHeight: scale(20),
  },
  programCard: {
    backgroundColor: colors.background,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: colors.border,
    padding: scale(12),
    marginBottom: scale(12),
  },
  progCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(8),
  },
  progName: {
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: scale(8),
  },
  levelBadge: {
    backgroundColor: theme === 'light' ? 'rgba(14, 165, 233, 0.08)' : 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: scale(6),
  },
  levelBadgeText: {
    color: colors.textHighlight,
    fontSize: scale(9),
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  progMetaRow: {
    flexDirection: 'row',
    marginBottom: scale(8),
  },
  progMetaCol: {
    marginRight: scale(24),
  },
  progMetaLabel: {
    color: colors.textMuted,
    fontSize: scale(9),
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  progMetaVal: {
    color: colors.textHighlight,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  progDesc: {
    color: colors.textSecondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    lineHeight: scale(18),
    marginBottom: scale(12),
  },
  progApplyBtn: {
    height: scale(36),
    borderRadius: scale(8),
  },
  calculatorContainer: {
    backgroundColor: theme === 'light' ? 'rgba(226, 232, 240, 0.6)' : 'rgba(30, 41, 59, 0.8)',
    borderColor: colors.borderLight,
  },
  calcHeaderTitle: {
    color: colors.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: scale(4),
  },
  calcSubtitle: {
    color: colors.textSecondary,
    fontSize: TYPOGRAPHY.sizes.xs,
    lineHeight: scale(16),
    marginBottom: scale(16),
  },
  inputLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(6),
  },
  inputLabel: {
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  inputValueHint: {
    color: colors.textHighlight,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  calcInput: {
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: scale(8),
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.base,
    paddingHorizontal: scale(12),
    height: scale(40),
    marginBottom: scale(14),
  },
  calcBtn: {
    height: scale(40),
    borderRadius: scale(8),
    marginTop: scale(4),
  },
  calcResultBox: {
    marginTop: scale(16),
    backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.03)' : 'rgba(0, 0, 0, 0.25)',
    borderRadius: scale(10),
    padding: scale(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  calcResultTitle: {
    color: colors.textSecondary,
    fontSize: scale(10),
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: scale(4),
  },
  calcResultScore: {
    fontSize: scale(28),
    fontWeight: TYPOGRAPHY.weights.black,
    marginBottom: scale(4),
  },
  calcResultDesc: {
    color: colors.textSecondary,
    fontSize: scale(11),
    textAlign: 'center',
    lineHeight: scale(16),
  },
  consultBtn: {
    marginVertical: scale(8),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    padding: scale(20),
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  closeBtn: {
    padding: scale(6),
  },
  closeBtnText: {
    color: colors.textSecondary,
    fontSize: scale(16),
  },
  modalUniName: {
    color: colors.textHighlight,
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: scale(4),
  },
  modalProgName: {
    color: colors.textSecondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: scale(16),
  },
  formGroup: {
    marginBottom: scale(14),
  },
  formLabel: {
    color: colors.textSecondary,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: scale(6),
  },
  formInput: {
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: scale(8),
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.base,
    paddingHorizontal: scale(12),
    height: scale(42),
  },
  submitBtn: {
    marginTop: scale(10),
  },
  successContainer: {
    paddingVertical: scale(24),
    alignItems: 'center',
  },
  successIcon: {
    fontSize: scale(48),
    marginBottom: scale(12),
  },
  successTitle: {
    color: colors.success,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: scale(12),
  },
  successDesc: {
    color: colors.textPrimary,
    fontSize: TYPOGRAPHY.sizes.sm,
    textAlign: 'center',
    lineHeight: scale(20),
    marginBottom: scale(8),
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  successNotice: {
    color: colors.textSecondary,
    fontSize: TYPOGRAPHY.sizes.xs,
    textAlign: 'center',
    lineHeight: scale(18),
    marginBottom: scale(24),
    paddingHorizontal: scale(12),
  },
  successCloseBtn: {
    width: '100%',
  },
});
