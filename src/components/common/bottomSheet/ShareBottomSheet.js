import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../../assests/theme/Theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Text} from '../text/Text';
import SharePrivacyDropdown from '../dropDown/SharePrivacyDropdown';
import {CommonTextInput} from '../CommonTextInput/CommonTextInput';
import {Button} from '../button/Button';
import {windowHeight} from '../../../utils/Dimentions';
import {useDispatch} from 'react-redux';
import {sharePost} from '../../../redux/actions/PostAction';
import PostShareIconSvg from '../../../assests/icons/svg/homeSvgs/PostShareIconSvg';
import Share from 'react-native-share';
import DateTime from '../../../utils/DateTime';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';

export default function ShareBottomSheet({
  refRBShareSheet,
  loginUser,
  navigation,
  postID,
}) {
  // console.log(loginUser, 'loginUser');
  // console.log(postID, 'postID');
  const dispatch = useDispatch();
  // navigation function
  const onGoProfileScreen = data => {
    refRBShareSheet.current.close();
    navigation.navigate('Profile', {
      postCardData: data,
    });
  };

  // get date and time
  const {getCurrentDateTimeISO} = DateTime();
  const {capitalizeFirstLetter} = CapitalizeLetter();

  //   states
  const [privacyStatus, setPrivacyStatus] = useState('private');
  const [privacyStatusError, setPrivacyStatusError] = useState('');
  const [postInput, setPostInput] = useState('');
  const [postInputError, setPostInputError] = useState('');
  const [loading, setLoading] = useState(false);

  // privacy status
  const validatePrivacyStatusType = e => {
    setPrivacyStatusError('');
    setPrivacyStatus(e);
  };
  // validate text
  const validatePostText = e => {
    setPostInput(e);
    if (e === '') {
      setPostInputError('');
    } else {
      setPostInputError('');
    }
  };

  // share post handler
  const sharePostHandler = () => {
    let shareData = {
      originalPostId: postID,
      caption: postInput,
      sharedPrivacy: privacyStatus,
      sharedTime: getCurrentDateTimeISO(),
    };
    dispatch(sharePost(shareData, setLoading));
    setPostInput('');
    refRBShareSheet.current.close();
  };

  // share bottom sheet
  const shareBottomSheetHandler = () => {
    const shareOptions = {
      url: 'https://example.com',
    };

    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <View style={styles.screen}>
      <RBSheet
        ref={refRBShareSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="none"
        openDuration={200}
        customStyles={{
          wrapper: {backgroundColor: 'rgba(0, 0, 0, 0.80)'},
          container: {
            height: windowHeight * 0.46,
          },
          draggableIcon: {
            backgroundColor: theme.lightColor.underLine,
            width: 80,
          },
        }}>
        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 25,
          }}>
          <View style={{width: '20%'}}>
            <TouchableOpacity
              style={{
                height: 48,
                width: 48,
                borderRadius: 45,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: loginUser?.profilePic ? 0 : 1,
              }}
              onPress={() => onGoProfileScreen(loginUser)}>
              {loginUser?.profilePic ? (
                <Image
                  source={{uri: loginUser?.profilePic}}
                  resizeMode="contain"
                  style={{height: '100%', width: '100%', borderRadius: 50}}
                />
              ) : (
                <Image
                  source={require('../../../assests/images/userIconImage.png')}
                  resizeMode="contain"
                  style={{height: 35, width: 35}}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{width: '80%'}}>
            <Text
              children={`${capitalizeFirstLetter(
                loginUser?.firstName,
              )} ${capitalizeFirstLetter(loginUser?.lastName)}`}
              fonts={theme.fontFamily.TinosBold}
              weight={theme.fontWeight.bold}
              textColor={theme.lightColor.black}
              size={15}
              onPressHandler={() => onGoProfileScreen(loginUser)}
            />
            <SharePrivacyDropdown
              privacyStatus={validatePrivacyStatusType}
              privacyStatusValue={privacyStatus}
            />
            {privacyStatusError ? (
              <Text
                children={privacyStatusError ? privacyStatusError : false}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.red}
                size={10}
                style={{marginLeft: 24}}
              />
            ) : (
              false
            )}
          </View>
        </View>
        {/* TextInput */}
        <View style={{paddingHorizontal: 25, marginTop: 28}}>
          <View style={styles.contentInputContainer}>
            <CommonTextInput
              Value={postInput}
              inputStyle={[
                styles.HeaderTextInputStyle,
                {paddingBottom: postInput ? 0 : 60},
              ]}
              onChangeHandler={e => validatePostText(e)}
              placeHoldertext={`Say something about this...`}
              placeholderColor={theme.lightColor.postInputPlaceholder}
              multilineText={true}
            />
          </View>
        </View>
        {postInputError ? (
          <Text
            children={postInputError ? postInputError : false}
            fonts={theme.fontFamily.TinosRegular}
            textColor={theme.lightColor.red}
            size={10}
            style={{marginTop: 10}}
          />
        ) : (
          false
        )}
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingHorizontal: 25,
            marginTop: 23,
          }}>
          <Button
            title={'Share now'}
            titleStyles={styles.btnTitleStyles}
            containerStyle={styles.btnContainerStyle}
            onPressHandler={sharePostHandler}
            loading={loading}
          />
        </View>
        {/* <TouchableOpacity
          style={styles.shareMoreContainer}
          onPress={() => shareBottomSheetHandler()}>
          <PostShareIconSvg height={20} width={20} />
          <Text
            children={'More options...'}
            fonts={theme.fontFamily.TinosRegular}
            textColor={theme.lightColor.darkGray}
            size={16}
            style={{marginLeft: 12}}
          />
        </TouchableOpacity> */}
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentInputContainer: {
    borderColor: theme.lightColor.headerBg,
    borderRadius: 6,
    borderWidth: 1,
    height: 120,
    width: '100%',
    backgroundColor: theme.lightColor.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingBottom: 6,
  },
  HeaderTextInputStyle: {
    width: '100%',
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
    paddingHorizontal: 20,
  },
  btnTitleStyles: {
    color: theme.lightColor.white,
    fontFamily: theme.fontFamily.TinosBold,
    fontWeight: theme.fontWeight.bold,
    fontSize: 16,
  },
  btnContainerStyle: {
    backgroundColor: theme.lightColor.headerBg,
    height: 42,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  shareMoreContainer: {
    paddingHorizontal: 25,
    paddingVertical: 14,
    flexDirection: 'row',
  },
});
