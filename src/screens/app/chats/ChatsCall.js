import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../../../components/common/text/Text';
import CallReceviedIconSvg from '../../../assests/icons/svg/chatSvgs/CallReceviedIconSvg';
import VideoCallIconSvg from '../../../assests/icons/svg/chatSvgs/VideoCallIconSvg';
import AudioCallIconSvg from '../../../assests/icons/svg/chatSvgs/AudioCallIconSvg';
import MissedCallIconSvg from '../../../assests/icons/svg/chatSvgs/MissedCallIconSvg';
import DeleteIconSvg from '../../../assests/icons/svg/chatSvgs/DeleteIconSvg';
import Swipeable from 'react-native-swipeable';
import CommonToast from '../../../components/common/toasts/CommonToast';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import {useDispatch} from 'react-redux';
const {showToast} = CommonToast();
import {BASE_URL} from '../../../../config';
import {deleteCallUser} from '../../../redux/actions/ChatAction';
export default function ChatsCall({activeUser, item, index, navigation}) {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  // delete call handler
  const deleteCallHandler = data => {
    let newData = {fdId: data?.userID};
    dispatch(deleteCallUser(newData, setIsloading));
  };
  // console.log('------>>>>> is accepted', item?.lastCallId?.isAccept);
  const onAudioCall = user => {
    navigation.navigate('AudioCallScreen', {user});
  };
  const onVideoCall = user => {
    navigation.navigate('VideoCallScreen', {user});
  };
  const socketId = activeUser.filter(u => u.userId == item._id);
  const {capitalizeFirstLetter} = CapitalizeLetter();

  const First = userID => {
    return (
      <View style={styles.swipeContainer}>
        <TouchableOpacity
          style={styles.swipeLeftIcon}
          onPress={() => deleteCallHandler(userID)}
          disabled={isLoading}>
          <DeleteIconSvg />
        </TouchableOpacity>
      </View>
    );
  };
  const rightButtons = [<First userID={item?._id} />];
  // console.log(users, '=========>>>');
  return (
    item?.lastCallId && (
      <Swipeable rightButtons={rightButtons}>
        <View style={{marginHorizontal: 25}}>
          <View key={index} style={styles.container}>
            <View style={styles.imageContainer}>
              <View>
                {item?.profilePic ? (
                  <Image
                    source={{uri: item?.profilePic}}
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
              <View
                style={[
                  styles.onlineIndicator,
                  {
                    backgroundColor:
                      activeUser &&
                      activeUser?.length > 0 &&
                      activeUser?.some(u => u?.userId === item?._id)
                        ? theme.lightColor.greenColor
                        : theme.lightColor.yellowColor,
                  },
                ]}></View>
            </View>
            <View style={styles.titleContainer}>
              <Text
                children={
                  item?.firstName && item.lastName
                    ? `${capitalizeFirstLetter(
                        item?.firstName,
                      )} ${capitalizeFirstLetter(item.lastName)}`
                    : ''
                }
                fonts={theme.fontFamily.TinosBold}
                lines={1}
                size={16}
                textColor={theme.lightColor.chatTitleColor}
              />
              {item?.lastCallId && (
                <View style={styles.middleContainer}>
                  {item?.lastCallId?.isAccept == false ? (
                    <MissedCallIconSvg />
                  ) : (
                    <CallReceviedIconSvg />
                  )}
                  <Text
                    children={item?.lastCallId?.callTime}
                    fonts={theme.fontFamily.TinosRegular}
                    size={13}
                    textColor={theme.lightColor.gray}
                    style={{marginLeft: 8, paddingBottom: 2.5}}
                  />
                </View>
              )}
            </View>
            <View style={styles.lastContainer}>
              <TouchableOpacity
                onPress={() => onVideoCall({...item, socketId})}
                style={{
                  marginRight: 10,
                  // backgroundColor: 'green',
                  // padding: 4,
                }}>
                <View style={{padding: 4, justifyContent: 'center'}}>
                  <VideoCallIconSvg />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{backgroundColor: 'transparent'}}
                onPress={() =>
                  onAudioCall({
                    ...item,
                    socketId,
                  })
                }>
                <View style={{padding: 4}}>
                  <AudioCallIconSvg />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Swipeable>
    )
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
  titleContainer: {
    marginLeft: 18,
    width: '50%',
    paddingRight: 10,
  },
  middleContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    backgroundColor: theme.lightColor.greenColor,
    borderRadius: 50,
    position: 'absolute',
    top: 38,
    right: 0,
    zIndex: 1,
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '90%',
  },
  swipeLeftIcon: {
    backgroundColor: theme.lightColor.red,
    height: 25,
    width: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
  },
  defaultAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
});
