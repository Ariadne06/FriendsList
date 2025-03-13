import { useState } from 'react';
import { 
  Image, StyleSheet, Text, View, Pressable, FlatList, SafeAreaView, TextInput, StatusBar, Platform 
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import { friendsData } from '@/constants/friendsData';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPeople, setFilteredPeople] = useState(friendsData);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = friendsData.filter(friendsData =>
      friendsData.name.toLowerCase().includes(query.toLowerCase()) ||
      friendsData.details.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPeople(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends List</Text>
        <Pressable onPress={() => setShowSearch(!showSearch)} style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Search Bar */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends..."
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      )}

      {/* List of Friends */}
      <FlatList
        data={filteredPeople}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/profile/[id]",
              params: { 
                id: item.id.toString(),
                // name: item.name,
                // details: item.details,
                // image: item.image, // Pass Image URL as parameter
              }
            }}
            asChild
          >
            <Pressable style={styles.card}>
              <Image source={item.image} style={styles.avatar} />

              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>{item.details}</Text>
              </View>
            </Pressable>
          </Link>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const COLORS = {
  primary: '#4A90E2',
  background: '#F2F2F7',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 20 : 15,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchIcon: {
    padding: 8,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  searchInput: {
    height: 45,
    backgroundColor: '#EFEFF4',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.textDark,
  },
  listContainer: {
    paddingVertical: 10,
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
    width: 50,
    height: 50,
    borderRadius: 25,
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
