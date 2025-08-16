import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = Dimensions.get('window');
  
  // Platform-specific configurations
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  
  // Dynamic padding based on screen size and platform
  const getResponsivePadding = () => {
    if (screenWidth < 375) return 16; // Small screens
    if (screenWidth > 414) return 32; // Large screens
    return 24; // Default
  };
  
  const responsivePadding = getResponsivePadding();

  return (
    <View style={styles.container}>
      {/* Status Bar Background */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        >
          {/* Header */}
          <View style={[styles.header, { paddingHorizontal: responsivePadding }]}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Icon name="settings-outline" size={24} color="#20242E" />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View style={[styles.profileSection, { paddingHorizontal: responsivePadding }]}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
              }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>[email]</Text>
            
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={[styles.menuSection, { paddingHorizontal: responsivePadding }]}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Icon name="person-outline" size={20} color="#6B707B" />
                <Text style={styles.menuItemText}>Account Settings</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#6B707B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Icon name="notifications-outline" size={20} color="#6B707B" />
                <Text style={styles.menuItemText}>Notifications</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#6B707B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Icon name="shield-outline" size={20} color="#6B707B" />
                <Text style={styles.menuItemText}>Privacy & Security</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#6B707B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Icon name="help-circle-outline" size={20} color="#6B707B" />
                <Text style={styles.menuItemText}>Help & Support</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#6B707B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Icon name="information-circle-outline" size={20} color="#6B707B" />
                <Text style={styles.menuItemText}>About</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color="#6B707B" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={[styles.logoutButton, { marginHorizontal: responsivePadding }]}>
            <Icon name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  statusBarBackground: {
    backgroundColor: '#FDFDFD',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
    backgroundColor: '#FDFDFD',
  },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '600',
    fontSize: Platform.OS === 'ios' ? 28 : 24,
    lineHeight: Platform.OS === 'ios' ? 34 : 29,
    color: '#20242E',
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  profileImage: {
    width: Platform.OS === 'ios' ? 110 : 100,
    height: Platform.OS === 'ios' ? 110 : 100,
    borderRadius: Platform.OS === 'ios' ? 55 : 50,
    marginBottom: 16,
  },
  profileName: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: Platform.OS === 'ios' ? 26 : 24,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    color: '#20242E',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    color: '#6B707B',
    marginBottom: 24,
  },
  editButton: {
    backgroundColor: '#0070C9',
    paddingHorizontal: Platform.OS === 'ios' ? 28 : 24,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  editButtonText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    color: '#FFFFFF',
  },
  menuSection: {
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 18 : 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    color: '#20242E',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'ios' ? 18 : 16,
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 8,
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: '#FF3B30',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  logoutText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
});