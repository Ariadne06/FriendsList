import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, StatusBar, Animated, FlatList } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { friendsData } from '@/assets/data/friendsData';

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Find the correct friend based on ID
  const friend = friendsData.find((person) => person.id === Number(id));

  // Animation for fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!friend) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Curved Header */}
      <View style={styles.header}>
        <Pressable style={styles.menuButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Profile Section */}
      <Animated.View style={[styles.profileCard, { opacity: fadeAnim }]}>
        <Image source={friend.image} style={styles.avatar} />
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.details}>{friend.details}</Text>
        <Text style={styles.location}>
          <Ionicons name="location" size={14} color={COLORS.primary} /> {friend.address}
        </Text>

        {/* Personal Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Personal Details</Text>
          <Text style={styles.infoText}><Text style={styles.label}>ID:</Text> {friend.id}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Age:</Text> {friend.age}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Birthday:</Text> {friend.birthday}</Text>
          <Text style={styles.infoText}><Text style={styles.label}>Motto:</Text> "{friend.motto}"</Text>
        </View>

        {/* Hobbies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Hobbies</Text>
          <View style={styles.hobbiesContainer}>
            {friend.hobbies.map((hobby, index) => (
              <Text key={index} style={styles.hobby}>{hobby}</Text>
            ))}
          </View>
        </View>

        {/* Dynamic Gallery Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Gallery</Text>
          {friend.gallery && friend.gallery.length > 0 ? (
            <FlatList
              data={friend.gallery}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={styles.galleryRow}
              renderItem={({ item }) => (
                <Image 
                  source={typeof item === "string" ? { uri: item } : item} // ✅ Fix image source
                  style={styles.galleryImage} 
                />
              )}
            />
          ) : (
            <Text style={styles.noGalleryText}>No images available</Text>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

// Define a modern color scheme
const COLORS = {
  background: '#F2F2F7',
  primary: '#0E5951', // Deep teal color
  cardBackground: '#FFFFFF',
  textDark: '#1C1C1E',
  textLight: '#636366',
  hobbyBackground: '#E0E0E0',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: 'absolute',
    top: 0,
  },
  menuButton: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30,
    left: 20,
    zIndex: 10,
  },
  profileCard: {
    width: '90%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 120,
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
    marginTop: -60, // Pull the avatar up
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: 10,
  },
  details: {
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.textLight,
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  section: {
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingVertical: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
    textAlign: 'left',
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 4,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  hobby: {
    backgroundColor: COLORS.hobbyBackground,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  galleryRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  galleryImage: {
    width: '48%', // Ensures 2 images per row
    height: 110, // Compact size
    borderRadius: 5,
    marginBottom: 10,
  },
  noGalleryText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 50,
  },
});
