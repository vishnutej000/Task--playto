import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface CallScreenProps {
  navigation: any;
  route: any;
}

const CallScreen = ({ navigation, route }: CallScreenProps) => {
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState('Ringing...');
  const [isConnected, setIsConnected] = useState(false);
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const { chatName, avatar, callType } = route.params || {
    chatName: 'Jonathan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  };

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF', true);
    }

    // Simulate call connection after 3 seconds
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
      setCallStatus('');
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigation.goBack();
  };

  const handleMute = () => {
    // Implement mute functionality
  };

  const handleSpeaker = () => {
    // Implement speaker functionality
  };

  const handleVideo = () => {
    // Implement video functionality
  };

  const handleMore = () => {
    // Implement more options
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Icon name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.callInfo}>
              <Icon name={callType === 'video' ? 'videocam' : 'call'} size={16} color="#007AFF" style={styles.callIcon} />
              <Text style={styles.callerName}>{chatName}</Text>
            </View>
            <Text style={styles.callStatus}>
              {isConnected ? formatDuration(callDuration) : callStatus}
            </Text>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Icon name="person-add" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Call Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={handleMore}>
              <Icon name="ellipsis-horizontal" size={24} color="#8E8E93" />
            </TouchableOpacity>

            {callType === 'video' ? (
              <>
                <TouchableOpacity style={styles.controlButton} onPress={handleVideo}>
                  <Icon name="videocam" size={24} color="#007AFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={handleSpeaker}>
                  <Icon name="volume-high" size={24} color="#007AFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={handleMute}>
                  <Icon name="mic-off" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.controlButton} onPress={handleSpeaker}>
                  <Icon name="volume-high" size={24} color="#007AFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={handleMute}>
                  <Icon name="mic-off" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
              <Icon name="call" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  callInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  callIcon: {
    marginRight: 8,
  },
  callerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  callStatus: {
    fontSize: 14,
    color: '#8E8E93',
  },
  profileButton: {
    padding: 4,
  },
  avatarSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  avatarContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default CallScreen;