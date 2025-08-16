import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import { Text, Card, ListItem, Button } from 'react-native-elements';
const AnyCard: any = Card;

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);

  const settingsOptions = [
    {
      title: 'Push Notifications',
      subtitle: 'Receive notifications on your device',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      title: 'Dark Mode',
      subtitle: 'Use dark theme throughout the app',
      value: darkMode,
      onToggle: setDarkMode,
    },
    {
      title: 'Location Services',
      subtitle: 'Allow app to access your location',
      value: locationServices,
      onToggle: setLocationServices,
    },
  ];

  const accountOptions = [
    { title: 'Change Password', subtitle: 'Update your account password' },
    { title: 'Privacy Settings', subtitle: 'Manage your privacy preferences' },
    { title: 'Data & Storage', subtitle: 'Manage app data and storage' },
  ];

  return (
    <ScrollView style={styles.container}>
  <AnyCard containerStyle={styles.card as any}>
        <Text h4 style={styles.sectionTitle}>Preferences</Text>
        {settingsOptions.map((option, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{option.title}</ListItem.Title>
              <ListItem.Subtitle>{option.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={option.value}
              onValueChange={option.onToggle}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={option.value ? '#ffffff' : '#f3f4f6'}
            />
          </ListItem>
        ))}
  </AnyCard>

  <AnyCard containerStyle={styles.card as any}>
        <Text h4 style={styles.sectionTitle}>Account</Text>
        {accountOptions.map((option, index) => (
          <ListItem key={index} bottomDivider onPress={() => console.log(`Pressed ${option.title}`)}>
            <ListItem.Content>
              <ListItem.Title>{option.title}</ListItem.Title>
              <ListItem.Subtitle>{option.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
  </AnyCard>

  <AnyCard containerStyle={styles.card as any}>
        <Button
          title="Sign Out"
          buttonStyle={styles.signOutButton}
          titleStyle={styles.signOutText}
          onPress={() => console.log('Sign out pressed')}
        />
      </AnyCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  card: {
    borderRadius: 12,
    margin: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#1f2937',
    marginBottom: 15,
  },
  signOutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 12,
  },
  signOutText: {
    fontWeight: 'bold',
  },
});