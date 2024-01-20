import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import ProfileHeader from '../../../components/common/profileHeader/ProfileHeader';
import {theme} from '../../../assests/theme/Theme';
import UploadIconSvg from '../../../assests/icons/svg/homeSvgs/UploadIconSvg';
import {Text} from '../../../components/common/text/Text';
import {Button} from '../../../components/common/button/Button';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {verifyIdentification} from '../../../redux/actions/UpdateUserAction';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';

export default function ATypeUserVaildCard({navigation}) {
  const dispatch = useDispatch();
  const currentUserLoginData = useSelector(store => store?.AuthReducers?.user);
  const getAllUpdatedUserData = useSelector(
    store => store?.UpdateUserReducer?.updateUser,
  );
  const [imageUri, setImageUri] = useState('');
  const [selectImageError, setSelectImageError] = useState('');
  const [imageSizeError, setImageSizeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [
    onVerifyIdentificationHandlerError,
    setOnVerifyIdentificationHandlerError,
  ] = useState('');

  // pick up image
  const pickUpImageHandler = async () => {
    try {
      setImageUri('');
      setSelectImageError('');
      setImageSizeError('');
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker?.types?.images],
      });
      console.log(doc, 'result image');
      if (doc) {
        if (doc?.size <= 10534243) {
          setImageUri(doc?.uri);
        } else {
          setImageSizeError('File size upto 10MB!');
        }
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        setSelectImageError('*Requird!');
        // console.log("user cencel the upload image", error);
      } else {
        console.log(error);
      }
    }
  };

  // onVerifyIdentificationHandler
  const onVerifyIdentificationHandler = () => {
    if (!imageUri) {
      setSelectImageError('*Requird!');
      return;
    } else {
      if (imageUri && !selectImageError && !imageSizeError) {
        RNFS.readFile(imageUri, 'base64')
          .then(res => {
            // console.log(res, "image response");
            if (res) {
              dispatch(
                verifyIdentification(
                  {
                    file: res,
                  },
                  setLoading,
                  navigation,
                  setOnVerifyIdentificationHandlerError,
                ),
              );
            }
          })
          .catch(err => {
            console.log(err, 'err image');
          });
      }
    }
    setImageUri('');
  };

  // to convert capital letter
  const {capitalizeFirstLetter} = CapitalizeLetter();

  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ProfileHeader
        navigation={navigation}
        profileHeadingTxt={
          getAllUpdatedUserData?.user?.firstName &&
          getAllUpdatedUserData?.user?.lastName
            ? `${capitalizeFirstLetter(
                getAllUpdatedUserData?.user?.firstName,
              )} ${capitalizeFirstLetter(
                getAllUpdatedUserData?.user?.lastName,
              )}`
            : currentUserLoginData?.firstName && currentUserLoginData?.lastName
            ? `${capitalizeFirstLetter(
                currentUserLoginData?.firstName,
              )} ${capitalizeFirstLetter(currentUserLoginData?.lastName)}`
            : false
        }
        profileSecondHeadingTxt={
          currentUserLoginData?.accountType
            ? capitalizeFirstLetter(currentUserLoginData?.accountType)
            : ''
        }
        imageUri={
          getAllUpdatedUserData?.user?.profilePic
            ? getAllUpdatedUserData?.user?.profilePic
            : currentUserLoginData?.profilePic
            ? currentUserLoginData?.profilePic
            : ''
        }
        userCountry={
          currentUserLoginData?.country
            ? `${capitalizeFirstLetter(currentUserLoginData?.country)}`
            : ''
        }
        isVerifiedStatus={
          currentUserLoginData?.identified_docs_status
            ? `${currentUserLoginData?.identified_docs_status}`
            : false
        }
        ratingValue={currentUserLoginData?.ratingStartValue}
      />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={pickUpImageHandler}>
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                resizeMode="cover"
                style={{height: 50, width: 70}}
              />
            ) : (
              <UploadIconSvg />
            )}
            <Text
              children={'Upload Valid Identification Card'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={15}
              style={{marginBottom: 5, marginTop: 25}}
              onPressHandler={pickUpImageHandler}
            />
            <Text
              children={`Driver's license, Passport or Government Issued ID`}
              fonts={theme.fontFamily.TinosRegular}
              textColor={theme.lightColor.gray}
              size={11}
              style={{marginBottom: 5}}
              onPressHandler={pickUpImageHandler}
            />
            {selectImageError ? (
              <Text
                children={selectImageError ? selectImageError : false}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.red}
                size={10}
              />
            ) : (
              false
            )}
            {imageSizeError ? (
              <Text
                children={imageSizeError ? imageSizeError : false}
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.red}
                size={10}
              />
            ) : (
              false
            )}
          </TouchableOpacity>

          <View style={styles.btnContainer}>
            {onVerifyIdentificationHandlerError ? (
              <Text
                children={
                  onVerifyIdentificationHandlerError
                    ? onVerifyIdentificationHandlerError
                    : false
                }
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.red}
                size={10}
                alignText={'center'}
                style={{marginBottom: 4}}
              />
            ) : (
              false
            )}
            <Button
              title={'Save'}
              onPressHandler={onVerifyIdentificationHandler}
              titleStyles={styles.titleStyles}
              containerStyle={styles.containerStyle}
              linearGradient={true}
              loading={loading}
            />
            <View style={{height: 20}} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  mainContainer: {
    flex: 1,
    marginTop: '35%',
  },
  cardContainer: {
    backgroundColor:
      Platform.OS === 'android'
        ? theme.lightColor.white
        : theme.lightColor.white,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 25,
    marginHorizontal: 35,
    marginVertical: 25,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
  },
  titleStyles: {
    color: theme.lightColor.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
    fontWeight: theme.fontWeight.normal,
  },
  containerStyle: {
    backgroundColor: theme?.lightColor?.linearRed,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    width: '100%',
    borderRadius: 8,
  },
  btnContainer: {
    paddingHorizontal: 25,
    marginTop: 50,
  },
});
