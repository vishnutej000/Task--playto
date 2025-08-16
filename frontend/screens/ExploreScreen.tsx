import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, SearchBar, Button } from 'react-native-elements';

export default function ExploreScreen() {
  const [search, setSearch] = React.useState('');

  const exploreItems = [
    { id: '1', title: 'Popular Today', description: 'Trending content and discussions', color: '#3b82f6' },
    { id: '2', title: 'New Releases', description: 'Latest updates and features', color: '#10b981' },
    { id: '3', title: 'Categories', description: 'Browse by topic and interest', color: '#f59e0b' },
    { id: '4', title: 'Recommended', description: 'Personalized suggestions for you', color: '#8b5cf6' },
  ];

  const renderExploreItem = ({ item }: any) => (
    <Card containerStyle={[styles.exploreCard, { borderLeftColor: item.color }]}>
      <View style={styles.exploreContent}>
        <Text h4 style={styles.exploreTitle}>{item.title}</Text>
        <Text style={styles.exploreDescription}>{item.description}</Text>
        <Button
          title="Explore"
          buttonStyle={[styles.exploreButton, { backgroundColor: item.color }]}
          onPress={() => console.log(`Exploring ${item.title}`)}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for content..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
        round
      />

      <FlatList
        data={exploreItems}
        renderItem={renderExploreItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchInput: {
    backgroundColor: '#ffffff',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  exploreCard: {
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
  },
  exploreContent: {
    padding: 10,
  },
  exploreTitle: {
    color: '#1f2937',
    marginBottom: 8,
  },
  exploreDescription: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  exploreButton: {
    borderRadius: 8,
    paddingVertical: 10,
  },
});