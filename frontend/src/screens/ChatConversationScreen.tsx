import React, { useState, useRef, useEffect } from 'react';
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
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Svg, { Path, Rect } from 'react-native-svg';

type MessageType = 'text' | 'image' | 'video' | 'audio' | 'file' | 'call';
type SenderType = 'me' | 'other';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  sender: SenderType;
  timestamp: string;
  imageUrl?: string;
  fileSize?: string;
  fileType?: string;
  duration?: string;
}

const messages: Message[] = [
  {
    id: '1',
    type: 'text',
    content: 'This is a proxy text sent by the friend regarding something.',
    sender: 'other',
    timestamp: '12:30 AM',
  },
  {
    id: '2',
    type: 'text',
    content: 'Maybe sending like another text just to be more clear',
    sender: 'me',
    timestamp: '12:30 AM',
  },
  {
    id: '3',
    type: 'image',
    content: 'A text with a bigger image!',
    sender: 'me',
    timestamp: '12:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=272&h=363&fit=crop',
  },
  {
    id: '4',
    type: 'video',
    content: 'A text with a video!',
    sender: 'other',
    timestamp: '12:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=272&h=363&fit=crop',
    duration: '0:04',
  },
  {
    id: '5',
    type: 'audio',
    content: '',
    sender: 'other',
    timestamp: '12:30 AM',
    duration: '0:04',
  },
  {
    id: '6',
    type: 'image',
    content: '',
    sender: 'me',
    timestamp: '12:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=272&h=108&fit=crop',
  },
  {
    id: '7',
    type: 'file',
    content: 'This is the file you wanted',
    sender: 'me',
    timestamp: '12:30 AM',
    fileSize: '200 kB',
    fileType: 'File type',
  },
  {
    id: '8',
    type: 'file',
    content: 'This is the file you wanted',
    sender: 'other',
    timestamp: '12:30 AM',
    fileSize: '200 kB',
    fileType: 'File type',
  },
  {
    id: '9',
    type: 'call',
    content: 'Voice Call',
    sender: 'me',
    timestamp: '12:30 AM',
    duration: '13 mins',
  },
];

interface ChatConversationScreenProps {
  navigation: any;
  route: any;
}

