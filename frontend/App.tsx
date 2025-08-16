import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ChatScreen from './src/screens/ChatScreen';
import ChatConversationScreen from './src/screens/ChatConversationScreen';
import CallScreen from './src/screens/CallScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function Placeholder({ title }: { title: string }) {
  return (
    // simple placeholder screen for tabs that don't have full implementations
    <>
      <ExploreScreen />
    </>
  );
}

function TabNavigator() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: any = 'ellipse';
          if (route.name === 'Community') iconName = Platform.OS === 'ios' ? 'people' : 'people';
          if (route.name === 'Discover') iconName = 'search';
          if (route.name === 'Create') iconName = 'add-circle-outline';
          if (route.name === 'Chats') iconName = 'chatbubble-ellipses-outline';
          if (route.name === 'Profile') iconName = 'person-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0070C9',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 60 + insets.bottom : 70,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0.5,
          borderTopColor: '#C6C6C8',
        },
      })}
    >
      <Tab.Screen name="Community" options={{ title: 'Community' }}>
        {() => <Placeholder title="Community" />}
      </Tab.Screen>
      <Tab.Screen name="Discover" options={{ title: 'Discover' }}>
        {() => <Placeholder title="Discover" />}
      </Tab.Screen>
      <Tab.Screen name="Create" options={{ title: '' }}>
        {() => <Placeholder title="Create" />}
      </Tab.Screen>
      <Tab.Screen name="Chats" component={ChatScreen} options={{ title: 'Chats' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={TabNavigator} />
      <RootStack.Screen name="ChatConversation" component={ChatConversationScreen} />
  <RootStack.Screen name="Call" component={CallScreen} />
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
