import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, StatusBar, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { id, name, details, image } = useLocalSearchParams();
  const router = useRouter();

  // Animation for fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header Section with Back Button */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Image source={typeof image === "string" ? JSON.parse(image) : image} style={styles.headerImage} />
      </View>

      {/* Profile Card with Animated Entrance */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        {/* Profile Picture */}
        <Image source={typeof image === "string" ? JSON.parse(image) : image} style={styles.avatar} />

        {/* User Info */}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>User ID: {id}</Text>
        <Text style={styles.details}>{details}</Text>
      </Animated.View>
    </View>
  );
}

// Define a color scheme
const COLORS = {
  background: '#F2F2F7', // iOS-like light gray background
  primary: '#4A90E2', // Modern blue
  cardBackground: '#FFFFFF', // White card
  textDark: '#1C1C1E', // Dark text
  textLight: '#636366', // Lighter text
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3, // Slight transparency for the header effect
    position: 'absolute',
    top: 0,
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  card: {
    width: '85%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 150,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primary,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  id: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '600',
  },
  details: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
