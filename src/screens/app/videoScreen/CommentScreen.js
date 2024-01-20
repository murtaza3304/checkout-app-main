import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TouchableHighlight,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {theme} from '../../../assests/theme/Theme';
import FillLikeIconSvg from '../../../assests/icons/svg/homeSvgs/FillLikeIconSvg';
import BlankLikeIconSvg from '../../../assests/icons/svg/homeSvgs/BlankLikeIconSvg';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';

export default function CommentScreen({
  navigation,
  dataItems,
  setReplyCommentID,
  replyID,
  userData,
  commentsLikes,
  handleButtonPress = () => false,
  getCommentTimeAgo = () => false,
  commentLikeHandle = () => false,
  postID,
  sheetRef,
  setReplyTo=()=>false,
}) {
  // console.log(dataItems,"dataItems");
  // console.log(commentsLikes?.length, 'commentsLikes?.length');
  const {capitalizeFirstLetter} = CapitalizeLetter();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(commentsLikes?.length);
  const [postState, setPostState] = useState('like');

  const checkPostIsLikedOrNot = likes => {
    const findOrNot = likes?.some(l => l == userData?._id);
    return findOrNot;
  };

  useEffect(() => {
    const response = checkPostIsLikedOrNot(commentsLikes);
    setIsLiked(response);
    if (response) {
      setPostState('dislike');
    }
  }, []);

  useEffect(() => {
    setLikeCount(commentsLikes?.length);
  }, [dataItems]);

  useEffect(() => {
    // console.log(isLiked, 'isLiked');
  }, [isLiked]);

  const handlelikeButtonPress = (likeID, postID) => {
    if (postState === 'like') {
      setLikeCount(likeCount + 1);
      setPostState('dislike');
      setIsLiked(true);
      commentLikeHandle(likeID, true, postID);
    } else {
      setLikeCount(likeCount - 1);
      setPostState('like');
      setIsLiked(false);
      commentLikeHandle(likeID, false, postID);
    }
  };
  const onGoProfileScreen = data => {
    sheetRef.current.close();
    navigation.navigate('Profile', {
      postCardData: data,
    });
  };
  return (
    <View style={styles.commitContainer}>
      <View style={{width: '18%'}}>
        {dataItems?.author?.profilePic ? (
          <TouchableOpacity
            onPress={() => onGoProfileScreen(dataItems?.author)}>
            <Image
              source={{uri: dataItems?.author?.profilePic}}
              resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
              style={styles.commitAvatar}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onGoProfileScreen(dataItems?.author)}
            style={{
              borderColor: theme.lightColor.darkGray,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 42,
              width: 42,
              borderRadius: 40,
            }}>
            <Image
              source={require('../../../assests/images/userIconImage.png')}
              resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
              style={{
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{Width: '80%'}}>
        <View style={styles.commitHeader}>
          <View style={{width: '52%'}}>
            <Text
              style={{
                fontFamily: theme.fontFamily.TinosBold,
                color: theme.lightColor.postSecHeading,
                fontSize: 15,
              }}
              numberOfLines={1}
              onPress={() => onGoProfileScreen(dataItems?.author)}>
              {dataItems?.author?.firstName && dataItems?.author?.lastName
                ? `${capitalizeFirstLetter(
                    dataItems?.author?.firstName,
                  )} ${capitalizeFirstLetter(dataItems?.author?.lastName)}`
                : ''}
            </Text>
          </View>
          <View style={{width: '15%'}}>
            <Text
              style={{
                fontSize: 10,
                color: theme.lightColor.postSecHeading,
                fontFamily: theme.fontFamily.TinosRegular,
                textAlign: 'right',
              }}>
              {dataItems?.createdAt
                ? getCommentTimeAgo(dataItems?.createdAt)
                : ''}
            </Text>
          </View>
        </View>
        <View style={styles.commitMain}>
          <Text
            style={{
              fontSize: 14,
              color: theme.lightColor.postSecHeading,
              fontFamily: theme.fontFamily.PoppinsRegular,
            }}>
            {dataItems?.text ? dataItems?.text : ''}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.btnTitleContainer}
            onPress={() => {
              handleButtonPress("@"+dataItems?.author?.firstName + dataItems?.author?.lastName);
              setReplyCommentID(replyID);
            }}
            underlayColor={theme.lightColor.postInputBorder}>
            <Text style={styles.btnTitle}>Reply</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btnTitleContainer}
            onPress={() => handlelikeButtonPress(dataItems?._id, postID)}
            underlayColor={theme.lightColor.postInputBorder}>
            <Text style={styles.btnTitle}>Like</Text>
          </TouchableHighlight>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: 23,
              marginLeft: 5,
            }}>
            {isLiked ? (
              <FillLikeIconSvg height={14} width={14} />
            ) : likeCount > 0 ? (
              <FillLikeIconSvg height={14} width={14} />
            ) : (
              false
            )}
            <Text
              style={{
                fontSize: 11,
                color: theme.lightColor.postSecHeading,
                fontFamily: theme.fontFamily.TinosRegular,
              }}>
              {likeCount > 0 ? likeCount : ''}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnTitleContainer: {
    marginLeft: 10,
    marginTop: 3,
    width: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: theme.lightColor.white,
    borderRadius: 4,
    paddingVertical: 1.4,
  },
  btnTitle: {
    color: theme.lightColor.darkGray,
    fontSize: 12,
    fontFamily: theme.fontFamily.TinosRegular,
  },
  commitAvatar: {
    height: 38,
    width: 38,
    borderRadius: 38,
  },
  commitContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  },
  commitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  commitMain: {
    borderTopStartRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: theme.lightColor.commitBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 2,
    maxWidth: '82%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
