import { 
  Image, StyleSheet, Text, View, Pressable, FlatList, SafeAreaView, StatusBar, Alert
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { friendsData } from '@/assets/data/friendsData';

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = (item: { id: number; name: string; details: string; image: string }) => {
    Alert.alert(
      item.name, // Alert title (full name of the friend)
      `Proceed to ${item.name}'s profile page?`, // Alert body
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => router.push({ pathname: "/profile/[id]", params: { id: item.id.toString() } }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Curved Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends List</Text>
      </View>

      {/* List of Friends */}
      <FlatList
        data={friendsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => handlePress(item)}>
            <Image source={item.image} style={styles.avatar} />
            
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>{item.details}</Text>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// Define a modern color scheme
const COLORS = {
  background: '#F2F2F7',
  primary: '#0E5951', // Deep teal color (same as ProfileScreen)
  cardBackground: '#FFFFFF',
  textDark: '#1C1C1E',
  textLight: '#636366',
  shadow: '#00000015',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    top: 0,
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContainer: {
    paddingTop: 100, // Adjusted for the curved header
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: COLORS.primary,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  details: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 2,
  },
});
