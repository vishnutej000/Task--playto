import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';

interface DetailsScreenProps {
  navigation: any;
}

export default function DetailsScreen({ navigation }: DetailsScreenProps): React.JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title h3>App Details</Card.Title>
        <Card.Divider />
        <Text style={styles.description}>
          This is a React Native application built with TypeScript and React Native Elements. 
          It demonstrates navigation patterns, component styling, and responsive design principles.
        </Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title h4>Technical Stack</Card.Title>
        <Card.Divider />
        <View style={styles.techItem}>
          <Text style={styles.techTitle}>Frontend Framework:</Text>
          <Text style={styles.techValue}>React Native</Text>
        </View>
        <View style={styles.techItem}>
          <Text style={styles.techTitle}>Language:</Text>
          <Text style={styles.techValue}>TypeScript</Text>
        </View>
        <View style={styles.techItem}>
          <Text style={styles.techTitle}>UI Library:</Text>
          <Text style={styles.techValue}>React Native Elements</Text>
        </View>
        <View style={styles.techItem}>
          <Text style={styles.techTitle}>Navigation:</Text>
          <Text style={styles.techValue}>React Navigation v7</Text>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title h4>Features</Card.Title>
        <Card.Divider />
        <Text style={styles.feature}>🚀 Fast development with Expo</Text>
        <Text style={styles.feature}>📱 Cross-platform compatibility</Text>
        <Text style={styles.feature}>🎨 Beautiful UI components</Text>
        <Text style={styles.feature}>🔧 TypeScript for better development</Text>
        <Text style={styles.feature}>📍 Navigation between screens</Text>
      </Card>

      <Button
        title="Go Back"
        buttonStyle={styles.backButton}
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    textAlign: 'justify',
  },
  techItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  techTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  techValue: {
    fontSize: 16,
    color: '#3b82f6',
  },
  feature: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
  },
  backButton: {
    backgroundColor: '#6b7280',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
  },
});