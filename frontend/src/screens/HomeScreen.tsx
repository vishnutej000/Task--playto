import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-elements';

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title h2 style={styles.title}>
          Welcome to React Native!
        </Card.Title>
        <Card.Divider />
        <Text style={styles.subtitle}>
          Built with TypeScript and React Native Elements
        </Text>
        <Button
          title="Go to Details"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Details')}
        />
      </Card>
      
      <Card containerStyle={styles.card}>
        <Card.Title h4>Features:</Card.Title>
        <Card.Divider />
        <Text style={styles.feature}>✅ TypeScript support</Text>
        <Text style={styles.feature}>✅ React Native Elements UI</Text>
        <Text style={styles.feature}>✅ Navigation setup</Text>
        <Text style={styles.feature}>✅ Responsive design</Text>
      </Card>
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
    marginBottom: 20,
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
  },
  feature: {
    marginBottom: 5,
    fontSize: 16,
  },
});