import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useRef, useEffect} from 'react';
import ChatHeader from '../../../components/common/chatHeader/ChatHeader';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../../../components/common/text/Text';
import FillCallIconSvg from '../../../assests/icons/svg/chatSvgs/FillCallIconSvg';
import FillVideoCallIconSvg from '../../../assests/icons/svg/chatSvgs/FillVideoCallIconSvg';
import ReceiveMessage from './ReceiveMessage';
import SendMessage from './SendMessage';
import PhotosIconSvg from '../../../assests/icons/svg/chatSvgs/PhotosIconSvg';
import SendMessageIconSvg from '../../../assests/icons/svg/chatSvgs/SendMessageIconSvg';
import {useDispatch} from 'react-redux';
import {
  getChatMessages,
  getConnectUser,
  messageSeenUnSeen,
} from '../../../redux/actions/ChatAction';
import {socket} from '../../../../config';
import {
  CHAT_USERS_GET,
  IS_ACTIVE_USER,
  SOCKET_MESSAGE,
  UPDATE_FRIEND_MESSAGE,
} from '../../../redux/types/ActionsTypes';
import {Loader} from '../../../components/common/loader/Loader';
import {Button} from '../../../components/common/button/Button';
import ChatHook from '../../../customHooks/chatHooks/ChatHook';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import {notificationSeen} from '../../../redux/actions/NotificationAction';
export default function SingleChatMessage({navigation, route}) {
  // console.log(
  //   route?.params?.cardItems,
  //   route?.params?.chatUser,
  //   route?.params?.notificationId,
  //   'route?.params?.cardItems?????????',
  // );
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const userData = route?.params?.cardItems;

  // screen focused
  useEffect(() => {
    isFocusedChatScreen = route?.params?.chatUser;
    return () => {
      isFocusedChatScreen = '';
    };
  }, []);

  // call notification seen api
  useEffect(() => {
    if (route?.params?.notificationId) {
      let newData = {
        notificationId: route?.params?.notificationId,
      };
      dispatch(notificationSeen(newData));
    }
  }, [route?.params?.notificationId]);

  // hook
  const {
    blockUserHandler,
    blockLoading,
    blockChatUsers,
    getChatUsers,
    currentUserLoginData,
    activeUser,
    getAllMessages,
    getMessageSuccess,
    isGetSendMessages,
    isDisplayMediaInChat,
    loading,
    isLoading,
    setIsLoading,
    textMessage,
    soketMessage,
    setSocketMessage,
    setMediaUri,
    typingMessage,
    setTypingMessage,
    modalVisible,
    setModalVisible,
    pickUpMediaHandler,
    messageHandler,
    validateTextInput,
    getChatsAllUsers,
  } = ChatHook({
    navigation,
    chatUser: route?.params?.chatUser,
    cardItems: route?.params?.cardItems,
  });
  const {capitalizeFirstLetter} = CapitalizeLetter();

  useEffect(() => {
    dispatch({
      type: CHAT_USERS_GET,
      payload: {
        data: [route?.params?.cardItems],
        page: 1,
      },
    });
  }, []);

  useEffect(() => {
    if (isDisplayMediaInChat) {
      setMediaUri([]);
    }
  }, [isDisplayMediaInChat]);

  useEffect(() => {
    if (currentUserLoginData?._id) {
      socket.emit('addUser', currentUserLoginData?._id, currentUserLoginData);
    }
  }, [currentUserLoginData?._id]);

  useEffect(() => {
    socket.on('activeUsers', users => {
      dispatch({
        type: IS_ACTIVE_USER,
        payload: {
          users,
          logInUser: currentUserLoginData?._id,
        },
      });
    });
  }, [currentUserLoginData?._id]);

  useEffect(() => {
    socket.on('getUsers', users => {
      dispatch({
        type: IS_ACTIVE_USER,
        payload: {
          users,
          logInUser: currentUserLoginData?._id,
        },
      });
    });
  }, [currentUserLoginData?._id]);

  useEffect(() => {
    let userID = {
      fdId: route?.params?.chatUser,
    };
    dispatch(getConnectUser(userID));
  }, []);

  useEffect(() => {
    getChatUsers();
  }, [blockChatUsers]);

  const isUnBlockHandler = data => {
    blockUserHandler(data);
    setModalVisible(false);
  };

  useEffect(() => {
    socket.on('getMessage', data => {
      setSocketMessage(data);
    });
    socket.on('typingMessageGet', data => {
      setTypingMessage(data);
    });
  }, []);

  useEffect(() => {
    dispatch(getChatMessages(route?.params?.chatUser, setIsLoading));
  }, []);

  useEffect(() => {
    dispatch(messageSeenUnSeen(route?.params?.chatUser));
  }, []);

  // pick up media
  const onAudioCall = () => {
    let socketId = activeUser?.filter(
      u => u?.userId === route?.params?.chatUser,
    );
    // console.log(socketId, 'socket--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    let user = {...userData, socketId};
    navigation.navigate('AudioCallScreen', {
      user,
    });
  };
  const onVideoCall = () => {
    let socketId = activeUser?.filter(
      u => u?.userId === route?.params?.chatUser,
    );
    // console.log(socketId, 'socket--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    let user = {...userData, socketId};
    navigation.navigate('VideoCallScreen', {
      user,
    });
  };

  useEffect(() => {
    if (getMessageSuccess) {
      socket.emit('sendMessage', isGetSendMessages);
      dispatch({
        type: UPDATE_FRIEND_MESSAGE,
        payload: {
          msgInfo: isGetSendMessages,
        },
      });
    }
  }, [getMessageSuccess]);

  useEffect(() => {
    if (soketMessage) {
      dispatch({
        type: SOCKET_MESSAGE,
        payload: {
          message: soketMessage,
        },
      });
    }
  }, [soketMessage]);

  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ChatHeader navigation={navigation} />
      <View style={styles.headerContainer}>
        <View style={{width: '80%'}}>
          <Text
            children={
              route?.params?.cardItems?.firstName &&
              route?.params?.cardItems?.lastName
                ? `${capitalizeFirstLetter(
                    route?.params?.cardItems?.firstName,
                  )} ${capitalizeFirstLetter(
                    route?.params?.cardItems?.lastName,
                  )}`
                : ''
            }
            textColor={theme.lightColor.chatTitleColor}
            weight={theme.fontWeight.bold}
            fonts={theme.fontFamily.TinosBold}
            size={17}
          />
          {activeUser &&
          activeUser?.length > 0 &&
          activeUser?.some(u => u?.userId === route?.params?.chatUser) ? (
            <View style={styles.activeContainer}>
              <View
                style={[
                  styles.onLineCircle,
                  {backgroundColor: theme.lightColor.greenColor},
                ]}
              />

              <Text
                children={
                  typingMessage &&
                  typingMessage?.message &&
                  typingMessage?.senderId === route?.params?.chatUser
                    ? 'typing...'
                    : 'Active now'
                }
                textColor={theme.lightColor.onLineTitleColor}
                fonts={theme.fontFamily.TinosRegular}
                size={13}
                style={{marginLeft: 6}}
              />
            </View>
          ) : (
            <View style={styles.activeContainer}>
              <View
                style={[
                  styles.onLineCircle,
                  {backgroundColor: theme.lightColor.offLineColor},
                ]}></View>
              <Text
                children={'Offline'}
                textColor={theme.lightColor.onLineTitleColor}
                fonts={theme.fontFamily.TinosRegular}
                size={13}
                style={{marginLeft: 6}}
              />
            </View>
          )}
        </View>
        <View style={styles.headerIconContainer}>
          <TouchableOpacity onPress={() => onAudioCall()}>
            <FillCallIconSvg />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onVideoCall()}>
            <FillVideoCallIconSvg />
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 0.98}}>
            {isLoading ? (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Loader color={theme.lightColor.headerBg} size={40} />
              </View>
            ) : getAllMessages?.length > 0 ? (
              <FlatList
                data={getAllMessages}
                keyExtractor={item => item?._id}
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                onContentSizeChange={() =>
                  scrollViewRef.current.scrollToEnd({animated: true})
                }
                renderItem={({item, index}) => {
                  // console.log(item, 'item');
                  return (
                    <View key={index} style={{paddingHorizontal: 25}}>
                      {item?.senderId === currentUserLoginData?._id ? (
                        <SendMessage
                          key={item?._id}
                          Messages={item?.message}
                          messageItem={item}
                          navigation={navigation}
                        />
                      ) : item?.senderId === route?.params?.chatUser ? (
                        <ReceiveMessage
                          key={item?._id}
                          Messages={item?.message}
                          messageItem={item}
                          userInfo={route?.params?.cardItems}
                          navigation={navigation}
                        />
                      ) : (
                        false
                      )}
                    </View>
                  );
                }}
              />
            ) : (
              <></>
            )}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              {getChatsAllUsers?.blockedUsers?.length > 0 &&
              getChatsAllUsers?.blockedUsers?.some(
                item =>
                  item?.blockedByID?.toString() ===
                  currentUserLoginData?._id?.toString(),
              ) ? (
                <Text
                  children={'You have blocked this user.'}
                  textColor={theme.lightColor.darkGray}
                  fonts={theme.fontFamily.TinosRegular}
                  weight={theme.fontWeight.bold}
                  size={14}
                  alignText={'center'}
                  style={{paddingVertical: 8}}
                />
              ) : getChatsAllUsers?.blockedUsers?.length > 0 &&
                getChatsAllUsers?.blockedUsers?.some(
                  item =>
                    item?.blockedToID?.toString() ===
                    currentUserLoginData?._id?.toString(),
                ) ? (
                <Text
                  children={'You have been blocked by this user.'}
                  textColor={theme.lightColor.darkGray}
                  fonts={theme.fontFamily.TinosRegular}
                  weight={theme.fontWeight.bold}
                  size={14}
                  style={{paddingVertical: 8}}
                />
              ) : (
                false
              )}
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <View style={styles.textInputMainContainer}>
              <TouchableOpacity
                style={styles.iconsContainer}
                onPress={() => pickUpMediaHandler()}>
                <PhotosIconSvg height={21} width={21} />
              </TouchableOpacity>
              <TextInput
                value={textMessage}
                style={styles.textInputStyle}
                onChangeText={newText => validateTextInput(newText)}
                placeholder="Write your message here"
                placeholderTextColor={theme.lightColor.postInputPlaceholder}
                multiline={true}
              />
            </View>
            <TouchableOpacity
              onPress={() => messageHandler()}
              disabled={loading}
              style={{
                width: '12%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SendMessageIconSvg />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Modal
        style={styles.modelContainer}
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.mainContainerModel}>
          {getChatsAllUsers?.blockedUsers?.length > 0 &&
          getChatsAllUsers?.blockedUsers?.some(
            item =>
              item?.blockedByID?.toString() ===
              currentUserLoginData?._id?.toString(),
          ) ? (
            <Text
              children={`Unblock ${capitalizeFirstLetter(
                route?.params?.cardItems?.firstName,
              )} ${capitalizeFirstLetter(
                route?.params?.cardItems?.lastName,
              )} to send a message.`}
              textColor={theme.lightColor.black}
              size={14}
              fonts={theme.fontFamily.TinosBold}
              weight={theme.fontWeight.bold}
            />
          ) : (
            <Text
              children={`You have been blocked by ${capitalizeFirstLetter(
                route?.params?.cardItems?.firstName,
              )} ${capitalizeFirstLetter(
                route?.params?.cardItems?.lastName,
              )}. You cannot send a message to them.`}
              textColor={theme.lightColor.black}
              size={14}
              fonts={theme.fontFamily.TinosBold}
              weight={theme.fontWeight.bold}
            />
          )}
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              title={'Cancel'}
              titleStyles={styles.cancelBtn}
              containerStyle={{marginRight: 8}}
              onPressHandler={() => setModalVisible(false)}
            />
            {getChatsAllUsers?.blockedUsers?.length > 0 &&
            getChatsAllUsers?.blockedUsers?.some(
              item =>
                item?.blockedByID?.toString() ===
                currentUserLoginData?._id?.toString(),
            ) ? (
              <Button
                title={'Unblock'}
                titleStyles={styles.cancelBtn}
                containerStyle={{marginLeft: 8}}
                onPressHandler={() =>
                  isUnBlockHandler(route?.params?.cardItems?._id)
                }
                loading={blockLoading}
              />
            ) : (
              false
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 34,
    paddingBottom: 6,
    flexDirection: 'row',
  },
  onLineCircle: {
    height: 6,
    width: 6,
    borderRadius: 50,
  },
  activeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  headerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '20%',
  },
  textInputStyle: {
    minHeight: 48,
    // maxHeight: 48,
    width: '85%',
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 16 : null,
  },
  iconsContainer: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.21,
  },
  textInputMainContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.lightColor.postInputBg,
    backgroundColor: theme.lightColor.white,
  },
  modelContainer: {
    flex: 1,
  },
  mainContainerModel: {
    backgroundColor: theme.lightColor.white,
    width: '100%',
    height: '18%',
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    color: theme.lightColor.headerBg,
    fontSize: 14,
    fontWeight: theme.fontWeight.bold,
    fontFamily: theme.fontFamily.TinosBold,
  },
});
