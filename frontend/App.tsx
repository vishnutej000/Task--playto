import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ChatScreen from './src/screens/ChatScreen';
import ChatConversationScreen from './src/screens/ChatConversationScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();

function ChatsStackNavigator() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="ChatList" component={ChatScreen} />
      <ChatStack.Screen name="ChatConversation" component={ChatConversationScreen} />
    </ChatStack.Navigator>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    // simple placeholder screen for tabs that don't have full implementations
    <>
      <ExploreScreen />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
            tabBarStyle: { height: 60, paddingBottom: 6 },
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
          <Tab.Screen name="Chats" component={ChatsStackNavigator} options={{ title: 'Chats' }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
