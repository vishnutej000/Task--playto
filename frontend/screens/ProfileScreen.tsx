import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar, ListItem } from 'react-native-elements';

export default function ProfileScreen() {
  const profileData = [
    { title: 'Email', subtitle: 'user@example.com', icon: 'email' },
    { title: 'Phone', subtitle: '+1 (555) 123-4567', icon: 'phone' },
    { title: 'Location', subtitle: 'New York, NY', icon: 'location-on' },
    { title: 'Joined', subtitle: 'January 2024', icon: 'date-range' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="large"
            rounded
            title="JD"
            containerStyle={styles.avatar}
          />
          <Text h3 style={styles.name}>John Doe</Text>
          <Text style={styles.bio}>Software Developer</Text>
        </View>
      </Card>

      <Card containerStyle={styles.infoCard}>
        <Text h4 style={styles.sectionTitle}>Profile Information</Text>
        {profileData.map((item, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  profileCard: {
    borderRadius: 12,
    margin: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: '#3b82f6',
    marginBottom: 15,
  },
  name: {
    color: '#1f2937',
    marginBottom: 5,
  },
  bio: {
    color: '#6b7280',
    fontSize: 16,
  },
  infoCard: {
    borderRadius: 12,
    margin: 20,
    marginTop: 10,
  },
  sectionTitle: {
    color: '#1f2937',
    marginBottom: 15,
  },
});