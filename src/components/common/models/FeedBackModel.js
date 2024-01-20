import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import FeedBackIconSvg from '../../../assests/icons/svg/homeSvgs/FeedBackIconSvg';
import {theme} from '../../../assests/theme/Theme';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import {Text} from '../text/Text';
import RadioButton from '../radioButton/RadioButton';
import {Button} from '../button/Button';
import UseProfileBUserModelHooks from '../../customHooks/UseProfileBUserModelHooks';

export default function FeedBackModel({
  navigation,
  reportUserId,
  loginUserId,
  alreadySignupId,
}) {
  // states
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    isFocusedOne,
    isFocusedTwo,
    isFocusedThree,
    isFocusedFour,
    isFocusedFive,
    isFocusedSix,
    isFocusedSeven,
    isFocusedEight,
  } = UseProfileBUserModelHooks();

  // spam user
  const spamUserHandler = () => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'user',
        heading: 'Spam',
        reportedUser: reportUserId,
        reporterId: loginUserId || alreadySignupId,
      },
    });
    setModalVisible(false);
  };

  // adult content
  const adultContentHandler = () => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'user',
        heading: 'Adult content',
        reportedUser: reportUserId,
        reporterId: loginUserId || alreadySignupId,
      },
    });
    setModalVisible(false);
  };

  // Fraud/Scam
  const fraudScamHandler = () => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'user',
        heading: 'Fraud/Scam',
        reportedUser: reportUserId,
        reporterId: loginUserId || alreadySignupId,
      },
    });
    setModalVisible(false);
  };

  // Harmful
  const HarmfulHandler = () => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'user',
        heading: 'Harmful or illegal',
        reportedUser: reportUserId,
        reporterId: loginUserId || alreadySignupId,
      },
    });
    setModalVisible(false);
  };

  // Imminent
  const ImminentHandler = () => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'user',
        heading: 'Imminent physical harm',
        reportedUser: reportUserId,
        reporterId: loginUserId || alreadySignupId,
      },
    });
    setModalVisible(false);
  };

  // Infringes
  const InfringesHandler = () => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'user',
        heading: 'Infringes my rights',
        reportedUser: reportUserId,
        reporterId: loginUserId || alreadySignupId,
      },
    });
    setModalVisible(false);
  };

  // Misinformation
  const MisinformationHandler = () => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'user',
        heading: 'Misinformation and Disinformation',
        reportedUser: reportUserId,
        reporterId: loginUserId || alreadySignupId,
      },
    });
    setModalVisible(false);
  };

  // Other
  const OtherHandler = () => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'user',
        heading: 'Other',
        reportedUser: reportUserId,
        reporterId: loginUserId || alreadySignupId,
      },
    });
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.feedBackIconContainer}
        onPress={() => setModalVisible(true)}>
        <FeedBackIconSvg height={12} width={12} />
      </TouchableOpacity>
      <Modal
        style={styles.modelContainer}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.mainContainer}>
          <Text
            children={'Report Comment'}
            fonts={theme.fontFamily.TinosBold}
            textColor={theme.lightColor.darkGray}
            size={18}
            alignText={'center'}
            style={{marginBottom: 12, marginTop: 5}}
          />
          <Text
            children={
              "Please review our Community Guidelines for additional information about what is and isn't permitted on Checkout"
            }
            fonts={theme.fontFamily.TinosRegular}
            textColor={theme.lightColor.gray}
            size={13}
            alignText={'center'}
          />
          <View style={[styles.singleCategoryContainer, {marginTop: 35}]}>
            <RadioButton
              isFocusedColor={isFocusedOne}
              onPressHandler={spamUserHandler}
            />
            <Text
              children={'Spam'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={14}
              style={{marginLeft: 10}}
              onPressHandler={spamUserHandler}
            />
          </View>
          <View style={[styles.singleCategoryContainer, {marginTop: 12}]}>
            <RadioButton
              isFocusedColor={isFocusedTwo}
              onPressHandler={adultContentHandler}
            />
            <Text
              children={'Adult content'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={14}
              style={{marginLeft: 10}}
              onPressHandler={adultContentHandler}
            />
          </View>
          <View style={[styles.singleCategoryContainer, {marginTop: 12}]}>
            <RadioButton
              isFocusedColor={isFocusedThree}
              onPressHandler={fraudScamHandler}
            />
            <Text
              children={'Fraud/Scam'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={14}
              style={{marginLeft: 10}}
              onPressHandler={fraudScamHandler}
            />
          </View>
          <View style={[styles.singleCategoryContainer, {marginTop: 12}]}>
            <RadioButton
              isFocusedColor={isFocusedFour}
              onPressHandler={HarmfulHandler}
            />
            <Text
              children={'Harmful or illegal'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={14}
              style={{marginLeft: 10}}
              onPressHandler={HarmfulHandler}
            />
          </View>
          <View style={[styles.singleCategoryContainer, {marginTop: 12}]}>
            <RadioButton
              isFocusedColor={isFocusedFive}
              onPressHandler={ImminentHandler}
            />
            <Text
              children={'Imminent physical harm'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={14}
              style={{marginLeft: 10}}
              onPressHandler={ImminentHandler}
            />
          </View>
          <View style={[styles.singleCategoryContainer, {marginTop: 12}]}>
            <RadioButton
              isFocusedColor={isFocusedSix}
              onPressHandler={InfringesHandler}
            />
            <Text
              children={'Infringes my rights'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={14}
              style={{marginLeft: 10}}
              onPressHandler={InfringesHandler}
            />
          </View>
          <View style={[styles.singleCategoryContainer, {marginTop: 12}]}>
            <RadioButton
              isFocusedColor={isFocusedSeven}
              onPressHandler={MisinformationHandler}
            />
            <Text
              children={'Misinformation and Disinformation'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={14}
              style={{marginLeft: 10}}
              onPressHandler={MisinformationHandler}
            />
          </View>
          <View style={[styles.singleCategoryContainer, {marginTop: 12}]}>
            <RadioButton
              isFocusedColor={isFocusedEight}
              onPressHandler={OtherHandler}
            />
            <Text
              children={'Other'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              size={14}
              style={{marginLeft: 10}}
              onPressHandler={OtherHandler}
            />
          </View>
          <View style={styles.btnMainContainer}>
            <Button
              title={'Cancel'}
              containerStyle={styles.btnCencelContainer}
              titleStyles={styles.titleCencelStyle}
              linearGradient={true}
              onPressHandler={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  feedBackIconContainer: {
    height: 22,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  modelContainer: {
    flex: 1,
    paddingHorizontal: 14,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: theme.lightColor.bodyColor,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 45,
  },
  singleCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnMainContainer: {
    marginTop: 35,
  },
  btnCencelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    borderRadius: 8,
  },
  titleCencelStyle: {
    color: theme.lightColor.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
    fontWeight: theme.fontWeight.normal,
  },
});
