import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, ListItem, Switch } from 'react-native-elements';

export default function SettingsScreen(): React.JSX.Element {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title>Preferences</Card.Title>
        <Card.Divider />
        
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Push Notifications</ListItem.Title>
            <ListItem.Subtitle>Receive notifications about updates</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            color="#3b82f6"
          />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Dark Mode</ListItem.Title>
            <ListItem.Subtitle>Use dark theme</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            color="#3b82f6"
          />
        </ListItem>

        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Location Services</ListItem.Title>
            <ListItem.Subtitle>Allow location access</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={location}
            onValueChange={setLocation}
            color="#3b82f6"
          />
        </ListItem>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title>About</Card.Title>
        <Card.Divider />
        
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Version</ListItem.Title>
            <ListItem.Subtitle>1.0.0</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Privacy Policy</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Terms of Service</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  card: {
    borderRadius: 12,
    marginBottom: 20,
  },
});