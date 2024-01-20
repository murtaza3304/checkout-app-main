import {ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from '../../components/common/button/Button';
import ArrowSplash from '../../assests/icons/svg/homeSvgs/ArrowSplash';
import FocusAwareStatusBar from './FocusAwareStatusBar';
const image = require('../../assests/images/groupSplash.png');
import {theme} from '../../assests/theme/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {checkUserAlreadySignUp} from '../../redux/actions/AuthActions';
import {clearAndNavigate} from '../../../App';

export default function Splash({navigation}) {
  const dispatch = useDispatch();
  // Store Data
  const currentUserData = useSelector(
    store => store?.AuthReducers?.isUserAlreadySignUp,
  );
  // console.log(currentUserData, 'currentUserData in hook');

  // states
  const [checkToken, setCheckToken] = useState('');

  const onGetStarted = () => {
    clearAndNavigate('AuthStack');
  };

  const checkUserData = async () => {
    let user = await AsyncStorage.getItem('userDetails');
    user = JSON.parse(user);
    let newToken = user?.token;
    // console.log(newToken, 'user token from async storage');
    setCheckToken(newToken);
    dispatch(checkUserAlreadySignUp(newToken, navigation));
  };

  useEffect(() => {
    checkUserData();
    console.log("splash randared");
  }, []);
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.container}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      {/* {checkToken ? (
        false
      ) : ( */}
        <Button
          title={'Get Started'}
          renderIconRight={() => <ArrowSplash />}
          containerStyle={styles.containerStyle}
          titleStyles={styles.titleStyles}
          onPressHandler={onGetStarted}
        />
       {/* )}  */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 150,
    marginBottom: 80,
  },
  titleStyles: {
    fontSize: 14,
    fontWeight: theme.fontWeight.semiBold,
    textAlign: 'center',
    color: theme.lightColor.black,
    fontFamily: theme.fontFamily.times,
  },
});
