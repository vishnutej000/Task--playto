import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';

const AnyCard: any = Card;

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
  <AnyCard containerStyle={styles.card as any}>
        <Text h2 style={styles.title}>Home Screen</Text>
        <Text style={styles.subtitle}>Welcome to your app!</Text>
        
        <Button
          title="Go to Profile"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Profile')}
        />
        
        <Button
          title="Go to Settings"
          buttonStyle={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Settings')}
        />
  </AnyCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: '#2563eb',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#6b7280',
  },
});