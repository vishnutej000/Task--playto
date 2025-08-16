import React, { useState, useRef } from 'react';
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
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type MessageType = 'text' | 'image' | 'video' | 'audio' | 'file' | 'call';
type SenderType = 'me' | 'other';

// Custom Status Bar Component
const CustomStatusBar = () => (
  <View style={statusBarStyles.statusBarFrame}>
    <View style={statusBarStyles.statusBar}>
      {/* Time */}
      <Text style={statusBarStyles.time}>9:41</Text>

      {/* Dynamic Island */}
      <View style={statusBarStyles.dynamicIslandGroup}>
        <View style={statusBarStyles.dynamicIsland}>
          <View style={statusBarStyles.lens}>
            <View style={statusBarStyles.lensInner1} />
            <View style={statusBarStyles.lensInner2} />
            <View style={statusBarStyles.lensInner3} />
            <View style={statusBarStyles.lensInner4} />
          </View>
        </View>
      </View>

      {/* Right Side Icons */}
      <View style={statusBarStyles.rightSide}>
        {/* Mobile Signal */}
        <View style={statusBarStyles.mobileSignal} />

        {/* WiFi */}
        <View style={statusBarStyles.wifi}>
          <View style={statusBarStyles.wifiPath1} />
          <View style={statusBarStyles.wifiPath2} />
          <View style={statusBarStyles.wifiPath3} />
        </View>

        {/* Battery */}
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

const statusBarStyles = StyleSheet.create({
  statusBarFrame: {
    width: '100%',
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  statusBar: {
    width: '100%',
    height: 48,
    backgroundColor: '#FDFDFD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  time: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.32,
    color: '#121212',
  },
  dynamicIslandGroup: {
    position: 'absolute',
    width: 124,
    height: 37,
    left: '50%',
    marginLeft: -62,
    bottom: -1,
  },
  dynamicIsland: {
    position: 'absolute',
    width: 124,
    height: 37,
    left: '50%',
    marginLeft: -62,
    top: 12,
    backgroundColor: '#171717',
    borderRadius: 32,
  },
  lens: {
    position: 'absolute',
    width: 11,
    height: 11,
    left: '50%',
    marginLeft: -5.5,
    top: '50%',
    marginTop: -5.5,
  },
  lensInner1: {
    position: 'absolute',
    width: 11,
    height: 11,
    backgroundColor: '#000000',
    borderRadius: 5.5,
  },
  lensInner2: {
    position: 'absolute',
    width: 9,
    height: 9,
    left: 1,
    top: 1,
    backgroundColor: '#000000',
    borderRadius: 4.5,
  },
  lensInner3: {
    position: 'absolute',
    width: 5,
    height: 2,
    left: 3,
    top: 2,
    backgroundColor: '#000000',
  },
  lensInner4: {
    position: 'absolute',
    width: 5,
    height: 3,
    left: 3,
    top: 6,
    backgroundColor: '#000000',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mobileSignal: {
    width: 17.91,
    height: 12,
    backgroundColor: '#121212',
  },
  wifi: {
    width: 16.91,
    height: 12,
    position: 'relative',
  },
  wifiPath1: {
    position: 'absolute',
    width: 16.91,
    height: 5.39,
    top: 0,
    backgroundColor: '#DADADA',
  },
  wifiPath2: {
    position: 'absolute',
    width: 11.02,
    height: 4.13,
    top: 4,
    left: 2.95,
    backgroundColor: '#DADADA',
  },
  wifiPath3: {
    position: 'absolute',
    width: 5.12,
    height: 3.83,
    top: 8,
    left: 5.9,
    backgroundColor: '#DADADA',
  },
  battery: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryOutline: {
    width: 25.26,
    height: 13,
    borderWidth: 1,
    borderColor: '#121212',
    borderRadius: 4,
    opacity: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  batteryFill: {
    width: 19.26,
    height: 9,
    backgroundColor: '#121212',
    borderRadius: 2,
  },
  batteryEnd: {
    width: 1.4,
    height: 4.22,
    backgroundColor: '#121212',
    opacity: 0.4,
    marginLeft: 1,
  },
});

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
    type: 'audio',
    content: '',
    sender: 'me',
    timestamp: '12:31 AM',
    duration: '0:12',
  },
  {
    id: '7',
    type: 'image',
    content: '',
    sender: 'me',
    timestamp: '12:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=272&h=108&fit=crop',
  },
  {
    id: '8',
    type: 'file',
    content: 'This is the file you wanted',
    sender: 'me',
    timestamp: '12:30 AM',
    fileSize: '200 kB',
    fileType: 'File type',
  },
  {
    id: '9',
    type: 'file',
    content: 'This is the file you wanted',
    sender: 'other',
    timestamp: '12:30 AM',
    fileSize: '200 kB',
    fileType: 'File type',
  },
  {
    id: '10',
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

const ChatConversationScreen = ({ navigation, route }: ChatConversationScreenProps) => {
  const [messageText, setMessageText] = useState('');
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = Dimensions.get('window');
  const scrollViewRef = useRef<ScrollView>(null);

  const isIOS = Platform.OS === 'ios';
  const responsivePadding = screenWidth < 375 ? 16 : screenWidth > 414 ? 32 : 24;
  const { chatName, avatar } = route.params || {
    chatName: 'Jonathan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, you would add the message to your state/backend here
      setMessageText('');
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';
    const messageStyles = isMe ? styles.myMessage : styles.otherMessage;
    const bubbleStyles = isMe ? styles.myBubble : styles.otherBubble;
    const textStyles = isMe ? styles.myMessageText : styles.otherMessageText;

    return (
      <View key={item.id} style={styles.messageWrapper}>
        <View style={[styles.messageContainer, messageStyles]}>
          {!isMe && (
            <Image source={{ uri: avatar }} style={styles.messageAvatar} />
          )}

          <View style={styles.messageContent}>
            <View style={[styles.messageBubble, bubbleStyles]}>
              {item.type === 'text' && (
                <Text style={textStyles}>{item.content}</Text>
              )}

              {item.type === 'image' && (
                <View>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.messageImage}
                    resizeMode="cover"
                  />
                  {item.content && (
                    <Text style={[textStyles, { marginTop: 4 }]}>
                      {item.content}
                    </Text>
                  )}
                </View>
              )}

              {item.type === 'video' && (
                <View>
                  <View style={styles.videoContainer}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.messageImage}
                      resizeMode="cover"
                    />
                    <View style={styles.videoOverlay}>
                      <Ionicons name="play" size={36} color="#FFFFFF" />
                    </View>
                    <View style={styles.videoDurationContainer}>
                      <Text style={styles.videoDuration}>{item.duration}</Text>
                    </View>
                  </View>
                  {item.content && (
                    <Text style={[textStyles, { marginTop: 4 }]}>
                      {item.content}
                    </Text>
                  )}
                </View>
              )}

              {item.type === 'audio' && (
                <View style={styles.audioContainer}>
                  <Ionicons name="play" size={24} color="#FFFFFF" />
                  <View style={styles.audioWaveform}>
                    {Array.from({ length: 24 }, (_, i) => (
                      <View
                        key={i}
                        style={[
                          styles.audioBar,
                          {
                            height: [32, 27, 23, 23, 23, 23, 27, 27, 27, 32, 32, 25, 25, 25, 18, 18, 11, 18, 23, 32, 32, 19, 15, 9][i] || 15,
                            backgroundColor: i < 3 ? '#FFFFFF' : '#84A6DB',
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>
              )}

              {item.type === 'file' && (
                <View>
                  <View style={[styles.fileContainer, isMe ? styles.myFileContainer : styles.otherFileContainer]}>
                    <Ionicons name="attach" size={20} color="#0070C9" />
                    <View style={styles.fileInfo}>
                      <Text style={styles.fileName}>File Name</Text>
                      <Text style={styles.fileDetails}>
                        {item.fileSize} | {item.fileType}
                      </Text>
                    </View>
                  </View>
                  {item.content && (
                    <Text style={[textStyles, { marginTop: 4 }]}>
                      {item.content}
                    </Text>
                  )}
                </View>
              )}

              {item.type === 'call' && (
                <View style={[styles.callContainer, isMe ? styles.myCallContainer : styles.otherCallContainer]}>
                  <Ionicons name="call" size={20} color="#0070C9" />
                  <View style={styles.callInfo}>
                    <Text style={styles.callType}>{item.content}</Text>
                    <Text style={styles.callDuration}>{item.duration}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        <Text style={[styles.timestamp, isMe ? styles.myTimestamp : styles.otherTimestamp]}>
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Custom Status Bar */}
      <CustomStatusBar />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: responsivePadding }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Ionicons name="arrow-back" size={24} color="#0070C9" />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Image
                source={{ uri: avatar }}
                style={styles.headerAvatar}
                resizeMode="cover"
              />
              <Text style={styles.headerName}>{chatName}</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="videocam" size={20} color="#0070C9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="call" size={20} color="#0070C9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="ellipsis-vertical" size={16} color="#0070C9" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={[styles.messagesContainer, { paddingHorizontal: responsivePadding }]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <TouchableOpacity style={styles.todayButton}>
            <Text style={styles.todayText}>Today</Text>
          </TouchableOpacity>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListFooterComponent={
              <TouchableOpacity style={styles.todayButton}>
                <Text style={styles.todayText}>Today</Text>
              </TouchableOpacity>
            }
          />
        </ScrollView>

        {/* Input Area */}
        <View style={[styles.inputContainer, {
          paddingHorizontal: responsivePadding,
          paddingBottom: isIOS ? insets.bottom : 12
        }]}>
          <View style={styles.inputBox}>
            <View style={styles.inputLeft}>
              <TouchableOpacity>
                <Ionicons name="add" size={20} color="#0070C9" />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder="Type message..."
                placeholderTextColor="#6B707B"
                value={messageText}
                onChangeText={setMessageText}
                multiline
                onSubmitEditing={handleSendMessage}
              />
            </View>

            <View style={styles.inputRight}>
              <TouchableOpacity>
                <Ionicons name="mic" size={20} color="#0070C9" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Ionicons
                  name="send"
                  size={16}
                  color={messageText.trim() ? "#FFFFFF" : "#CBCED2"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingTop: 100,
  },
  statusBarBackground: {
    backgroundColor: '#FDFDFD',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#FDFDFD',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEBEC',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  headerName: {
    fontFamily: 'Geist',
    fontSize: 16,
    fontWeight: '600',
    color: '#20242E',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    paddingTop: 12,
  },
  todayButton: {
    alignSelf: 'center',
    backgroundColor: '#F9FAFA',
    borderWidth: 1,
    borderColor: '#EAEBEC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  todayText: {
    fontFamily: 'Geist',
    fontSize: 12,
    color: '#20242E',
  },
  messageWrapper: {
    marginBottom: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
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
  },
  messageContent: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  myBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderTopRightRadius: 4,
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#0070C9',
    borderRadius: 16,
    borderTopLeftRadius: 4,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontFamily: 'Geist',
    fontSize: 16,
    lineHeight: 19,
  },
  myMessageText: {
    color: '#20242E',
  },
  otherMessageText: {
    color: '#FFFFFF',
  },
  messageImage: {
    width: 272,
    height: 363,
    borderRadius: 8,
  },
  videoContainer: {
    position: 'relative',
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
    borderRadius: 8,
  },
  videoDurationContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoDuration: {
    color: '#CBCED2',
    fontSize: 12,
    fontFamily: 'Geist',
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    minHeight: 48,
  },
  audioWaveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  audioBar: {
    width: 4,
    borderRadius: 12,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFA',
    borderWidth: 1,
    borderColor: '#EAEBEC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  myFileContainer: {
    backgroundColor: '#F9FAFA',
  },
  otherFileContainer: {
    backgroundColor: '#F9FAFA',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontFamily: 'Geist',
    fontSize: 15,
    color: '#20242E',
    marginBottom: 1,
    lineHeight: 18,
  },
  fileDetails: {
    fontFamily: 'Geist',
    fontSize: 11,
    color: '#6B707B',
    lineHeight: 13,
  },
  callContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFA',
    borderWidth: 1,
    borderColor: '#EAEBEC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  myCallContainer: {
    backgroundColor: '#F9FAFA',
  },
  otherCallContainer: {
    backgroundColor: '#F9FAFA',
  },
  callInfo: {
    flex: 1,
  },
  callType: {
    fontFamily: 'Geist',
    fontSize: 15,
    color: '#20242E',
    marginBottom: 1,
    lineHeight: 18,
  },
  callDuration: {
    fontFamily: 'Geist',
    fontSize: 11,
    color: '#6B707B',
    lineHeight: 13,
  },
  timestamp: {
    fontFamily: 'Geist',
    fontSize: 12,
    color: '#6B707B',
    marginTop: 4,
    textAlign: 'right',
  },
  myTimestamp: {
    alignSelf: 'flex-end',
  },
  otherTimestamp: {
    alignSelf: 'flex-end',
  },
  inputContainer: {
    paddingTop: 12,
    backgroundColor: '#FDFDFD',
    borderTopWidth: 1,
    borderTopColor: '#EAEBEC',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEBEC',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 55,
  },
  inputLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Geist',
    fontSize: 16,
    color: '#6B707B',
    paddingVertical: 8,
    paddingHorizontal: 4,
    maxHeight: 120,
  },
  inputRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sendButton: {
    backgroundColor: '#84A6DB',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default ChatConversationScreen;