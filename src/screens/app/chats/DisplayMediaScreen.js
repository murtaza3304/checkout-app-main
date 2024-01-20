import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import CrossIconSvg from '../../../assests/icons/svg/homeSvgs/CrossIconSvg';
import {theme} from '../../../assests/theme/Theme';
import {windowHeight, windowWidth} from '../../../utils/Dimentions';
import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Loader} from '../../../components/common/loader/Loader';
import {Text} from '../../../components/common/text/Text';
import {useDispatch} from 'react-redux';
import {DISPLAY_MEDIA_CHAT} from '../../../redux/types/ActionsTypes';
import SendMessageIconSvg from '../../../assests/icons/svg/chatSvgs/SendMessageIconSvg';
import PhotosIconSvg from '../../../assests/icons/svg/chatSvgs/PhotosIconSvg';
import ChatHook from '../../../customHooks/chatHooks/ChatHook';
import SingleVideo from '../videoScreen/SingleVideo';
import {useIsFocused} from '@react-navigation/native';

export default function DisplayMediaScreen({navigation, route}) {
  // console.log(route?.params?.mediaFiles, 'route?.params?.mediaFiles');
  const dispatch = useDispatch();

  const {
    pickUpMediaHandler,
    textMessage,
    validateTextInput,
    messageHandler,
    loading,
    mediaUri,
    setMediaUri,
  } = ChatHook({
    navigation,
    chatUser: route?.params?.chatUser,
    cardItems: route?.params?.cardItems,
  });

  useEffect(() => {
    setMediaUri(route?.params?.mediaFiles);
  }, [route?.params?.mediaFiles]);

  // state
  const isFocused = useIsFocused();
  const [focusedVideo, setFocusedVideo] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  function onViewableItemsChanged({viewableItems}) {
    setFocusedIndex(viewableItems[0].index);
  }
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  // go back hander
  const goBackHandler = () => {
    dispatch({
      type: DISPLAY_MEDIA_CHAT,
      payload: true,
    });
    navigation.goBack();
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 1}}>
            <View style={{height: windowHeight}}>
              <View style={styles.headerIconContainer}>
                <TouchableOpacity onPress={() => goBackHandler()}>
                  <CrossIconSvg
                    color={theme.lightColor.white}
                    height={15}
                    width={20}
                  />
                </TouchableOpacity>
                <View style={styles.indexContainer}>
                  <Text
                    children={`${focusedIndex + 1} / ${mediaUri?.length}`}
                    textColor={theme.lightColor.white}
                    fonts={theme.fontFamily.TinosBold}
                    weight={theme.fontWeight.bold}
                    size={16}
                  />
                </View>
              </View>
              <FlatList
                data={mediaUri}
                showsVerticalScrollIndicator={false}
                horizontal={true}
                pagingEnabled={true}
                initialNumToRender={5}
                viewabilityConfigCallbackPairs={
                  viewabilityConfigCallbackPairs.current
                }
                nestedScrollEnabled={true}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                renderItem={({item, index}) => (
                  <View
                    key={index}
                    style={{
                      height: '100%',
                      width: windowWidth,
                      backgroundColor: theme.lightColor.black,
                    }}>
                    {item?.type?.toLowerCase() === 'video' ? (
                      <SingleVideo
                        focusedIndex={focusedIndex}
                        index={index}
                        isScreenFocused={isFocused}
                        videoUrl={item?.file}
                        focusedVideo={focusedVideo}
                        setFocusedVideo={setFocusedVideo}
                        localUri={true}
                      />
                    ) : (
                      <ImageZoom
                        uri={item?.file}
                        renderLoader={() => (
                          <Loader color={theme.lightColor.white} size={28} />
                        )}
                      />
                    )}
                  </View>
                )}
              />
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
                onPress={() => {
                  messageHandler();
                  navigation?.navigate('SingleChatMessage', {
                    chatUser: route?.params?.chatUser,
                    cardItems: route?.params?.cardItems,
                  });
                }}
                disabled={loading}
                style={styles.sendBtn}>
                <SendMessageIconSvg />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.black,
  },
  headerIconContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    position: 'absolute',
    top: 25,
    zIndex: 1,
    width: '100%',
  },
  indexContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
    flex: 1,
    position: 'absolute',
    bottom: 1,
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
  textInputStyle: {
    minHeight: 48,
    maxHeight: 80,
    width: '85%',
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
    paddingRight: 16,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: Platform.OS === 'ios' ? 16 : null,
  },
  sendBtn: {
    width: '12%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
