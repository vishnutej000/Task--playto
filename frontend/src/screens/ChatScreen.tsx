import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Pixel-Perfect Status Bar Component - Exact Figma Specs
const PerfectStatusBar = () => (
  <View style={statusBarStyles.statusBarContainer}>
    <View style={statusBarStyles.statusBar}>
      {/* Time - Exact Figma positioning */}
      <Text style={statusBarStyles.time}>9:41</Text>

      {/* Dynamic Island - Exact Figma specs */}
      <View style={statusBarStyles.dynamicIslandGroup}>
        <View style={statusBarStyles.dynamicIsland}>
          <View style={statusBarStyles.lens}>
            <View style={statusBarStyles.ellipse1} />
            <View style={statusBarStyles.ellipse2} />
            <View style={statusBarStyles.ellipse3} />
            <View style={statusBarStyles.ellipse4} />
          </View>
        </View>
      </View>

      {/* Right Side - Exact Figma positioning */}
      <View style={statusBarStyles.rightSide}>
        {/* Mobile Signal - Exact Figma specs */}
        <View style={statusBarStyles.mobileSignal} />
        
        {/* WiFi - Exact Figma specs */}
        <View style={statusBarStyles.wifi}>
          <View style={statusBarStyles.wifiPath1} />
          <View style={statusBarStyles.wifiPath2} />
          <View style={statusBarStyles.wifiPath3} />
        </View>

        {/* Battery - Exact Figma specs */}
        <View style={statusBarStyles.battery}>
          <View style={statusBarStyles.batteryOutline}>
            <View style={statusBarStyles.batteryFill} />
          </View>
          <View style={statusBarStyles.batteryEnd} />
        </View>
      </View>
    </View>
  </View>
);

