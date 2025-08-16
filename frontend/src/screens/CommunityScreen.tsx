import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function CommunityScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Community</Text>
        <Text style={styles.subtitle}>Connect with other users</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Geist',
    fontSize: 24,
    fontWeight: '600',
    color: '#20242E',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Geist',
    fontSize: 16,
    color: '#6B707B',
    textAlign: 'center',
  },
});