// Custom SVG Mic Icon Component
const CustomMicIcon = ({ size = 20, color = "#007AFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 19v3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="9" y="2" width="6" height="13" rx="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Custom SVG Send Icon Component
const CustomSendIcon = ({ size = 18, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path 
      d="m7.4 6.32 8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92ZM10.11 13.65l3.58-3.59" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </Svg>
);

// Custom Audio Call Icon (user-provided SVG)
const CustomAudioCallIcon = ({ size = 20, color = "#FF8A65" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.97 18.33c0 .36-.08.73-.25 1.09-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.6.25-1.25.38-1.95.38-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98a28.75 28.75 0 0 1-3.28-2.8 28.414 28.414 0 0 1-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.54.53 1.06 1.02 1.59 1.47.52.44.95.74 1.29.92.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.10.25.16.5.16.78Z"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Custom Video Call Icon (user-provided SVG)
const CustomVideoCallIcon = ({ size = 20, color = "#FF8A65" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.53 20.42H6.21c-3.16 0-4.21-2.1-4.21-4.21V7.79c0-3.16 1.05-4.21 4.21-4.21h6.32c3.16 0 4.21 1.05 4.21 4.21v8.42c0 3.16-1.06 4.21-4.21 4.21Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m19.52 17.1-2.78-1.95V8.84l2.78-1.95c1.36-.95 2.48-.37 2.48 1.3v7.62c0 1.67-1.12 2.25-2.48 1.29ZM11.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChatConversationScreen = ({ navigation, route }: ChatConversationScreenProps) => {
  const HEADER_HEIGHT = 64;
  const [headerTransparent, setHeaderTransparent] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingHeights, setRecordingHeights] = useState<number[]>(() => Array.from({ length: 24 }, () => 8));
  const recordingIntervalRef = useRef<any>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const scrollViewRef = useRef<ScrollView>(null);

  const isIOS = Platform.OS === 'ios';
  const isSmallScreen = screenWidth < 375;
  const isLargeScreen = screenWidth > 414;
  const responsivePadding = isSmallScreen ? 12 : isLargeScreen ? 20 : 16;

  const { chatName, avatar } = route.params || {
    chatName: 'Jonathan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
  };

  // Limit the top safe-area inset used for header spacing so we don't create too much empty space
  const topInset = Math.min(insets.top || 0, 20);

  useEffect(() => {
    // Set status bar style
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
  // Make Android status bar translucent and transparent so header can be transparent
  StatusBar.setBackgroundColor('transparent', true);
  StatusBar.setTranslucent && StatusBar.setTranslucent(true);
    }
  }, []);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, you would add the message to your state/backend here
      setMessageText('');
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // start/stop simulated waveform when recording toggles
  useEffect(() => {
    if (isRecording) {
      // reset timer and heights
      setRecordingSeconds(0);
      setRecordingHeights(Array.from({ length: 20 }, () => 8));
      recordingIntervalRef.current = setInterval(() => {
        // update heights with random variation to simulate live waveform
        setRecordingHeights((prev) => Array.from({ length: 24 }, () => 6 + Math.round(Math.random() * 22)));
        setRecordingSeconds((s) => s + 1);
      }, 250);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
      setRecordingSeconds(0);
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    };
  }, [isRecording]);

  const renderMessage = ({ item }: { item: Message }) => {
  const isMe = item.sender === 'me';
    // Make file messages wider horizontally than regular text bubbles
    const maxBubbleWidth = screenWidth * (item.type === 'file' ? 0.95 : 0.75);    return (
      <View style={styles.messageWrapper}>
        <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
          {!isMe && (
            <Image source={{ uri: avatar }} style={styles.messageAvatar} />
          )}

          <View style={[styles.messageBubble, isMe ? styles.myBubble : styles.otherBubble, { maxWidth: maxBubbleWidth }]}>
            {item.type === 'text' && (
              <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText]}>
                {item.content}
              </Text>
            )}

            {item.type === 'image' && (
              <View>
                <View style={styles.videoContainer}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={[styles.messageImage, { width: Math.min(maxBubbleWidth - 24, 280) }]}
                    resizeMode="cover"
                  />
                  <View style={styles.videoOverlay}>
                    <View style={styles.playButton}>
                      <Icon name="play" size={24} color="#FFFFFF" />
                    </View>
                  </View>
                  <View style={styles.videoDurationContainer}>
                    <Text style={styles.videoDuration}>{item.duration}</Text>
                  </View>
                </View>
                {item.content && (
                  <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText, { marginTop: 8 }]}>
                    {item.content}
                  </Text>
                )}
              </View>
            )}

            {item.type === 'audio' && (
              <View style={styles.audioContainer}>
                <TouchableOpacity style={styles.audioPlayButton}>
                  <Icon name="play" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.audioWaveform}>
                  {Array.from({ length: 20 }, (_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.audioBar,
                        {
                          height: [4, 8, 12, 16, 20, 16, 12, 8, 4, 8, 12, 16, 20, 16, 12, 8, 4, 8, 12, 16][i] || 8,
                          backgroundColor: i < 6 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}

            {item.type === 'file' && (
              <View>
                {/* White file card embedded inside the blue bubble */}
                <View style={styles.fileCardEmbedded}>
                  <View style={styles.fileCardIcon}>
                    <Icon name="attach" size={18} color="#007AFF" />
                  </View>
                  <View style={styles.fileCardText}>
                    <Text numberOfLines={1} style={styles.fileCardTitle}>File Name</Text>
                    <Text style={styles.fileCardMeta}>{item.fileSize} | {item.fileType}</Text>
                  </View>
                </View>
                
                {/* Blue text below the white card */}
                <Text style={styles.fileMessageText}>{item.content || 'This is the file you wanted'}</Text>
              </View>
            )}

            {item.type === 'call' && (
              <TouchableOpacity
                style={styles.callContainer}
                onPress={() => {
                  const type = item.content && item.content.toLowerCase().includes('voice') ? 'audio' : 'video';
                  navigation.navigate('Call', { chatName, avatar, callType: type, topInset });
                }}
              >
                <View style={styles.callIconContainer}>
                  {item.content && item.content.toLowerCase().includes('voice') ? (
                    <CustomAudioCallIcon size={20} color="#007AFF" />
                  ) : (
                    <CustomVideoCallIcon size={20} color="#007AFF" />
                  )}
                </View>
                <View style={styles.callInfo}>
                  <Text style={styles.callType}>{item.content}</Text>
                  <Text style={styles.callDuration}>{item.duration}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={[styles.timestamp, isMe ? styles.myTimestamp : styles.otherTimestamp]}>
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      // use padding behavior on both platforms so the input lifts above the keyboard
      behavior={'padding'}
      keyboardVerticalOffset={0}
    >
  <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      <SafeAreaView style={[styles.safeArea, { paddingTop: 0 }]}>
        {/* Header (absolute so it's visually transparent over messages) */}
  <View style={[styles.header, { top: topInset, height: HEADER_HEIGHT, backgroundColor: headerTransparent ? 'transparent' : '#FFFFFF' }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Icon name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Image
              source={{ uri: avatar }}
              style={styles.headerAvatar}
              resizeMode="cover"
            />
            <Text style={styles.headerName}>{chatName}</Text>
           </View>
 
          <View style={styles.headerActions}>
            {/* render order: video, audio, kebab -> visually right-to-left: kebab, audio, video */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Call', { chatName, avatar, callType: 'video', topInset })}
              accessibilityRole="button"
              accessibilityLabel="Start video call"
            >
              <CustomVideoCallIcon size={24} color="#007AFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Call', { chatName, avatar, callType: 'audio', topInset })}
              accessibilityRole="button"
              accessibilityLabel="Start audio call"
            >
              <CustomAudioCallIcon size={24} color="#007AFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => { /* TODO: open menu */ }}
              accessibilityRole="button"
              accessibilityLabel="More options"
            >
              <Icon name="ellipsis-vertical" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

          {/* Messages - pad the top so content is visible under the absolute header */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.messagesContent, { paddingTop: HEADER_HEIGHT + topInset + 8 }]}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          onScroll={(e) => {
            const y = e.nativeEvent.contentOffset.y;
            // turn header transparent when content is scrolled at all
            setHeaderTransparent(y > 0);
          }}
          scrollEventThrottle={16}
        >
          {messages.map((item) => (
            <React.Fragment key={item.id}>
              {renderMessage({ item })}
            </React.Fragment>
          ))}
        </ScrollView>

        {/* Input Area */}
        {/* Floating input: use same floating styles on Android as iOS */}
        <View style={[styles.inputContainer, styles.inputContainerIOS, { paddingBottom: insets.bottom + 8 }]}>
          <View style={[styles.inputBox, styles.inputBoxIOS]}>
            <TouchableOpacity
              style={styles.addButton}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel="Add attachment"
            >
              <Icon name="add" size={24} color="#007AFF" />
            </TouchableOpacity>

            {isRecording ? (
              <View style={styles.recordingContainer}>
                <View style={styles.recordingInner}>
                  <View style={styles.recordingMicWrapper}>
                    <CustomMicIcon size={18} color="#007AFF" />
                  </View>

                  <View style={styles.recordingBars}>
                    {recordingHeights.map((h, i) => {
                      const activeCount = 3; // first N bars are animated blue
                      if (i < activeCount) {
                        return (
                          <View
                            key={i}
                            style={[
                              styles.recordingBar,
                              { height: h, backgroundColor: '#007AFF', width: 4, marginRight: 4 },
                            ]}
                          />
                        );
                      }

                      // grey dotted small markers for the rest
                      return (
                        <View
                          key={i}
                          style={[
                            styles.recordingDot,
                            { height: 6, width: 3, marginRight: 4, backgroundColor: 'rgba(142,142,147,0.4)' },
                          ]}
                        />
                      );
                    })}
                  </View>

                  <Text style={styles.recordingTimer}>{new Date(recordingSeconds * 1000).toISOString().substr(14, 5)}</Text>
                </View>
              </View>
            ) : (
              <TextInput
                style={[styles.textInput, styles.textInputIOS]}
                placeholder="Type message..."
                placeholderTextColor="#999999"
                value={messageText}
                onChangeText={setMessageText}
                multiline
                maxLength={1000}
              />
            )}

            <TouchableOpacity
              style={styles.micButton}
              onPress={toggleRecording}
            >
              {isRecording ? (
                <Feather name="square" size={24} color="#007AFF" />
              ) : (
                <CustomMicIcon size={24} color="#007AFF" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sendButton, { opacity: messageText.trim() ? 1 : 0.6 }]}
              onPress={handleSendMessage}
              disabled={!messageText.trim()}
            >
              <CustomSendIcon size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  safeArea: {
    flex: 1,
  backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  position: 'absolute',
  left: 0,
  right: 0,
  paddingVertical: 12,
  paddingHorizontal: 12,
  // keep header visually flat: no shadow or border
  backgroundColor: 'rgba(255,255,255,0.0)',
  borderBottomWidth: 0,
  zIndex: 999,
  elevation: 999,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  headerName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // small right margin so buttons don't touch the screen edge
    marginRight: 8,
  },
  actionButton: {
  padding: 6,
  marginHorizontal: 4,
  },
  messagesContainer: {
    flex: 1,
  backgroundColor: 'transparent',
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 2,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  myBubble: {
  backgroundColor: '#E9E9EB',
  borderBottomRightRadius: 6,
    alignSelf: 'flex-end',
  },
  otherBubble: {
  backgroundColor: '#007AFF',
  borderBottomLeftRadius: 6,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
  color: '#000000',
  },
  otherMessageText: {
  color: '#FFFFFF',
  },
  messageImage: {
    borderRadius: 12,
    height: 200,
  },
  videoContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDurationContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoDuration: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    minWidth: 200,
  },
  audioPlayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  audioWaveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  audioBar: {
    width: 3,
    borderRadius: 1.5,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    minWidth: 200,
  },
  myFileContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  otherFileContainer: {
    backgroundColor: '#FFFFFF',
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  fileDetails: {
    fontSize: 13,
    color: '#8E8E93',
  },
  callContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 12,
    minWidth: 150,
  },
  callIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
  backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  callInfo: {
    flex: 1,
  },
  callType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  callDuration: {
    fontSize: 13,
    color: '#8E8E93',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  myTimestamp: {
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  otherTimestamp: {
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#C6C6C8',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 40,
  },
  inputContainerIOS: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  inputBoxIOS: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
  },
  fileStackContainer: {
    width: '100%',
    marginTop: 4,
  },
  fileCardEmbedded: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    // give a subtle outline similar to the screenshot
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    marginBottom: 6,
    width: '100%',
  },
  fileCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileCardText: {
    flex: 1,
  },
  fileCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  fileCardMeta: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  fileMessageBubble: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '100%',
  },
  fileMessageText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  addButton: {
  marginRight: 8,
  padding: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 4,
    paddingHorizontal: 4,
    maxHeight: 100,
    textAlignVertical: 'center',
  },
  textInputIOS: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  micButton: {
  marginLeft: 8,
  padding: 8,
  },
  sendButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  recordingBars: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
    height: 36,
  },
  recordingInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  recordingMicWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  recordingBar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: '#FF3B30',
  },
  recordingDot: {
    width: 3,
    borderRadius: 2,
  },
  recordingTimer: {
    minWidth: 48,
    textAlign: 'right',
    color: '#8E8E93',
    fontSize: 14,
  },
});

export default ChatConversationScreen;