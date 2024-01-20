import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  FlatList,
  TextInput,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import HomeHeader from '../../components/common/homeHeader/HomeHeader';
import FocusAwareStatusBar from '../authStack/FocusAwareStatusBar';
import {theme} from '../../assests/theme/Theme';
import PostCard from '../../components/common/postCard/PostCard';
import {Text} from '../../components/common/text/Text';
import GetAllPostsHook from '../../customHooks/postsHook/GetAllPostsHook';
import {Loader} from '../../components/common/loader/Loader';
import {windowHeight} from '../../utils/Dimentions';
import RBSheet from 'react-native-raw-bottom-sheet';
import SendMessageIconSvg from '../../assests/icons/svg/chatSvgs/SendMessageIconSvg';
import BottomSheet from '../../components/common/bottomSheet/BottomSheet';
import DateTime from '../../utils/DateTime';
import {socket} from '../../../config';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_COMMENT_POST,
  INNER_COMMENT_LIKE,
  SOCKET_LIKES,
} from '../../redux/types/ActionsTypes';
import CommentScreen from '../../screens/app/videoScreen/CommentScreen';
import axios from 'axios';
import ShareBottomSheet from '../../components/common/bottomSheet/ShareBottomSheet';
import DeviceCountry from 'react-native-device-country';
import {Platform} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FillLikeIconSvg from '../../assests/icons/svg/homeSvgs/FillLikeIconSvg';
import RightArrowIconSvg from '../../assests/icons/svg/homeSvgs/RightArrowIconSvg';
import {addImpression} from '../../redux/actions/PostAction';
export default function Home({navigation}) {
  const dispatch = useDispatch();

  // ref
  const refRBSheet = useRef(null);
  const refRBSheetMenu = useRef(null);
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);
  const refRBShareSheet = useRef(null);

  // store data
  const feedData = useSelector(
    store => store?.PostsReducers?.isAddFeedPreferences,
  );
  const posting = useSelector(store => store?.PostsReducers?.isPosting);
  // console.log(posting, 'posting');

  // hook
  const {
    getAllPostsHandler,
    currentPostsData,
    commentHandler,
    commentText,
    setCommentText,
    currentUserLoginData,
    currentUserData,
    replyCommentID,
    setReplyCommentID,
    commentLikedHandler,
  } = GetAllPostsHook();

  // states
  const [countryGet, setCountryGet] = useState('');
  const [focusedVideo, setFocusedVideo] = useState(0);
  const isFocusedCurrentPage = useIsFocused();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [replyTo, setReplyTo] = useState('');
  const [selected, setSelected] = useState(false);
  const [selectedPostID, setSelectedPostID] = useState(false);
  const [postUserIdSelected, setPostUserIdSelected] = useState(false);
  const [editPostSelected, setEditPostSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectSharePostId, setSelectSharePostId] = useState(false);
  const [hasReachesEnd, setHasReachesEnd] = useState(false);
  const [checkPrivacyStatusPosts, setCheckPrivacyStatusPosts] = useState([]);

  // get video index
  function onViewableItemsChanged({viewableItems}) {
    setFocusedVideo(viewableItems[0]?.index);
  }
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 75,
      },
      onViewableItemsChanged,
    },
  ]);

  // get countries
  const getCurrentCountries = async () => {
    DeviceCountry?.getCountryCode()
      .then(async res => {
        // console.log('country: ', res);
        try {
          // console.log(getCountry(),"getCountry()")
          const response = await axios.get(
            `https://restcountries.com/v3.1/alpha/${res?.code}`,
          );
          // console.log(response?.data[0]?.name?.common, 'response');
          if (response?.data[0]?.name?.common) {
            setCountryGet(response?.data[0]?.name?.common);
            getAllPostsHandler(
              1,
              setLoading,
              response?.data[0]?.name?.common?.toLowerCase(),
              setHasReachesEnd,
            );
          }
        } catch (error) {
          console.log(error, 'error to find country');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // get Posts data
  useEffect(() => {
    currentPage = 1;
    setHasReachesEnd(false);
    getCurrentCountries();
  }, [feedData]);

  // fetch more posts data
  const fetchMore = () => {
    currentPage += 1;
    if (!hasReachesEnd) {
      getAllPostsHandler(
        currentPage,
        setIsLoading,
        countryGet?.toLowerCase(),
        setHasReachesEnd,
      );
    }
  };

  useEffect(() => {}, [countryGet]);

  // keyboard
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
        // console.log('keyboard open')
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    // console.log(selected)
  }, [selected]);

  useEffect(() => {
    // console.log(selectedPostID)
  }, [selectedPostID]);

  useEffect(() => {
    // console.log(postUserIdSelected)
  }, [postUserIdSelected]);

  useEffect(() => {
    // console.log(editPostSelected)
  }, [editPostSelected]);

  useEffect(() => {
    // console.log(selectSharePostId,"selectSharePostId")
  }, [selectSharePostId]);

  // navigate CreatePost screen
  const onGoCreatePostScreen = () => {
    navigation.navigate('CreatePost');
  };

  // device back handler
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true;
      } else {
        return false;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  // fillter public posts
  useEffect(() => {
    const checkPrivacyStatusPosts = currentPostsData?.filter(
      item =>
        item?.privacyStatus?.toLowerCase() === 'public' &&
        item?.sharedPrivacy?.toLowerCase() === 'public',
    );
    setCheckPrivacyStatusPosts(checkPrivacyStatusPosts);
  }, [currentPostsData]);

  // add posts impression
  useEffect(() => {
    checkPrivacyStatusPosts?.map(post => {
      if (post?.boostPost?.statusBoost === true) {
        dispatch(
          addImpression({
            boostPostId: post?.boostPost?.boostId,
          }),
        );
      }
    });
  }, [focusedVideo]);

  // time hook
  const {getCommentTimeAgo} = DateTime();

  // socket comment
  useEffect(() => {
    socket.on('connect', res => {
      // console.log('Connected to Socket.IO server-------??????????', res);
    });

    socket.on('disconnect', () => {
      // console.log('Disconnected from Socket.IO server');
    });

    socket.on('getUser', data => {
      // console.log(data, 'data all');
    });

    socket.emit('addUser', currentUserLoginData?._id);
  }, [currentUserLoginData?._id]);

  useEffect(() => {
    socket.on('arrivedComment', data => {
      // console.log('arrivedComment', data)
      dispatch({
        type: GET_COMMENT_POST,
        payload: data,
      });
    });
  }, [dispatch]);

  // socket like
  useEffect(() => {
    socket.on('arrivedLike', data => {
      // console.log('arrivedLike', data)
      dispatch({
        type: SOCKET_LIKES,
        payload: data,
      });
    });
  }, [dispatch]);

  // socket inner commit like
  useEffect(() => {
    socket.on('arrivedInnerCommentLike', data => {
      // console.log('arrivedInnerCommentLike', data)
      dispatch({
        type: INNER_COMMENT_LIKE,
        payload: data,
      });
    });
  }, [dispatch]);

  // Call the focus() method to open the keyboard
  const handleButtonPress = replyto => {
    console.log(replyTo, '=============reply to ======');
    textInputRef?.current?.focus();
    setKeyboardVisible(true);
    setReplyTo(replyto);
  };

  // sheet close
  const onGoPostLikesScreen = postID => {
    navigation?.navigate('PostLikes', {
      uniquePostID: postID,
    }),
      refRBSheet.current.close();
  };

  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <HomeHeader navigation={navigation} />
      <View style={styles.mainContainer}>
        <View style={{paddingHorizontal: 25}}>
          <TouchableOpacity
            style={styles.textInputContainer}
            onPress={onGoCreatePostScreen}>
            <Text
              children={'Create a post'}
              textColor={theme.lightColor.postInputPlaceholder}
              size={16}
              onPressHandler={onGoCreatePostScreen}
            />
          </TouchableOpacity>
          {posting && (
            <View
              style={{
                paddingHorizontal: 25,
                paddingBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                children={'Posting...'}
                textColor={theme.lightColor.black}
                fonts={theme.fontFamily.TinosBold}
                weight={theme.fontWeight.bold}
                size={14}
              />
              <Loader size={18} color={theme.lightColor.headerBg} />
            </View>
          )}
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Loader color={theme.lightColor.headerBg} size={40} />
          </View>
        ) : checkPrivacyStatusPosts?.length > 0 ? (
          <FlatList
            data={checkPrivacyStatusPosts}
            renderItem={({item, index}) => (
              <PostCard
                postsData={item}
                index={index}
                navigation={navigation}
                sheetRef={refRBSheet}
                onPress={() => setSelected(index)}
                setSelectedPostID={setSelectedPostID}
                setPostUserIdSelected={setPostUserIdSelected}
                refRBSheetMenu={refRBSheetMenu}
                refRBShareSheet={refRBShareSheet}
                setEditPostSelected={setEditPostSelected}
                setSelectSharePostId={setSelectSharePostId}
                textInputRef={textInputRef}
                focusedVideo={focusedVideo}
                setFocusedVideo={setFocusedVideo}
                isFocusedCurrentPage={isFocusedCurrentPage}
              />
            )}
            contentContainerStyle={{paddingHorizontal: 0}}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            onRefresh={() => {
              currentPage = 1;
              setHasReachesEnd(false);
              getAllPostsHandler(
                1,
                setLoading,
                countryGet?.toLowerCase(),
                setHasReachesEnd,
              );
            }}
            refreshing={loading}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            onEndReached={() => fetchMore()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              isLoading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 4,
                    backgroundColor: theme.lightColor.newBodyColor,
                  }}>
                  <Loader color={theme.lightColor.headerBg} size={26} />
                </View>
              ) : (
                false
              )
            }
          />
        ) : (
          <View style={styles.loadingContainer}>
            <Text
              children={'No results found'}
              fonts={theme.fontFamily.TinosRegular}
              textColor={theme.lightColor.darkGray}
              weight={theme.fontWeight.bold}
              size={16}
              alignText={'center'}
            />
          </View>
        )}
        <View style={{height: 57}} />
      </View>
      <RBSheet
        onClose={() => {
          setReplyTo('');
        }}
        ref={refRBSheet}
        animationType="none"
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={200}
        customStyles={{
          wrapper: {backgroundColor: 'rgba(0, 0, 0, 0.80)'},
          container: {
            height: isKeyboardVisible
              ? Platform.OS === 'ios'
                ? windowHeight * 0.53
                : windowHeight * 0.62
              : Platform.OS === 'ios'
              ? windowHeight * 0.9
              : windowHeight * 0.98,
          },
          draggableIcon: {
            backgroundColor: theme.lightColor.underLine,
            width: 80,
          },
        }}>
        <Pressable
          style={styles.likeHeader}
          onPress={() => onGoPostLikesScreen(selectedPostID)}>
          <FillLikeIconSvg height={20} width={20} />
          <Text
            children={'People who reacted'}
            size={16}
            textColor={theme.lightColor.darkGray}
            fonts={theme.fontFamily.TinosBold}
            weight={theme.fontWeight.bold}
            style={{marginLeft: 12, marginRight: 6}}
            onPressHandler={() => onGoPostLikesScreen(selectedPostID)}
          />
          <RightArrowIconSvg height={14} width={20} />
        </Pressable>
        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{
              paddingHorizontal: 30,
              width: '100%',
            }}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }>
            {checkPrivacyStatusPosts[selected]?.comments?.map(items => (
              <View key={items?._id}>
                <CommentScreen
                  key={items?._id}
                  dataItems={items}
                  replyID={items?._id}
                  commentsLikes={items?.likes}
                  userData={currentUserLoginData}
                  handleButtonPress={handleButtonPress}
                  getCommentTimeAgo={getCommentTimeAgo}
                  setReplyCommentID={setReplyCommentID}
                  commentLikeHandle={commentLikedHandler}
                  postID={selectedPostID}
                  navigation={navigation}
                  sheetRef={refRBSheet}
                />
                {items?.replyComments?.map(item => (
                  <View style={{paddingLeft: 35}} key={item?._id}>
                    <CommentScreen
                      key={item?._id}
                      dataItems={item}
                      replyID={items?._id}
                      commentsLikes={item?.likes}
                      userData={currentUserLoginData}
                      handleButtonPress={handleButtonPress}
                      getCommentTimeAgo={getCommentTimeAgo}
                      setReplyCommentID={setReplyCommentID}
                      commentLikeHandle={commentLikedHandler}
                      postID={selectedPostID}
                      navigation={navigation}
                      sheetRef={refRBSheet}
                      setReplyTo={setReplyTo}
                    />
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>

        {replyTo != '' ? (
          <Text style={{marginLeft: 25, marginBottom: 5, fontSize: 10}}>
            {' '}
            <Text style={{fontWeight: 'bold'}}> Reply to:</Text>{' '}
            <Text style={{color: '#69C3F9'}}> {replyTo}</Text>
          </Text>
        ) : null}
        <View style={styles.textInputContainerStyles}>
          <TextInput
            value={commentText}
            style={styles.textInputStyle}
            onChangeText={newText => setCommentText(newText)}
            placeholder="Write your message here"
            placeholderTextColor={theme.lightColor.postInputPlaceholder}
            ref={textInputRef}
            onBlur={() => setReplyCommentID('')}
            multiline={true}
          />
          <TouchableOpacity
            onPress={() => {
              commentHandler(selectedPostID, replyCommentID), setReplyTo('');
            }}>
            <SendMessageIconSvg />
          </TouchableOpacity>
        </View>
      </RBSheet>
      <BottomSheet
        refRBSheetMenu={refRBSheetMenu}
        loginUserId={currentUserLoginData?._id}
        postUserId={postUserIdSelected}
        alReadySignupId={currentUserData?.user?._id}
        postID={selectedPostID}
        editPostData={editPostSelected}
        navigation={navigation}
      />
      <ShareBottomSheet
        refRBShareSheet={refRBShareSheet}
        loginUser={currentUserLoginData}
        navigation={navigation}
        postID={selectSharePostId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.headerBg,
  },
  mainContainer: {
    backgroundColor: theme.lightColor.newBodyColor,
    height: '85%',
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  textInputContainer: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: theme.lightColor.postInputBg,
    backgroundColor: theme.lightColor.white,
  },
  textInputContainerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 6,
    width: '100%',
    // height: windowHeight * 0.13,
    marginBottom: windowHeight * 0.05,
  },
  textInputStyle: {
    minHeight: 48,
    width: '78%',
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: theme.lightColor.postInputBg,
    backgroundColor: theme.lightColor.postInputBorder,
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
  },
  likeHeader: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.lightColor.gray,
    paddingHorizontal: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    height: windowHeight * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
