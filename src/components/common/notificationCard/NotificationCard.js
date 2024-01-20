import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import {Text} from '../text/Text';
import {theme} from '../../../assests/theme/Theme';
import DateTime from '../../../utils/DateTime';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import Swipeable from 'react-native-swipeable';
import DeleteIconSvg from '../../../assests/icons/svg/chatSvgs/DeleteIconSvg';
import {useDispatch} from 'react-redux';
import {notificationDelete} from '../../../redux/actions/NotificationAction';

export default function SearchCard({navigation, cardsData, index}) {
  // console.log(cardsData, 'cardData');

  const dispatch = useDispatch();
  const {getTimeAgo} = DateTime();
  const {capitalizeFirstLetter} = CapitalizeLetter();

  // on go results
  const onGoSearchResults = (data, index) => {
    if (data?.type?.toLowerCase() == 'post') {
      navigation.navigate('SearchResults', {
        cardData: {
          data: data?.post,
          index,
          notificationId: data?._id,
        },
      });
    } else if (data?.type?.toLowerCase() == 'message') {
      navigation.navigate('SingleChatMessage', {
        chatUser: data?.user?._id,
        cardItems: data?.user,
        notificationId: data?._id,
      });
    }
  };

  // delete handler
  const deleteHandler = data => {
    let newData = {
      notificationId: data?.notificationID,
    };
    dispatch(notificationDelete(newData));
  };

  const First = ID => {
    return (
      <View style={styles.swipeContainer}>
        <TouchableOpacity
          style={styles.swipeLeftIcon}
          onPress={() => deleteHandler(ID)}>
          <DeleteIconSvg />
        </TouchableOpacity>
      </View>
    );
  };
  const rightButtons = [<First notificationID={cardsData?._id} />];
  return (
    <Swipeable rightButtons={rightButtons}>
      <TouchableOpacity
        style={styles.searchCardContainer}
        onPress={() => onGoSearchResults(cardsData, index)}>
        <View style={styles.cardImgcontainer}>
          {cardsData?.sender?.profilePic ? (
            <View style={styles.defaultAvatar}>
              <Image
                source={{uri: cardsData?.sender?.profilePic}}
                resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                style={{height: '100%', width: '100%', borderRadius: 50}}
              />
            </View>
          ) : (
            <View style={styles.defaultAvatar}>
              <Image
                source={require('../../../assests/images/userIconImage.png')}
                resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                style={{height: 32, width: '100%'}}
              />
            </View>
          )}
        </View>
        <View style={styles.desContainer}>
          {cardsData?.sender?.firstName && cardsData?.sender?.lastName && (
            <Text
              children={`${capitalizeFirstLetter(
                cardsData?.sender?.firstName,
              )} ${capitalizeFirstLetter(cardsData?.sender?.lastName)}`}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              weight={theme.fontWeight.bold}
              size={17}
              lines={1}
              onPressHandler={() => onGoSearchResults(cardsData, index)}
            />
          )}
          <Text
            children={cardsData?.message}
            fonts={theme.fontFamily.TinosBold}
            textColor={theme.lightColor.darkGray}
            size={13}
            onPressHandler={() => onGoSearchResults(cardsData, index)}
          />
          <Text
            children={getTimeAgo(cardsData?.createdAt)}
            fonts={theme.fontFamily.TinosRegular}
            textColor={theme.lightColor.gray}
            size={10}
            style={{marginTop: 2}}
            onPressHandler={() => onGoSearchResults(cardsData, index)}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  searchCardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: theme.lightColor.newBodyColor,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardImgcontainer: {
    height: 55,
    width: 55,
  },
  desContainer: {
    width: '78%',
  },
  defaultAvatar: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.lightColor.gray,
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    marginLeft: 10,
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
});
