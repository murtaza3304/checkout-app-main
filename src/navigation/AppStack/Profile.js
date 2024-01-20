import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import FocusAwareStatusBar from '../authStack/FocusAwareStatusBar';
import ProfileHeader from '../../components/common/profileHeader/ProfileHeader';
import {theme} from '../../assests/theme/Theme';
import {Button} from '../../components/common/button/Button';
import PostCard from '../../components/common/postCard/PostCard';
import MyProfileHook from '../../customHooks/postsHook/MyProfileHook';
import {Loader} from '../../components/common/loader/Loader';
import {Text} from '../../components/common/text/Text';
import RBSheet from 'react-native-raw-bottom-sheet';
import SendMessageIconSvg from '../../assests/icons/svg/chatSvgs/SendMessageIconSvg';
import GetAllPostsHook from '../../customHooks/postsHook/GetAllPostsHook';
import BottomSheet from '../../components/common/bottomSheet/BottomSheet';
import {windowHeight} from '../../utils/Dimentions';
import DateTime from '../../utils/DateTime';
import CommentScreen from '../../screens/app/videoScreen/CommentScreen';
import ShareBottomSheet from '../../components/common/bottomSheet/ShareBottomSheet';
import {useIsFocused} from '@react-navigation/native';
import CapitalizeLetter from '../../utils/CapitalizeLetter';
import FillLikeIconSvg from '../../assests/icons/svg/homeSvgs/FillLikeIconSvg';
import RightArrowIconSvg from '../../assests/icons/svg/homeSvgs/RightArrowIconSvg';

