import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import HomeHeader from '../../../components/common/homeHeader/HomeHeader';
import {Text} from '../../../components/common/text/Text';
import {theme} from '../../../assests/theme/Theme';
import PostCard from '../../../components/common/postCard/PostCard';
import BottomSheet from '../../../components/common/bottomSheet/BottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch} from 'react-redux';
import SendMessageIconSvg from '../../../assests/icons/svg/chatSvgs/SendMessageIconSvg';
import GetAllPostsHook from '../../../customHooks/postsHook/GetAllPostsHook';
import CommentScreen from '../videoScreen/CommentScreen';
import DateTime from '../../../utils/DateTime';
import ShareBottomSheet from '../../../components/common/bottomSheet/ShareBottomSheet';
import {useIsFocused} from '@react-navigation/native';
import FillLikeIconSvg from '../../../assests/icons/svg/homeSvgs/FillLikeIconSvg';
import RightArrowIconSvg from '../../../assests/icons/svg/homeSvgs/RightArrowIconSvg';
import {notificationSeen} from '../../../redux/actions/NotificationAction';

export default function SearchResults({navigation, route}) {
  // console.log(route?.params?.cardData?.data, 'navigation');

  // hook
  const dispatch = useDispatch();

  // call notification seen api
  useEffect(() => {
    if (route?.params?.cardData?.notificationId) {
      let newData = {
        notificationId: route?.params?.cardData?.notificationId,
      };
      dispatch(notificationSeen(newData));
    }
  }, [route?.params?.cardData?.notificationId]);

  const {
    commentHandler,
    commentText,
    setCommentText,
    currentUserLoginData,
    currentUserData,
    replyCommentID,
    setReplyCommentID,
    commentLikedHandler,
  } = GetAllPostsHook();

  const onGoCreatePostScreen = () => {
    navigation.navigate('CreatePost');
  };
  const refRBSheet = useRef();
  const refRBSheetMenu = useRef();
  const textInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const refRBShareSheet = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedPostID, setSelectedPostID] = useState(false);
  const [postUserIdSelected, setPostUserIdSelected] = useState(false);
  const [editPostSelected, setEditPostSelected] = useState(false);
  const [selectSharePostId, setSelectSharePostId] = useState(false);
  const [focusedVideo, setFocusedVideo] = useState(0);
  const [findPost, setFindPost] = useState([]);
  const isFocusedCurrentPage = useIsFocused();
  const {getCommentTimeAgo} = DateTime();

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
    // console.log(selected);
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

  useEffect(() => {
    setFindPost([route?.params?.cardData?.data]);
  }, [route?.params?.cardData?.data]);

  const handleButtonPress = () => {
    textInputRef?.current?.focus(); // Call the focus() method to open the keyboard
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
        </View>
        <View style={styles.postCardContainer}>
          <FlatList
            data={findPost}
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
            keyExtractor={item => item?._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
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
            {findPost[selected]?.comments?.map(items => (
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
    height: '86%',
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
  postCardContainer: {
    marginTop: '5%',
    paddingHorizontal: 10,
  },
  commitAvatar: {
    height: 38,
    width: 38,
    borderRadius: 38,
  },
  commitContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 25,
  },
  commitHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commitMain: {
    borderTopStartRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: theme.lightColor.commitBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 8,
    marginTop: 2,
  },
  btnTitle: {
    color: theme.lightColor.darkGray,
    fontSize: 12,
    fontFamily: theme.fontFamily.TinosRegular,
  },
  btnTitleContainer: {
    marginLeft: 40,
    marginTop: 2,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
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