// Exact Figma Status Bar Styles
const statusBarStyles = StyleSheet.create({
  // Frame 2085661226 - StatusBar Container
  statusBarContainer: {
    position: 'absolute',
    width: '100%',
    height: 48,
    left: 0,
    top: 0,
    zIndex: 1000,
  },
  // StatusBar - Exact Figma specs
  statusBar: {
    width: '100%',
    height: 48,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  // Time - Exact Figma positioning
  time: {
    position: 'absolute',
    width: 33,
    height: 21,
    left: 24,
    top: 13.5, // calc(50% - 21px/2 + 0.5px)
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.32,
    color: '#121212',
  },
  // Dynamic Island Group - Exact Figma specs
  dynamicIslandGroup: {
    position: 'absolute',
    width: 124,
    height: 37,
    left: '50%',
    marginLeft: -62,
    bottom: -1,
  },
  // Dynamic Island - Exact Figma specs
  dynamicIsland: {
    position: 'absolute',
    width: 124,
    height: 37,
    left: '50%',
    marginLeft: -62,
    top: 12,
    backgroundColor: '#171717',
    borderRadius: 32.036,
  },
  // Lens - Exact Figma specs
  lens: {
    position: 'absolute',
    width: 11,
    height: 11,
    left: '50%',
    marginLeft: -5.5,
    top: '50%',
    marginTop: -5.5,
  },
  // Ellipse 1 - Exact Figma specs
  ellipse1: {
    position: 'absolute',
    width: 11,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 5.5,
  },
  // Ellipse 2 - Exact Figma specs
  ellipse2: {
    position: 'absolute',
    width: 9,
    height: 9,
    left: 1,
    top: 1,
    backgroundColor: '#000000',
    borderRadius: 4.5,
  },
  // Ellipse 3 - Exact Figma specs
  ellipse3: {
    position: 'absolute',
    width: 5,
    height: 2,
    left: 3,
    top: 2,
    backgroundColor: '#000000',
  },
  // Ellipse 4 - Exact Figma specs
  ellipse4: {
    position: 'absolute',
    width: 5,
    height: 3,
    left: 3,
    top: 6,
    backgroundColor: '#000000',
  },
  // Right Side - Exact Figma positioning
  rightSide: {
    position: 'absolute',
    width: 77,
    height: 13,
    right: 24,
    top: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Mobile Signal - Exact Figma specs
  mobileSignal: {
    position: 'absolute',
    width: 17.91,
    height: 12,
    left: 0,
    top: 1,
    backgroundColor: '#121212',
  },
  // WiFi - Exact Figma specs
  wifi: {
    position: 'absolute',
    width: 16.91,
    height: 12,
    left: 25,
    top: 1,
  },
  // WiFi Path 1 - Exact Figma specs
  wifiPath1: {
    position: 'absolute',
    width: 16.91,
    height: 5.39,
    top: 0,
    backgroundColor: '#DADADA',
  },
  // WiFi Path 2 - Exact Figma specs
  wifiPath2: {
    position: 'absolute',
    width: 11.02,
    height: 4.13,
    top: 4,
    left: 2.95,
    backgroundColor: '#DADADA',
  },
  // WiFi Path 3 - Exact Figma specs
  wifiPath3: {
    position: 'absolute',
    width: 5.12,
    height: 3.83,
    top: 8,
    left: 5.9,
    backgroundColor: '#DADADA',
  },
  // Battery - Exact Figma specs
  battery: {
    position: 'absolute',
    width: 27.26,
    height: 13,
    right: 0,
    top: 0,
  },
  // Battery Outline - Exact Figma specs
  batteryOutline: {
    position: 'absolute',
    height: 13,
    left: 0,
    right: 2.26,
    top: 0,
    borderWidth: 1,
    borderColor: '#121212',
    borderRadius: 4,
    opacity: 0.35,
  },
  // Battery Fill - Exact Figma specs
  batteryFill: {
    position: 'absolute',
    height: 9,
    left: 2,
    right: 4.26,
    top: 2,
    backgroundColor: '#121212',
    borderRadius: 2,
  },
  // Battery End - Exact Figma specs
  batteryEnd: {
    position: 'absolute',
    width: 1.4,
    height: 4.22,
    right: -0.14,
    top: 4.39,
    backgroundColor: '#121212',
    opacity: 0.4,
  },
});

interface ChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
  unreadCount?: number;
}

const chatData: ChatItem[] = [
  { id: '1', name: 'Jane', message: 'Jane: Did you have time to see this?', time: '17/02/25', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=52&h=52&fit=crop&crop=face', unreadCount: 2 },
  { id: '2', name: 'Evelyn', message: 'You: hi!', time: '10/02/25', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=52&h=52&fit=crop&crop=face' },
  { id: '3', name: 'Jonathan', message: 'Jonathan: hey, check this pic, it\'s hilarious', time: '30/12/24', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=52&h=52&fit=crop&crop=face', unreadCount: 1 },
  { id: '4', name: 'Marcus', message: 'Sent a location', time: '20/11/24', avatar: 'https://images.unsplash.com/photo-1545996124-1f3d4f5b3d4f?w=52&h=52&fit=crop&crop=face' },
  { id: '5', name: 'Aisha', message: 'Thanks — I\'ll get back to you', time: 'Tue', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=52&h=52&fit=crop&crop=face', unreadCount: 3 },
  { id: '6', name: 'Liam', message: 'Voice note: 0:12', time: 'Mon', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=52&h=52&fit=crop&crop=face' },
  { id: '7', name: 'Noah', message: 'Check this article I found', time: '01/08/24', avatar: 'https://images.unsplash.com/photo-1546456073-6712f79251bb?w=52&h=52&fit=crop&crop=face' },
  { id: '8', name: 'Olivia', message: 'Can we reschedule?', time: 'Yesterday', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=52&h=52&fit=crop&crop=face', unreadCount: 1 },
  { id: '9', name: 'Emma', message: 'Photos from the trip', time: 'Yesterday', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=52&h=52&fit=crop&crop=face' },
  { id: '10', name: 'Olga', message: 'Meeting at 3pm', time: '12/07/24', avatar: 'https://images.unsplash.com/photo-1545996124-1f3d4f5b3d4f?w=52&h=52&fit=crop&crop=face' },
  { id: '11', name: 'Sophia', message: 'Congrats on the launch!', time: '10/07/24', avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=52&h=52&fit=crop&crop=face' },
  { id: '12', name: 'Michael', message: 'Sent you the file', time: '08/07/24', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=52&h=52&fit=crop&crop=face' },
  { id: '13', name: 'Chloe', message: 'LOL 😂', time: '05/07/24', avatar: 'https://images.unsplash.com/photo-1545996124-1f3d4f5b3d4f?w=52&h=52&fit=crop&crop=face' },
  { id: '14', name: 'Daniel', message: 'Are you coming tonight?', time: '02/07/24', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=52&h=52&fit=crop&crop=face', unreadCount: 5 },
  { id: '15', name: 'Grace', message: 'Thanks for the help!', time: '30/06/24', avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=52&h=52&fit=crop&crop=face' },
  { id: '16', name: 'Ethan', message: 'Let\'s catch up soon', time: '28/06/24', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=52&h=52&fit=crop&crop=face' },
  { id: '17', name: 'Zara', message: 'Done ✅', time: '26/06/24', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=52&h=52&fit=crop&crop=face' },
  { id: '18', name: 'Oliver', message: 'Time to deploy', time: '20/06/24', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=52&h=52&fit=crop&crop=face' },
  { id: '19', name: 'Maya', message: 'Cooking tonight?', time: '18/06/24', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=52&h=52&fit=crop&crop=face' },
  { id: '20', name: 'Lucas', message: 'See you soon', time: '15/06/24', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=52&h=52&fit=crop&crop=face' },
];

interface ChatScreenProps {
  navigation: any;
}

export default function ChatScreen({ navigation }: ChatScreenProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('All');
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = Dimensions.get('window');
  
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  
  // Responsive padding - Figma uses 24px
  const responsivePadding = 24;

  // Cap top inset used for header spacing to avoid too much empty space from notification/status bar
  const headerTopInset = Math.min(insets.top || 0, 20);
  
  // Filter chats based on active tab
  const filteredChats = chatData.filter(chat => {
    if (activeTab === 'Unread') return chat.unreadCount && chat.unreadCount > 0;
    if (activeTab === 'Favorites') return false;
    return true;
  }).filter(chat => 
    chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
    chat.message.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderChatItem = (item: ChatItem) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatConversation', {
        chatName: item.name,
        avatar: item.avatar,
      })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
      {item.unreadCount && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Universal render for both platforms with exact Figma specs
  return (
    <View style={styles.container}>
      {/* Status Bar - Only show on iOS */}
      {isIOS && <PerfectStatusBar />}
      
      {/* Android Status Bar */}
      {isAndroid && (
        <StatusBar 
          backgroundColor="transparent" 
          barStyle="dark-content" 
          translucent={true}
        />
      )}
      
  <SafeAreaView style={[styles.safeArea, { paddingTop: headerTopInset }]}>
        {/* Frame 11577 - Main Content Container */}
        <View style={styles.mainContent}>
          {/* Header Section */}
          <View style={[styles.headerSection, { paddingTop: headerTopInset ? 0 : 12 }] }>
            <View style={[styles.headerContainer, { paddingTop: 0, paddingBottom: 8 }]}>
              <Text style={styles.headerTitle}>Chat</Text>
            </View>
          </View>

          {/* Search and Tabs Container */}
          <View style={styles.searchTabsContainer}>
            {/* Search Bar - Exact Figma specs */}
            <View style={styles.searchContainer}>
              <View style={styles.inputBox}>
                <View style={styles.searchIconContainer}>
                  <View style={styles.searchIconUnion} />
                </View>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Name"
                  placeholderTextColor="#6B707B"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
            </View>

            {/* Tabs - Exact Figma specs */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'All' && styles.activeTabButton]}
                onPress={() => setActiveTab('All')}
              >
                <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>
                  All
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'Unread' && styles.activeTabButton]}
                onPress={() => setActiveTab('Unread')}
              >
                <Text style={[styles.tabText, activeTab === 'Unread' && styles.activeTabText]}>
                  Unread
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'Favorites' && styles.activeTabButton]}
                onPress={() => setActiveTab('Favorites')}
              >
                <Text style={[styles.tabText, activeTab === 'Favorites' && styles.activeTabText]}>
                  Favorites
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Chat List */}
        <ScrollView 
          style={styles.chatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingHorizontal: responsivePadding,
            paddingBottom: isAndroid ? 20 : insets.bottom + 20 
          }}
        >
          {filteredChats.map(renderChatItem)}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// Exact Figma Styles
const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  safeArea: {
    flex: 1,
  },
  // Frame 11577 - Main Content
  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  backgroundColor: 'transparent',
  },
  // Header Section
  headerSection: {
    gap: 12,
  },
  headerContainer: {
    width: 248,
    height: 29,
  },
  // Chat Title - Exact Figma specs
  headerTitle: {
    width: 248,
    height: 29,
    fontFamily: 'Geist',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29, // 120% of 24px
    color: '#20242E',
  },
  // Search and Tabs Container
  searchTabsContainer: {
    gap: 16,
  },
  // Search Container
  searchContainer: {
    gap: 8,
  },
  // Input Box - Exact Figma specs
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEBEC',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  // Search Icon Container
  searchIconContainer: {
    width: 20,
    height: 20,
  },
  // Search Icon Union - Exact Figma specs
  searchIconUnion: {
    position: 'absolute',
    width: 16.25,
    height: 16.25,
    left: 1.88,
    top: 1.88,
    backgroundColor: '#6B707B',
    borderRadius: 8,
  },
  // Search Input - Exact Figma specs
  searchInput: {
    flex: 1,
    height: 19,
    fontFamily: 'Geist',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19, // 120% of 16px
    color: '#6B707B',
    paddingVertical: 0,
  },
  // Tabs Container - Exact Figma specs
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 30,
  },
  // Tab Button - Exact Figma specs
  tabButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
    height: 30,
    borderWidth: 1,
    borderColor: '#EAEBEC',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  // Active Tab Button - Exact Figma specs
  activeTabButton: {
    backgroundColor: '#0070C9',
    borderColor: '#0070C9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 4,
  },
  // Tab Text - Exact Figma specs
  tabText: {
    fontFamily: 'Geist',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14, // 120% of 12px
    color: '#20242E',
  },
  // Active Tab Text - Exact Figma specs
  activeTabText: {
    color: '#FFFFFF',
  },
  // Chat List
  chatList: {
    flex: 1,
  },
  // Chat Item
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#FDFDFD',
  },
  // Avatar - Exact Figma specs
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    borderWidth: 0.5,
    borderColor: '#D9DDE6',
  },
  // Chat Content
  chatContent: {
    flex: 1,
  },
  // Chat Header
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  // Chat Name
  chatName: {
    fontFamily: 'Geist',
    fontWeight: '600',
    fontSize: 16,
    color: '#20242E',
  },
  // Chat Time
  chatTime: {
    fontFamily: 'Geist',
    fontWeight: '400',
    fontSize: 14,
    color: '#6B707B',
  },
  // Chat Message
  chatMessage: {
    fontFamily: 'Geist',
    fontWeight: '400',
    fontSize: 14,
    color: '#6B707B',
    lineHeight: 18,
  },
  // Unread Badge
  unreadBadge: {
    backgroundColor: '#0070C9',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  // Unread Text
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Geist',
  },
});