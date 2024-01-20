import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image as NativeImage,
  Platform,
  Pressable,
  ImageBackground,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Image from 'react-native-image-progress';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../text/Text';
import {Button} from '../button/Button';
import BlankLikeIconSvg from '../../../assests/icons/svg/homeSvgs/BlankLikeIconSvg';
import SaveIconSvg from '../../../assests/icons/svg/homeSvgs/SaveIconSvg';
import SaveBlanckIconSvg from '../../../assests/icons/svg/homeSvgs/SaveBlanckIconSvg';
import PostShareIconSvg from '../../../assests/icons/svg/homeSvgs/PostShareIconSvg';
import FillLikeIconSvg from '../../../assests/icons/svg/homeSvgs/FillLikeIconSvg';
import VerifiedIconSvg from '../../../assests/icons/svg/homeSvgs/VerifiedIconSvg';
import GetAllPostsHook from '../../../customHooks/postsHook/GetAllPostsHook';
import Video from 'react-native-video';
import CommitIconSvg from '../../../assests/icons/svg/homeSvgs/CommitIconSvg';
import NewMenuIcon from '../../../assests/icons/svg/homeSvgs/NewMenuIcon';
import DateTime from '../../../utils/DateTime';
import RNFetchBlob from 'rn-fetch-blob';
import VideoPlayIconSvg from '../../../assests/icons/svg/homeSvgs/VideoPlayIconSvg';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Loader} from '../loader/Loader';
import GlobeIconSvg from '../../../assests/icons/svg/homeSvgs/GlobeIconSvg';
import LockIconSvg from '../../../assests/icons/svg/homeSvgs/LockIconSvg';
import Hyperlink from 'react-native-hyperlink';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';
import PostCardVideo from '../../../screens/app/videoScreen/PostCardVideo';

