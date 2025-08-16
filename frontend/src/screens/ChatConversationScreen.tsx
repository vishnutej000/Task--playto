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

const ChatConversationScreen = ({ navigation, route }: ChatConversationScreenProps) => {
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
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

  useEffect(() => {
    // Set status bar style
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#FFFFFF', true);
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

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';
    const maxBubbleWidth = screenWidth * 0.75;

    return (
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
                <Image
                  source={{ uri: item.imageUrl }}
                  style={[styles.messageImage, { width: Math.min(maxBubbleWidth - 24, 280) }]}
                  resizeMode="cover"
                />
                {item.content && (
                  <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText, { marginTop: 8 }]}>
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
                <View style={[styles.fileContainer, isMe ? styles.myFileContainer : styles.otherFileContainer]}>
                  <View style={styles.fileIconContainer}>
                    <Icon name="document-attach" size={20} color="#007AFF" />
                  </View>
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>File Name</Text>
                    <Text style={styles.fileDetails}>
                      {item.fileSize} | {item.fileType}
                    </Text>
                  </View>
                </View>
                {item.content && (
                  <Text style={[styles.messageText, isMe ? styles.myMessageText : styles.otherMessageText, { marginTop: 8 }]}>
                    {item.content}
                  </Text>
                )}
              </View>
            )}

            {item.type === 'call' && (
              <TouchableOpacity
                style={styles.callContainer}
                onPress={() => {
                  const type = item.content && item.content.toLowerCase().includes('voice') ? 'audio' : 'video';
                  navigation.navigate('Call', { chatName, avatar, callType: type });
                }}
              >
                <View style={styles.callIconContainer}>
                  <Icon name={item.content && item.content.toLowerCase().includes('voice') ? 'call' : 'videocam'} size={20} color="#007AFF" />
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
      behavior={isIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={isIOS ? 0 : 20}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
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
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Call', { chatName, avatar, callType: 'video' })}
            >
              <Icon name="videocam" size={22} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Call', { chatName, avatar, callType: 'audio' })}
            >
              <Icon name="call" size={22} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="ellipsis-vertical" size={18} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((item) => (
            <React.Fragment key={item.id}>
              {renderMessage({ item })}
            </React.Fragment>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={[styles.inputContainer, { paddingBottom: isIOS ? insets.bottom + 8 : 16 }]}>
          <View style={styles.inputBox}>
            <TouchableOpacity style={styles.addButton}>
              <Icon name="add" size={22} color="#007AFF" />
            </TouchableOpacity>

            <TextInput
              style={styles.textInput}
              placeholder="Type message..."
              placeholderTextColor="#999999"
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={1000}
            />

            <TouchableOpacity
              style={styles.micButton}
              onPress={toggleRecording}
            >
              <Icon
                name={isRecording ? "stop" : "mic"}
                size={20}
                color="#007AFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sendButton, { opacity: messageText.trim() ? 1 : 0.6 }]}
              onPress={handleSendMessage}
              disabled={!messageText.trim()}
            >
              <Icon name="send" size={18} color="#FFFFFF" />
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C6C6C8',
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
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 6,
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#E9E9EB',
    borderBottomLeftRadius: 6,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#000000',
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
    backgroundColor: '#34C759',
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
  addButton: {
    marginRight: 8,
    padding: 4,
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
  micButton: {
    marginLeft: 8,
    padding: 4,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ChatConversationScreen;