import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import React from 'react';
import Swipeable from 'react-native-swipeable';
import DeleteIconSvg from '../../../assests/icons/svg/chatSvgs/DeleteIconSvg';
import BlockIconSvg from '../../../assests/icons/svg/chatSvgs/BlockIconSvg';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../../../components/common/text/Text';
import ChatHook from '../../../customHooks/chatHooks/ChatHook';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import UTC_Time from '../../../utils/UTC_Time';

export default function ChatCard({navigation, cardItems, activeUser}) {
  // hook
  const {
    deleteChatHandler,
    isLoading,
    blockUserHandler,
    blockLoading,
    currentUserLoginData,
  } = ChatHook({navigation});
  const {capitalizeFirstLetter} = CapitalizeLetter();
  const {convertUTC_Time} = UTC_Time();
  const First = userID => {
    return (
      <View style={styles.swipeContainer}>
        <TouchableOpacity
          style={styles.swipeLeftIcon}
          disabled={isLoading}
          onPress={() => deleteChatHandler(userID)}>
          <DeleteIconSvg />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.swipeRightIcon}
          onPress={() => blockUserHandler(userID)}
          disabled={blockLoading}>
          <BlockIconSvg />
        </TouchableOpacity>
      </View>
    );
  };
  const rightButtons = [<First userID={cardItems?._id} />];

  // onGetSingleChatMessageScreen
  const onGetSingleChatMessageScreen = data => {
    navigation.navigate('SingleChatMessage', {
      chatUser: data?._id,
      cardItems: data,
      notificationId: '',
    });
  };
  // console.log(cardItems, 'cardItems');
  return (
    <Swipeable rightButtons={rightButtons}>
      <View style={{marginHorizontal: 25}}>
        <Pressable
          style={styles.container}
          onPress={() => onGetSingleChatMessageScreen(cardItems)}>
          <View style={styles.imageContainer}>
            <View>
              {cardItems?.profilePic ? (
                <Image
                  source={{uri: cardItems?.profilePic}}
                  resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                  style={styles.imageStyle}
                />
              ) : (
                <View style={styles.defaultAvatar}>
                  <Image
                    source={require('../../../assests/images/userIconImage.png')}
                    resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                    style={{height: 40, width: 40}}
                  />
                </View>
              )}
            </View>
            {activeUser &&
            activeUser?.length > 0 &&
            activeUser?.some(u => u?.userId === cardItems?._id) ? (
              <View style={styles.IndicatorContainer}>
                <View style={styles.onlineIndicator}></View>
              </View>
            ) : (
              <View style={styles.IndicatorContainer}>
                <View
                  style={[
                    styles.onlineIndicator,
                    {backgroundColor: theme.lightColor.offLineColor},
                  ]}></View>
              </View>
            )}
          </View>
          <View
            style={{
              width: '76%',
              flexDirection: 'row',
            }}>
            <View style={{width: '75%'}}>
              <Text
                children={
                  cardItems?.firstName && cardItems?.lastName
                    ? `${capitalizeFirstLetter(
                        cardItems?.firstName,
                      )} ${capitalizeFirstLetter(cardItems?.lastName)}`
                    : ''
                }
                fonts={theme.fontFamily.TinosBold}
                weight={theme.fontWeight.bold}
                size={16}
                textColor={theme.lightColor.chatTitleColor}
                onPressHandler={() => onGetSingleChatMessageScreen(cardItems)}
              />
              {cardItems?.blockedUsers &&
              cardItems?.blockedUsers?.length > 0 &&
              cardItems?.blockedUsers?.some(
                item =>
                  item?.blockedByID === currentUserLoginData?._id?.toString(),
              ) ? (
                <Text
                  children={'You have blocked this user.'}
                  fonts={theme.fontFamily.TinosRegular}
                  size={13}
                  lines={1}
                  textColor={theme.lightColor.gray}
                  onPressHandler={() => onGetSingleChatMessageScreen(cardItems)}
                />
              ) : cardItems?.blockedUsers?.some(
                  item =>
                    item?.blockedToID === currentUserLoginData?._id?.toString(),
                ) ? (
                <Text
                  children={'You have been blocked by this user.'}
                  fonts={theme.fontFamily.TinosRegular}
                  size={13}
                  lines={1}
                  textColor={theme.lightColor.gray}
                  onPressHandler={() => onGetSingleChatMessageScreen(cardItems)}
                />
              ) : (
                <Text
                  children={
                    cardItems?.lastMessageId
                      ? cardItems?.lastMessageId?.deleteMessage?.length > 0
                        ? cardItems?.lastMessageId?.deleteMessage?.find(
                            item => {
                              item?.deleteByUser === currentUserLoginData?._id;
                              return '';
                            },
                          )
                        : cardItems?.lastMessageId?.message?.text
                        ? cardItems?.lastMessageId?.message?.text
                        : cardItems?.lastMessageId?.message?.file.length > 0
                        ? cardItems?.lastMessageId?.message?.file[0]?.type
                        : ''
                      : ''
                  }
                  fonts={theme.fontFamily.TinosRegular}
                  size={13}
                  textColor={theme.lightColor.gray}
                  lines={1}
                  onPressHandler={() => onGetSingleChatMessageScreen(cardItems)}
                />
              )}
            </View>
            <View style={styles.timeContainer}>
              <Text
                children={
                  cardItems?.lastMessageId?.messageTime
                    ? convertUTC_Time(cardItems?.lastMessageId?.messageTime)
                    : ''
                }
                fonts={theme.fontFamily.TinosRegular}
                size={10}
                textColor={theme.lightColor.chatTimeColor}
                onPressHandler={() => onGetSingleChatMessageScreen(cardItems)}
              />
              {cardItems?.receiveMessages === 0 ? (
                false
              ) : (
                <View style={styles.batchContainer}>
                  <Text
                    children={
                      cardItems?.receiveMessages
                        ? cardItems?.receiveMessages
                        : ''
                    }
                    fonts={theme.fontFamily.TinosRegular}
                    size={9}
                    textColor={theme.lightColor.white}
                    onPressHandler={() =>
                      onGetSingleChatMessageScreen(cardItems)
                    }
                  />
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.lightColor.white,
    paddingHorizontal: 16,
    height: 80,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    width: '100%',
    marginBottom: 16,
  },
  imageContainer: {
    height: 55,
    width: 55,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.lightColor.gray,
    position: 'relative',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '90%',
  },
  swipeLeftIcon: {
    backgroundColor: theme.lightColor.headerBg,
    height: 25,
    width: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
  },
  swipeRightIcon: {
    backgroundColor: theme.lightColor.headerBg,
    height: 25,
    width: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 15,
  },
  IndicatorContainer: {
    position: 'absolute',
    top: 38,
    right: 0,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    backgroundColor: theme.lightColor.greenColor,
    borderRadius: 50,
  },
  defaultAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  timeContainer: {
    width: '25%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  batchContainer: {
    backgroundColor: theme.lightColor.headerBg,
    minHeight: 18,
    minWidth: 18,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
