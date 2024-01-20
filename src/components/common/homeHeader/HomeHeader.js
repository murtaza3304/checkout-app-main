import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {Button} from '../button/Button';
import SearchIconSvg from '../../../assests/icons/svg/bottomTabSvgs/SearchIconSvg';
import {theme} from '../../../assests/theme/Theme';
import MyProfileHook from '../../../customHooks/postsHook/MyProfileHook';
import VerifiedIconSvg from '../../../assests/icons/svg/homeSvgs/VerifiedIconSvg';

export default function HomeHeader({navigation}) {
  const onGoProfileScreen = data => {
    navigation.navigate('Profile', {
      postCardData: data,
    });
  };
  const onGoSearchScreen = () => {
    navigation.navigate('Search');
  };
  const {getUserUpdateData, updateUserData, currentUserLoginData} =
    MyProfileHook();
  // console.log(updateUserData?.user?.profilePic,"updateUserData");
  // console.log(getUserUpdateData?.profilePic,"getUserUpdateData?.profilePic ");
  // console.log(currentUserLoginData?.profilePic,"currentUserLoginData?.profilePic");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerLeft}
        onPress={() => {
          currentUserLoginData?._id
            ? onGoProfileScreen(currentUserLoginData)
            : onGoProfileScreen(getUserUpdateData?.user);
        }}>
        {updateUserData?.user?.profilePic ? (
          <Image
            source={{uri: updateUserData?.user?.profilePic}}
            resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
            style={styles.containerLeft}
          />
        ) : getUserUpdateData?.profilePic ? (
          <Image
            source={{uri: getUserUpdateData?.profilePic}}
            resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
            style={styles.containerLeft}
          />
        ) : currentUserLoginData?.profilePic ? (
          <Image
            source={{uri: currentUserLoginData?.profilePic}}
            resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
            style={styles.containerLeft}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              height: '100%',
              width: '100%',
              borderRadius: 50,
            }}>
            <Image
              source={require('../../../assests/images/userIconImage.png')}
              resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
              style={{height: 26, width: '100%'}}
            />
          </View>
        )}
        {currentUserLoginData?.identified_docs_status && (
          <View style={{position: 'absolute', top: 28, right: 1}}>
            <VerifiedIconSvg
              height={16}
              width={16}
              color={theme.lightColor.orangeColor}
            />
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.containerRight}>
        <Image
          source={require('../../../assests/images/headerLogo.png')}
          resizeMode="contain"
          style={styles.containerRight}
        />
      </View>
      <View>
        <Button
          renderIconRight={() => (
            <SearchIconSvg
              height={'18px'}
              width={'18px'}
              color={theme.lightColor.white}
            />
          )}
          containerStyle={styles.btnStyle}
          onPressHandler={onGoSearchScreen}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '14%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: theme.lightColor.headerBg,
  },
  containerLeft: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: theme.lightColor.bodyColor,
    position: 'relative',
  },
  containerRight: {
    height: 60,
    width: 160,
  },
  btnStyle: {
    backgroundColor: theme.lightColor.headerBg,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 50,
  },
});