export default function Profile({navigation, route}) {
  // console.log(route?.params?.postCardData, "navigation post data");

  // ref
  const refRBSheet = useRef(null);
  const refRBSheetMenu = useRef(null);
  const textInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const refRBShareSheet = useRef(null);

  // hooks
  const {
    currentUserLoginData,
    getAllMyPostsHandler,
    loading,
    currentPostsData,
    getMyBookMarkHandler,
    isGetUserProfileBookmarksData,
    getUserUpdateData,
    updateUserData,
    handleRefreshUserPosts,
    refreshing,
    fetchMoreUserPosts,
    footerLoading,
    handleRefreshSavePosts,
    fetchMoreSavePosts,
  } = MyProfileHook();

  const {
    commentHandler,
    commentText,
    setCommentText,
    replyCommentID,
    setReplyCommentID,
    commentLikedHandler,
  } = GetAllPostsHook();

  // states
  const isFocusedCurrentPage = useIsFocused();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedPostID, setSelectedPostID] = useState(false);
  const [postUserIdSelected, setPostUserIdSelected] = useState(false);
  const [editPostSelected, setEditPostSelected] = useState(false);
  const [selectSharePostId, setSelectSharePostId] = useState(false);
  const [focusedVideo, setFocusedVideo] = useState(0);
  const [btnFocused, setBtnFocused] = useState(true);
  const [btnHover, setBtnHover] = useState(false);
  const [userPostsData, setUserPostsData] = useState([]);
  const [bookMarkedData, setBookMarkedData] = useState([]);

  // get data
  useEffect(() => {
    getAllMyPostsHandler(route?.params?.postCardData?._id);
  }, []);

  useEffect(() => {
    getMyBookMarkHandler();
  }, []);

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

  // bookmark filteration
  useEffect(() => {
    let bookMarkedData = [];
    isGetUserProfileBookmarksData?.map(post => {
      const isPostAlreadyAdded = post?.bookmarks?.some(
        item => item === currentUserLoginData?._id,
      );
      if (isPostAlreadyAdded) {
        bookMarkedData?.push(post);
      }
    });
    setBookMarkedData(bookMarkedData);
  }, [isGetUserProfileBookmarksData]);

  // user posts filteration
  useEffect(() => {
    let userPostsData = currentPostsData?.filter(
      post => post?.author?._id === route?.params?.postCardData?._id,
    );
    setUserPostsData(userPostsData);
  }, [currentPostsData]);

  // collaps button
  const istFocusedHandler = () => {
    setBtnFocused(true);
    setBtnHover(false);
  };
  const secFocusedHandler = () => {
    setBtnFocused(false);
    setBtnHover(true);
  };

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

  // to convert time
  const {getCommentTimeAgo} = DateTime();

  // to convert capital letter
  const {capitalizeFirstLetter} = CapitalizeLetter();

  // Call the focus() method to open the keyboard
  const handleButtonPress = () => {
    textInputRef?.current?.focus();
    setKeyboardVisible(true);
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
      <ProfileHeader
        navigation={navigation}
        settingRenderIcon={true}
        profileHeadingTxt={
          updateUserData?.user?._id === route?.params?.postCardData?._id
            ? `${capitalizeFirstLetter(
                updateUserData?.user?.firstName,
              )} ${capitalizeFirstLetter(updateUserData?.user?.lastName)}`
            : route?.params?.postCardData
            ? `${capitalizeFirstLetter(
                route?.params?.postCardData?.firstName,
              )} ${capitalizeFirstLetter(
                route?.params?.postCardData?.lastName,
              )}`
            : ''
        }
        profileSecondHeadingTxt={
          route?.params?.postCardData?.accountType
            ? `${capitalizeFirstLetter(
                route?.params?.postCardData?.accountType,
              )}`
            : ''
        }
        imageUri={
          updateUserData?.user?._id === route?.params?.postCardData?._id
            ? updateUserData?.user?.profilePic
            : route?.params?.postCardData?.profilePic
            ? route?.params?.postCardData?.profilePic
            : ''
        }
        userCountry={
          route?.params?.postCardData?.country
            ? `${capitalizeFirstLetter(route?.params?.postCardData?.country)}`
            : ''
        }
        isVerifiedStatus={
          route?.params?.postCardData?.identified_docs_status
            ? `${route?.params?.postCardData?.identified_docs_status}`
            : false
        }
        ratingValue={route?.params?.postCardData?.ratingStartValue}
      />
      <View style={styles.headerBtnContainer}>
        <View style={styles.topBtnContainer}>
          <Button
            title={'Posted'}
            titleStyles={
              btnFocused ? styles.hoverBtnTitleStyles : styles.btnTitleStyles
            }
            containerStyle={
              btnFocused
                ? [
                    styles.hoverBtnStyles,
                    {borderTopLeftRadius: 5, borderBottomLeftRadius: 5},
                  ]
                : styles.btnStyles
            }
            onPressHandler={istFocusedHandler}
          />
          <Button
            title={'Bookmarked'}
            titleStyles={
              btnHover ? styles.hoverBtnTitleStyles : styles.btnTitleStyles
            }
            containerStyle={
              btnHover
                ? [
                    styles.hoverBtnStyles,
                    {borderTopRightRadius: 5, borderBottomRightRadius: 5},
                  ]
                : styles.btnStyles
            }
            onPressHandler={secFocusedHandler}
          />
        </View>
      </View>
      <View style={styles.mainContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Loader color={theme.lightColor.headerBg} size={40} />
          </View>
        ) : (
          <View style={styles.mainPostsCardsContainer}>
            {btnFocused && btnFocused && userPostsData?.length > 0 ? (
              <FlatList
                data={userPostsData}
                renderItem={({item, index}) => (
                  <PostCard
                    key={item?._id}
                    index={index}
                    postsData={item}
                    navigation={navigation}
                    sheetRef={refRBSheet}
                    onPress={() => setSelected(index)}
                    setSelectedPostID={setSelectedPostID}
                    setPostUserIdSelected={setPostUserIdSelected}
                    refRBSheetMenu={refRBSheetMenu}
                    setEditPostSelected={setEditPostSelected}
                    textInputRef={textInputRef}
                    refRBShareSheet={refRBShareSheet}
                    setSelectSharePostId={setSelectSharePostId}
                    focusedVideo={focusedVideo}
                    setFocusedVideo={setFocusedVideo}
                    isFocusedCurrentPage={isFocusedCurrentPage}
                  />
                )}
                viewabilityConfigCallbackPairs={
                  viewabilityConfigCallbackPairs.current
                }
                keyExtractor={item => item?._id}
                showsVerticalScrollIndicator={false}
                onRefresh={() => {
                  handleRefreshUserPosts(route?.params?.postCardData?._id);
                }}
                refreshing={refreshing}
                onEndReached={() =>
                  fetchMoreUserPosts(route?.params?.postCardData?._id)
                }
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                  footerLoading ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 8,
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
              btnFocused && (
                <View style={styles.loadingContainer}>
                  <Text
                    children={'No results found'}
                    size={15}
                    textColor={theme.lightColor.darkGray}
                    fonts={theme.fontFamily.TinosBold}
                    weight={theme.fontWeight.bold}
                    alignText={'center'}
                  />
                </View>
              )
            )}
            {btnHover && btnHover && bookMarkedData?.length > 0 ? (
              <FlatList
                data={bookMarkedData}
                renderItem={({item, index}) => (
                  <PostCard
                    key={item?._id}
                    index={index}
                    postsData={item}
                    navigation={navigation}
                    sheetRef={refRBSheet}
                    onPress={() => setSelected(index)}
                    setSelectedPostID={setSelectedPostID}
                    setPostUserIdSelected={setPostUserIdSelected}
                    refRBSheetMenu={refRBSheetMenu}
                    setEditPostSelected={setEditPostSelected}
                    textInputRef={textInputRef}
                    refRBShareSheet={refRBShareSheet}
                    setSelectSharePostId={setSelectSharePostId}
                    focusedVideo={focusedVideo}
                    setFocusedVideo={setFocusedVideo}
                    isFocusedCurrentPage={isFocusedCurrentPage}
                  />
                )}
                viewabilityConfigCallbackPairs={
                  viewabilityConfigCallbackPairs.current
                }
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                onRefresh={() => {
                  handleRefreshSavePosts();
                }}
                refreshing={refreshing}
                onEndReached={() => fetchMoreSavePosts()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                  footerLoading ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: 8,
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
              btnHover && (
                <View style={styles.loadingContainer}>
                  <Text
                    children={
                      'Bookmark your favorite posts so you can easily find them here.'
                    }
                    size={15}
                    textColor={theme.lightColor.darkGray}
                    fonts={theme.fontFamily.TinosBold}
                    weight={theme.fontWeight.bold}
                    alignText={'center'}
                  />
                </View>
              )
            )}
          </View>
        )}
      </View>

      {/* my profile */}
      <RBSheet
        ref={refRBSheet}
        animationType="none"
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={200}
        customStyles={{
          wrapper: {backgroundColor: 'rgba(0, 0, 0, 0.80)'},
          container: {
            height: isKeyboardVisible ? 430 : 730,
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
            {btnFocused ? (
              <>
                {userPostsData[selected]?.comments?.map(items => (
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
                    />
                    {items?.replyComments?.map(item => (
                      <View style={{marginLeft: 35}} key={item?._id}>
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
                        />
                      </View>
                    ))}
                  </View>
                ))}
              </>
            ) : (
              <>
                {bookMarkedData[selected]?.comments?.map(items => (
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
                    />
                    {items?.replyComments?.map(item => (
                      <View style={{marginLeft: 35}} key={item?._id}>
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
                        />
                      </View>
                    ))}
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </View>

        <View style={styles.textInputContainerStyles}>
          <TextInput
            value={commentText}
            style={styles.textInputStyle}
            onChangeText={newText => setCommentText(newText)}
            placeholder="Write your message here"
            placeholderTextColor={theme.lightColor.postInputPlaceholder}
            ref={textInputRef}
          />
          <TouchableOpacity
            onPress={() => commentHandler(selectedPostID, replyCommentID)}>
            <SendMessageIconSvg />
          </TouchableOpacity>
        </View>
      </RBSheet>

      <BottomSheet
        refRBSheetMenu={refRBSheetMenu}
        loginUserId={currentUserLoginData?._id}
        postUserId={postUserIdSelected}
        alReadySignupId={getUserUpdateData?.user?._id}
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
    backgroundColor: theme.lightColor.newBodyColor,
  },
  headerBtnContainer: {
    width: '100%',
    paddingHorizontal: 35,
    marginTop: '30%',
    marginBottom: 15,
  },
  topBtnContainer: {
    borderWidth: 1,
    borderColor: theme.lightColor.placeholderColor,
    flexDirection: 'row',
    borderRadius: 6,
  },
  mainContainer: {
    height: windowHeight * 0.55,
  },
  mainPostsCardsContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  btnStyles: {
    height: 35,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitleStyles: {
    color: theme.lightColor.darkGray,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
  },
  hoverBtnTitleStyles: {
    color: theme.lightColor.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
  },
  hoverBtnStyles: {
    backgroundColor: theme.lightColor.headerBg,
    height: 35,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 6,
    width: '100%',
  },
  textInputStyle: {
    height: 48,
    marginBottom: 6,
    width: '78%',
    marginTop: 6,
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
});