export default function PostCard({
  navigation,
  postsData,
  sheetRef,
  onPress,
  index,
  setSelectedPostID,
  refRBSheetMenu,
  setPostUserIdSelected,
  setEditPostSelected,
  textInputRef,
  refRBShareSheet,
  setSelectSharePostId,
  focusedVideo,
  setFocusedVideo,
  isFocusedCurrentPage,
}) {
  const {isLikeHandler, currentUserLoginData, isSaveHandler, loading} =
    GetAllPostsHook();
  // states
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(postsData?.likes?.length);
  const [isBookmark, setIsBookmark] = useState(false);

  function getTotalLength(comments) {
    let totalComments = comments?.length;
    let totalReplies = 0;

    function countReplies(replies) {
      for (const reply of replies) {
        totalReplies++;
        if (reply?.replies && Array.isArray(reply?.replies)) {
          countReplies(reply?.replies);
        }
      }
    }

    for (const comment of comments) {
      if (comment?.replyComments && Array.isArray(comment?.replyComments)) {
        countReplies(comment?.replyComments);
      }
    }

    return totalComments + totalReplies;
  }

  useEffect(() => {
    setLikeCount(postsData?.likes?.length);
  }, [postsData]);

  useEffect(() => {
    // console.log(isLiked, "isLiked")
  }, [isLiked]);

  useEffect(() => {
    const response = checkPostIsLikedOrNot(postsData?.likes);
    setIsLiked(response);
    // console.log(response, "response");
  }, [postsData]);

  useEffect(() => {
    const response = checkPostIsSavedOrNot(postsData?.bookmarks);
    setIsBookmark(response);
  }, [postsData]);

  // navigate function
  const onGoProfileScreen = data => {
    console.log(data,"=============");
    navigation.navigate('UserSpecification', {
      cardData: data,
    });
  };
  // console.log(postsData, "postsData");

  const checkPostIsLikedOrNot = likes => {
    const findOrNot = likes?.some(l => l?._id == currentUserLoginData?._id);
    return findOrNot;
  };

  const checkPostIsSavedOrNot = saveId => {
    const findOrNot = saveId?.some(l => l == currentUserLoginData?._id);
    return findOrNot;
  };

  // To convert Time
  const {getTimeAgo} = DateTime();

  // To convert capital letter
  const {capitalizeFirstLetter} = CapitalizeLetter();
  const [thumbnillFile, setThumbnillFile] = useState('');
  const [thumbnillFileTwo, setThumbnillFileTwo] = useState('');
  const [thumbnillFileThree, setThumbnillFileThree] = useState('');
  const [videoBlobUrl, setVideoBlob] = useState('');
  const [mediaLoading, setMediaLoading] = useState(false);

  useEffect(() => {
    if (postsData?.file[2]?.type.toLowerCase() === 'video') {
      setMediaLoading(true);
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'mp4',
      })
        .fetch('GET', postsData?.file[2]?.fileKey, {})
        .then(res => {
          setVideoBlob(res.path(res.path()));
          createThumbnail({
            url:
              Platform?.OS === 'ios'
                ? res.path(res.path())
                : `file://${res.path(res.path())}`,
            timeStamp: 10000,
          })
            .then(response => {
              // console.log('res+++++++>>>>>>>>', { response });
              setThumbnillFileThree(response?.path);
            })
            .catch(err => console.log({err}));
          setMediaLoading(false);
          //   console.log('The file saved to ', res.readFile());
        })
        .catch(error => {
          console.log('eror1', error);
        });
    }
  }, [postsData?.file]);

  useEffect(() => {
    if (postsData?.file[1]?.type.toLowerCase() === 'video') {
      setMediaLoading(true);
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'mp4',
      })
        .fetch('GET', postsData?.file[1]?.fileKey, {})
        .then(res => {
          setVideoBlob(res.path(res.path()));
          createThumbnail({
            url:
              Platform?.OS === 'ios'
                ? res.path(res.path())
                : `file://${res.path(res.path())}`,
            timeStamp: 10000,
          })
            .then(response => {
              // console.log('res+++++++>>>>>>>>', { response });
              setThumbnillFile(response?.path);
            })
            .catch(err => console.log({err}));
          setMediaLoading(false);
          //   console.log('The file saved to ', res.readFile());
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [postsData?.file]);
  // console.log('vidio--->>>>>>>>', videoBlobUrl);
  useEffect(() => {
    if (postsData?.file[0]?.type.toLowerCase() === 'video') {
      setMediaLoading(true);

      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'mp4',
      })
        .fetch('GET', postsData?.file[0]?.fileKey, {})
        .then(res => {
          setVideoBlob(res.path(res.path()));
          createThumbnail({
            url:
              Platform?.OS === 'ios'
                ? res.path(res.path())
                : `file://${res.path(res.path())}`,
            timeStamp: 10000,
          })
            .then(response => {
              // console.log('res+++++++>>>>>>>>', { response });
              setThumbnillFileTwo(response?.path);
            })
            .catch(err => console.log('00000000000', {err}));
          setMediaLoading(false);
          //   console.log('The file saved to ', res.readFile());
        })
        .catch(error => {
          console.log('00000000000', error);
        });
    }
  }, [postsData?.file]);

  // navigate multiple images
  const AllMediaScreen = (data, index) => {
    navigation.navigate('HorizontalMediaScreen', {
      mediaData: data,
      index: index,
    });
  };

  // navigate single image
  const SingleImage = data => {
    navigation.navigate('SingleImage', {
      images: data,
    });
  };

  // open urls
  const openLink = url => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.postContainer}>
      {/* head post */}
      <View style={styles.headContainer}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => onGoProfileScreen(postsData?.author)}
            style={{position: 'relative'}}>
            <View>
              {postsData?.author?.profilePic ? (
                <NativeImage
                  source={{uri: postsData?.author?.profilePic}}
                  resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.defaultAvatar}>
                  <NativeImage
                    source={require('../../../assests/images/userIconImage.png')}
                    resizeMode="contain"
                    style={{height: 35, width: 35}}
                  />
                </View>
              )}
            </View>
            {postsData?.author?.identified_docs_status && (
              <View style={styles.IndicatorContainer}>
                <VerifiedIconSvg
                  height={16}
                  width={16}
                  color={theme.lightColor.orangeColor}
                />
              </View>
            )}
          </TouchableOpacity>
          <View style={{width: '70%'}}>
            <TouchableOpacity
              onPress={() => onGoProfileScreen(postsData?.author)}>
              <Text
                children={
                  postsData?.author?.firstName && postsData?.author?.lastName
                    ? `${capitalizeFirstLetter(
                        postsData?.author?.firstName,
                      )} ${capitalizeFirstLetter(postsData?.author?.lastName)}`
                    : ''
                }
                size={15}
                lines={1}
                textColor={theme.lightColor.darkGray}
                fonts={theme.fontFamily.TinosBold}
                weight={theme.fontWeight.bold}
                style={[styles.profileText]}
                onPressHandler={() => onGoProfileScreen(postsData?.author)}
              />
            </TouchableOpacity>
            <View style={styles.dateTimeContainer}>
              {postsData?.privacyStatus?.toLowerCase() === 'public' &&
              postsData?.sharedPrivacy?.toLowerCase() === 'public' ? (
                <GlobeIconSvg height={14} width={14} />
              ) : (
                <LockIconSvg height={18} width={18} />
              )}
              <Text
                children={
                  postsData?.createdAt ? getTimeAgo(postsData?.createdAt) : ''
                }
                size={11}
                textColor={theme.lightColor.postTimeColor}
                style={{marginLeft: 6}}
              />
            </View>
          </View>
        </View>
        <View>
          <Button
            renderIconRight={() => <NewMenuIcon width={17} />}
            containerStyle={styles.btnContainer}
            onPressHandler={() => {
              refRBSheetMenu.current.open();
              setPostUserIdSelected(postsData?.author?._id);
              setSelectedPostID(postsData?._id);
              setEditPostSelected(postsData);
            }}
          />
        </View>
      </View>

      {/* tag content */}
      <View style={styles.tagContainer}>
        {postsData?.caption ? (
          <Hyperlink
            onPress={(url, text) => openLink(url)}
            linkStyle={{
              color: theme.lightColor.headerBg,
              textDecorationLine: 'underline',
            }}>
            <Text
              children={postsData?.caption}
              size={16}
              textColor={theme.lightColor.postSecHeading}
              fonts={theme.fontFamily.TinosBold}
              style={[styles.profileText, {marginBottom: 2, marginLeft: 6}]}
            />
          </Hyperlink>
        ) : postsData?.fileType === 'text' ? (
          false
        ) : postsData?.text &&
          postsData?.originalAuthor?._id === postsData?.author?._id ? (
          <Hyperlink
            onPress={(url, text) => openLink(url)}
            linkStyle={{
              color: theme.lightColor.headerBg,
              textDecorationLine: 'underline',
            }}>
            <Text
              children={postsData?.text}
              size={16}
              textColor={theme.lightColor.postSecHeading}
              fonts={theme.fontFamily.TinosBold}
              style={[styles.profileText, {marginBottom: 2, marginLeft: 6}]}
            />
          </Hyperlink>
        ) : (
          false
        )}
        {postsData?.originalAuthor?._id === postsData?.author?._id ? (
          false
        ) : (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: theme.lightColor.postInputBorder,
              marginTop: 5,
            }}
          />
        )}
        {postsData?.originalAuthor?._id === postsData?.author?._id ? (
          false
        ) : (
          <>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 3,
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <View style={{width: '16%'}}>
                <TouchableOpacity
                  style={{
                    position: 'relative',
                  }}
                  onPress={() => onGoProfileScreen(postsData?.originalAuthor)}>
                  {postsData?.originalAuthor?.profilePic ? (
                    <View
                      style={{
                        width: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 35,
                        borderRadius: 50,
                      }}>
                      <NativeImage
                        source={{
                          uri: postsData?.originalAuthor?.profilePic,
                        }}
                        style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: 50,
                        }}
                        resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: theme.lightColor.darkGray,
                        width: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 35,
                        borderRadius: 50,
                      }}>
                      <NativeImage
                        source={require('../../../assests/images/userIconImage.png')}
                        style={{height: 24, width: 24}}
                      />
                    </View>
                  )}
                  {postsData?.originalAuthor?.identified_docs_status && (
                    <View style={{position: 'absolute', top: 22, right: 7}}>
                      <VerifiedIconSvg
                        height={14}
                        width={14}
                        color={theme.lightColor.orangeColor}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{width: '60%'}}>
                <Text
                  children={
                    postsData?.originalAuthor?.firstName &&
                    postsData?.originalAuthor?.lastName
                      ? `${capitalizeFirstLetter(
                          postsData?.originalAuthor?.firstName,
                        )} ${capitalizeFirstLetter(
                          postsData?.originalAuthor?.lastName,
                        )}`
                      : ''
                  }
                  size={13}
                  lines={1}
                  textColor={theme.lightColor.darkGray}
                  fonts={theme.fontFamily.TinosBold}
                  weight={theme.fontWeight.bold}
                  onPressHandler={() =>
                    onGoProfileScreen(postsData?.originalAuthor)
                  }
                />
                <View style={[styles.dateTimeContainer, {marginLeft: 0}]}>
                  {postsData?.privacyStatus?.toLowerCase() === 'public' &&
                  postsData?.sharedPrivacy?.toLowerCase() === 'public' ? (
                    <GlobeIconSvg height={14} width={14} />
                  ) : (
                    <LockIconSvg height={18} width={18} />
                  )}
                  <Text
                    children={
                      postsData?.sharedTime
                        ? getTimeAgo(postsData?.sharedTime)
                        : ''
                    }
                    size={10}
                    textColor={theme.lightColor.postTimeColor}
                    style={[styles.profileText, {marginLeft: 6}]}
                  />
                </View>
              </View>
            </View>
            <View style={{paddingBottom: 4}}>
              {postsData?.fileType === 'text' ? (
                false
              ) : postsData?.text ? (
                <Hyperlink
                  onPress={(url, text) => openLink(url)}
                  linkStyle={{
                    color: theme.lightColor.headerBg,
                    textDecorationLine: 'underline',
                  }}>
                  <Text
                    children={postsData?.text}
                    size={16}
                    textColor={theme.lightColor.postSecHeading}
                    fonts={theme.fontFamily.TinosBold}
                    style={[
                      styles.profileText,
                      {marginBottom: 2, marginLeft: 6},
                    ]}
                  />
                </Hyperlink>
              ) : (
                false
              )}
            </View>
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {postsData?.hashtags?.map((items, index) => (
            <Text
              key={index}
              children={`${items}`}
              size={14}
              textColor={theme.lightColor.black}
              fonts={theme.fontFamily.TinosBold}
              style={[styles.profileText, {marginLeft: 6}]}
            />
          ))}
        </View>
      </View>

      {/* main container */}
      <View style={styles.mainContainer}>
        <View style={styles.postImageContainer}>
          {postsData?.file?.length > 0 &&
          ['media', 'image', 'video'].includes(
            postsData?.fileType.toLowerCase(),
          ) &&
          postsData?.file[0]?.type.toLowerCase() === 'image' ? (
            <>
              {postsData?.file?.length === 1 ? (
                <TouchableOpacity
                  onPress={() => SingleImage(postsData?.file[0]?.fileKey)}>
                  <Image
                    style={styles.postImage}
                    source={{uri: postsData?.file[0]?.fileKey}}
                    resizeMode="cover"
                    renderIndicator={() => (
                      <Loader color={theme.lightColor.headerBg} size={22} />
                    )}
                  />
                </TouchableOpacity>
              ) : postsData?.file?.length == 2 ? (
                <Pressable
                  style={{
                    height: 200,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  // onPress={() => AllMediaScreen(postsData?.file)}
                >
                  <TouchableOpacity
                    style={{width: '49.7%'}}
                    onPress={() => AllMediaScreen(postsData?.file, 0)}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={{uri: postsData?.file[0]?.fileKey}}
                      resizeMode="cover"
                      renderIndicator={() => (
                        <Loader color={theme.lightColor.headerBg} size={22} />
                      )}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '49.7%',
                    }}>
                    <TouchableOpacity
                      style={{width: '100%', height: '100%'}}
                      onPress={() => AllMediaScreen(postsData?.file, 1)}>
                      {postsData?.file[1]?.type.toLowerCase() === 'image' ? (
                        <Image
                          style={{height: '100%', width: '100%'}}
                          source={{uri: postsData?.file[1]?.fileKey}}
                          resizeMode="cover"
                          renderIndicator={() => (
                            <Loader
                              color={theme.lightColor.headerBg}
                              size={22}
                            />
                          )}
                        />
                      ) : (
                        <>
                          {mediaLoading ? (
                            <View style={styles.thumbnillLoading}>
                              <Loader
                                color={theme.lightColor.headerBg}
                                size={22}
                              />
                            </View>
                          ) : (
                            thumbnillFile && (
                              <ImageBackground
                                key={index}
                                source={{uri: thumbnillFile}}
                                resizeMode="cover"
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    AllMediaScreen(postsData?.file, 1)
                                  }>
                                  <VideoPlayIconSvg />
                                </TouchableOpacity>
                              </ImageBackground>
                            )
                          )}
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                </Pressable>
              ) : postsData?.file?.length === 3 ? (
                <Pressable
                  style={{
                    height: 200,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  // onPress={() => AllMediaScreen(postsData?.file)}
                >
                  <TouchableOpacity
                    style={{width: '49.7%'}}
                    onPress={() => AllMediaScreen(postsData?.file, 0)}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={{uri: postsData?.file[0]?.fileKey}}
                      resizeMode="cover"
                      renderIndicator={() => (
                        <Loader color={theme.lightColor.headerBg} size={22} />
                      )}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '49.7%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{height: '49.5%'}}
                      onPress={() => AllMediaScreen(postsData?.file, 1)}>
                      {postsData?.file[1]?.type.toLowerCase() === 'image' ? (
                        <Image
                          style={{height: '100%', width: '100%'}}
                          source={{uri: postsData?.file[1]?.fileKey}}
                          resizeMode="cover"
                          renderIndicator={() => (
                            <Loader
                              color={theme.lightColor.headerBg}
                              size={22}
                            />
                          )}
                        />
                      ) : (
                        <>
                          {mediaLoading ? (
                            <View style={styles.thumbnillLoading}>
                              <Loader
                                color={theme.lightColor.headerBg}
                                size={22}
                              />
                            </View>
                          ) : (
                            thumbnillFile && (
                              <ImageBackground
                                key={index}
                                source={{uri: 'file://' + thumbnillFile}}
                                resizeMode="cover"
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    AllMediaScreen(postsData?.file, 1)
                                  }>
                                  <VideoPlayIconSvg />
                                </TouchableOpacity>
                              </ImageBackground>
                            )
                          )}
                        </>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{height: '49.5%'}}
                      onPress={() => AllMediaScreen(postsData?.file, 2)}>
                      {postsData?.file[2]?.type.toLowerCase() === 'image' ? (
                        <Image
                          style={{height: '100%', width: '100%'}}
                          source={{uri: postsData?.file[2]?.fileKey}}
                          resizeMode="cover"
                          renderIndicator={() => (
                            <Loader
                              color={theme.lightColor.headerBg}
                              size={22}
                            />
                          )}
                        />
                      ) : (
                        <>
                          {mediaLoading ? (
                            <View style={styles.thumbnillLoading}>
                              <Loader
                                color={theme.lightColor.headerBg}
                                size={22}
                              />
                            </View>
                          ) : (
                            thumbnillFileThree && (
                              <ImageBackground
                                key={index}
                                source={{uri: thumbnillFileThree}}
                                resizeMode="cover"
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    AllMediaScreen(postsData?.file, 2)
                                  }>
                                  <VideoPlayIconSvg />
                                </TouchableOpacity>
                              </ImageBackground>
                            )
                          )}
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    height: 200,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  // onPress={() => AllMediaScreen(postsData?.file)}
                >
                  <TouchableOpacity
                    style={{width: '49.7%'}}
                    onPress={() => AllMediaScreen(postsData?.file, 0)}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={{uri: postsData?.file[0]?.fileKey}}
                      resizeMode="cover"
                      renderIndicator={() => (
                        <Loader color={theme.lightColor.headerBg} size={22} />
                      )}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '49.7%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{height: '49.5%'}}
                      onPress={() => AllMediaScreen(postsData?.file, 1)}>
                      {postsData?.file[1]?.type.toLowerCase() === 'image' ? (
                        <Image
                          style={{height: '100%', width: '100%'}}
                          source={{uri: postsData?.file[1]?.fileKey}}
                          resizeMode="cover"
                          renderIndicator={() => (
                            <Loader
                              color={theme.lightColor.headerBg}
                              size={22}
                            />
                          )}
                        />
                      ) : (
                        <>
                          {mediaLoading ? (
                            <View style={styles.thumbnillLoading}>
                              <Loader
                                color={theme.lightColor.headerBg}
                                size={22}
                              />
                            </View>
                          ) : (
                            thumbnillFile && (
                              <ImageBackground
                                key={index}
                                source={{uri: thumbnillFile}}
                                resizeMode="cover"
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    AllMediaScreen(postsData?.file, 1)
                                  }>
                                  <VideoPlayIconSvg />
                                </TouchableOpacity>
                              </ImageBackground>
                            )
                          )}
                        </>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: theme.lightColor.postSecHeading,
                        height: '49.5%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => AllMediaScreen(postsData?.file)}>
                      <Text
                        children={`+ ${postsData?.file?.length - 2}`}
                        textColor={theme?.lightColor.white}
                        fonts={theme.fontFamily.TinosBold}
                        weight={theme.fontWeight.bold}
                        size={24}
                        onPressHandler={() => AllMediaScreen(postsData?.file)}
                      />
                    </TouchableOpacity>
                  </View>
                </Pressable>
              )}
            </>
          ) : postsData?.file?.length > 0 &&
            ['media', 'image', 'video']?.includes(
              postsData?.fileType?.toLowerCase(),
            ) &&
            postsData?.file[0]?.type.toLowerCase() === 'video' ? (
            <>
              {postsData?.file?.length === 1 &&
              postsData?.file[0]?.type.toLowerCase() === 'video' ? (
                Platform.OS === 'ios' && videoBlobUrl ? (
                  <View style={{flex: 1}}>
                    <Video
                      bufferConfig={{
                        minBufferMs: 15000,
                        maxBufferMs: 50000,
                        bufferForPlaybackMs: 2500,
                        bufferForPlaybackAfterRebufferMs: 5000,
                      }}
                      allowsExternalPlayback={false}
                      resizeMode={'cover'}
                      paused={false}
                      controls={true}
                      source={{uri: videoBlobUrl}} // Can be a URL or a local file.postsData?.file[0]
                      fullscreenAutorotate={true}
                      style={styles.backgroundVideo}
                    />
                  </View>
                ) : (
                  <>
                    {mediaLoading ? (
                      <View style={styles.videoLoadingContainer}>
                        <Loader color={theme.lightColor.headerBg} size={22} />
                      </View>
                    ) : (
                      videoBlobUrl && (
                        <PostCardVideo
                          videoUrl={videoBlobUrl}
                          navigation={navigation}
                          isFocusedCurrentPage={isFocusedCurrentPage}
                          setFocusedVideo={setFocusedVideo}
                          focusedVideo={focusedVideo}
                          index={index}
                        />
                      )
                    )}
                  </>
                )
              ) : postsData?.file?.length === 2 &&
                postsData?.file[0]?.type.toLowerCase() === 'video' &&
                postsData?.file[1]?.type.toLowerCase() === 'video' ? (
                <Pressable
                  style={{
                    height: 200,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  // onPress={() => AllMediaScreen(postsData?.file)}
                >
                  <TouchableOpacity
                    style={{width: '49.7%'}}
                    onPress={() => AllMediaScreen(postsData?.file, 0)}>
                    {mediaLoading ? (
                      <View style={styles.videoLoadingContainer}>
                        <Loader color={theme.lightColor.headerBg} size={22} />
                      </View>
                    ) : (
                      thumbnillFileTwo && (
                        <ImageBackground
                          key={index}
                          source={{uri: thumbnillFileTwo}}
                          resizeMode="cover"
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                          }}>
                          <TouchableOpacity
                            onPress={() => AllMediaScreen(postsData?.file, 0)}>
                            <VideoPlayIconSvg />
                          </TouchableOpacity>
                        </ImageBackground>
                      )
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '49.7%',
                    }}>
                    <TouchableOpacity
                      style={{width: '100%', height: '100%'}}
                      onPress={() => AllMediaScreen(postsData?.file, 1)}>
                      {mediaLoading ? (
                        <View style={styles.videoLoadingContainer}>
                          <Loader color={theme.lightColor.headerBg} size={22} />
                        </View>
                      ) : (
                        thumbnillFile && (
                          <ImageBackground
                            key={index}
                            source={{uri: thumbnillFile}}
                            resizeMode="cover"
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              height: '100%',
                              width: '100%',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                AllMediaScreen(postsData?.file, 1)
                              }>
                              <VideoPlayIconSvg />
                            </TouchableOpacity>
                          </ImageBackground>
                        )
                      )}
                    </TouchableOpacity>
                  </View>
                </Pressable>
              ) : postsData?.file?.length === 3 &&
                postsData?.file[0]?.type.toLowerCase() === 'video' &&
                postsData?.file[1]?.type.toLowerCase() === 'video' &&
                postsData?.file[2]?.type.toLowerCase() === 'video' ? (
                <Pressable
                  style={{
                    height: 200,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  // onPress={() => AllMediaScreen(postsData?.file)}
                >
                  <TouchableOpacity
                    style={{width: '49.7%'}}
                    onPress={() => AllMediaScreen(postsData?.file, 0)}>
                    {mediaLoading ? (
                      <View style={styles.videoLoadingContainer}>
                        <Loader color={theme.lightColor.headerBg} size={22} />
                      </View>
                    ) : (
                      thumbnillFileTwo && (
                        <ImageBackground
                          key={index}
                          source={{uri: thumbnillFileTwo}}
                          resizeMode="cover"
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                          }}>
                          <TouchableOpacity
                            onPress={() => AllMediaScreen(postsData?.file, 0)}>
                            <VideoPlayIconSvg />
                          </TouchableOpacity>
                        </ImageBackground>
                      )
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '49.7%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{height: '49.5%'}}
                      onPress={() => AllMediaScreen(postsData?.file, 1)}>
                      {mediaLoading ? (
                        <View style={styles.videoLoadingContainer}>
                          <Loader color={theme.lightColor.headerBg} size={22} />
                        </View>
                      ) : (
                        thumbnillFile && (
                          <ImageBackground
                            key={index}
                            source={{uri: thumbnillFile}}
                            resizeMode="cover"
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              height: '100%',
                              width: '100%',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                AllMediaScreen(postsData?.file, 1)
                              }>
                              <VideoPlayIconSvg />
                            </TouchableOpacity>
                          </ImageBackground>
                        )
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{height: '49.5%'}}
                      onPress={() => AllMediaScreen(postsData?.file, 2)}>
                      {mediaLoading ? (
                        <View style={styles.videoLoadingContainer}>
                          <Loader color={theme.lightColor.headerBg} size={22} />
                        </View>
                      ) : (
                        thumbnillFileThree && (
                          <ImageBackground
                            key={index}
                            source={{uri: thumbnillFileThree}}
                            resizeMode="cover"
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              height: '100%',
                              width: '100%',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                AllMediaScreen(postsData?.file, 2)
                              }>
                              <VideoPlayIconSvg />
                            </TouchableOpacity>
                          </ImageBackground>
                        )
                      )}
                    </TouchableOpacity>
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    height: 200,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  // onPress={() => AllMediaScreen(postsData?.file)}
                >
                  <TouchableOpacity
                    style={{width: '49.7%'}}
                    onPress={() => AllMediaScreen(postsData?.file, 0)}>
                    {mediaLoading ? (
                      <View style={styles.videoLoadingContainer}>
                        <Loader color={theme.lightColor.headerBg} size={22} />
                      </View>
                    ) : (
                      thumbnillFileTwo && (
                        <ImageBackground
                          key={index}
                          source={{uri: thumbnillFileTwo}}
                          resizeMode="cover"
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                          }}>
                          <TouchableOpacity
                            onPress={() => AllMediaScreen(postsData?.file, 0)}>
                            <VideoPlayIconSvg />
                          </TouchableOpacity>
                        </ImageBackground>
                      )
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '49.7%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{height: '49.5%'}}
                      onPress={() => AllMediaScreen(postsData?.file, 1)}>
                      {mediaLoading ? (
                        <View style={styles.videoLoadingContainer}>
                          <Loader color={theme.lightColor.headerBg} size={22} />
                        </View>
                      ) : (
                        thumbnillFile && (
                          <ImageBackground
                            key={index}
                            source={{uri: thumbnillFile}}
                            resizeMode="cover"
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              height: '100%',
                              width: '100%',
                            }}>
                            <TouchableOpacity
                              onPress={() =>
                                AllMediaScreen(postsData?.file, 1)
                              }>
                              <VideoPlayIconSvg />
                            </TouchableOpacity>
                          </ImageBackground>
                        )
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: theme.lightColor.postSecHeading,
                        height: '49.5%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => AllMediaScreen(postsData?.file)}>
                      <Text
                        children={`+ ${postsData?.file?.length - 2}`}
                        textColor={theme?.lightColor.white}
                        fonts={theme.fontFamily.TinosBold}
                        weight={theme.fontWeight.bold}
                        size={24}
                        onPressHandler={() => AllMediaScreen(postsData?.file)}
                      />
                    </TouchableOpacity>
                  </View>
                </Pressable>
              )}
            </>
          ) : postsData?.file?.length <= 0 &&
            postsData?.fileType?.toLowerCase() === 'text' ? (
            <View style={styles.textPostContainer}>
              <Hyperlink
                onPress={(url, text) => openLink(url)}
                linkStyle={{textDecorationLine: 'underline'}}>
                <Text
                  children={postsData?.text}
                  size={18}
                  textColor={theme.lightColor.white}
                  fonts={theme.fontFamily.TinosBold}
                  style={styles.profileText}
                />
              </Hyperlink>
            </View>
          ) : null}
        </View>
        <View
          style={{
            height: 1.5,
            width: '100%',
            backgroundColor: theme.lightColor.underLine,
          }}
        />
        <View style={styles.cardFooter}>
          <View style={styles.footerBtn}>
            <Button
              renderIconLeft={() => <CommitIconSvg width={24} />}
              onPressHandler={() => {
                onPress(index);
                sheetRef.current.open();
                setSelectedPostID(postsData?._id);
                setTimeout(() => {
                  textInputRef?.current?.focus();
                }, 1000);
              }}
            />
            <Text
              children={
                postsData?.comments ? getTotalLength(postsData?.comments) : ''
              }
              size={13}
              textColor={theme.lightColor.postSecHeading}
              fonts={theme.fontFamily.TinosBold}
              style={{marginLeft: 5}}
            />
          </View>
          <View style={styles.footerBtn}>
            {isLiked ? (
              <Button
                renderIconLeft={() => <FillLikeIconSvg height={20} />}
                onPressHandler={() => {
                  setIsLiked(false);
                  setLikeCount(likeCount - 1);
                  isLikeHandler(postsData?._id, false);
                }}
              />
            ) : (
              <Button
                renderIconLeft={() => <BlankLikeIconSvg height={20} />}
                onPressHandler={() => {
                  setIsLiked(true);
                  setLikeCount(likeCount + 1);
                  isLikeHandler(postsData?._id, true);
                }}
              />
            )}
            <Text
              children={likeCount}
              size={13}
              textColor={theme.lightColor.postSecHeading}
              fonts={theme.fontFamily.TinosBold}
            />
          </View>
          <View style={styles.saveBtnStyle}>
            {isBookmark ? (
              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  height: 35,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                disabled={loading}
                onPress={() => {
                  setIsBookmark(false);
                  isSaveHandler(postsData?._id, false);
                }}>
                <Button
                  renderIconLeft={() => <SaveIconSvg height={20} />}
                  disabled={loading}
                  onPressHandler={() => {
                    setIsBookmark(false);
                    isSaveHandler(postsData?._id, false);
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  height: 35,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                disabled={loading}
                onPress={() => {
                  setIsBookmark(true);
                  isSaveHandler(postsData?._id, true);
                }}>
                <Button
                  renderIconLeft={() => <SaveBlanckIconSvg height={20} />}
                  disabled={loading}
                  onPressHandler={() => {
                    setIsBookmark(true);
                    isSaveHandler(postsData?._id, true);
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              renderIconLeft={() => <PostShareIconSvg height={20} />}
              onPressHandler={() => {
                refRBShareSheet.current.open();
                setSelectSharePostId(postsData?._id);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: theme.lightColor.white,
    paddingTop: 13,
    marginHorizontal: 0,
    borderRadius: 0,
    elevation: 15,
    marginBottom: 12,
    shadowColor: 'rgba(0, 0, 0, 0.035)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  headContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 18,
  },
  avatarImage: {
    height: 45,
    width: 45,
    borderRadius: 45,
  },
  defaultAvatar: {
    height: 45,
    width: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.lightColor.darkGray,
  },
  profileText: {
    marginLeft: 10,
  },
  tagContainer: {
    marginBottom: 8,
    paddingHorizontal: 14,
  },
  mainContainer: {
    paddingBottom: 7,
    backgroundColor: theme.lightColor.white,
    shadowColor: 'rgba(0, 0, 0, 0.035)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    borderRadius: 10,
  },
  postImageContainer: {
    width: '100%',
    height: 200,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 6,
  },
  footerBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
  },
  saveBtnStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  backgroundVideo: {
    flex: 1,
  },
  textPostContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.lightColor.headerBg,
    height: 200,
  },
  btnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 40,
    backgroundColor: theme.lightColor.white,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  videoLoadingContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnillLoading: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 4,
  },
  IndicatorContainer: {
    position: 'absolute',
    top: 31,
    right: 0,
  },
});
