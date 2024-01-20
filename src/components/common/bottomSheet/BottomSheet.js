import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Text} from '../text/Text';
import {theme} from '../../../assests/theme/Theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import DeleteIconSvg from '../../../assests/icons/svg/chatSvgs/DeleteIconSvg';
import {useDispatch} from 'react-redux';
import {deleteUserPost} from '../../../redux/actions/PostAction';
import EditIconSvg from '../../../assests/icons/svg/homeSvgs/EditIconSvg';
import BoostIconSvg from '../../../assests/icons/svg/homeSvgs/BoostIconSvg';

export default function BottomSheet({
  loginUserId,
  postUserId,
  alReadySignupId,
  postID,
  editPostData,
  navigation,
  refRBSheetMenu,
}) {
  const dispatch = useDispatch();
  const [deletePostHandlerError, setDeletePostHandlerError] = useState('');
  const [loading, setLoading] = useState(false);
  // console.log(loginUserId, "loginUserId");
  // console.log(postId, "postId");
  // console.log(alReadySignupId, "alReadySignupId");
  // console.log(editPostData, "editPostData");
  // delete post handler
  const deletePostHandler = deleteID => {
    dispatch(deleteUserPost(deleteID, setLoading, setDeletePostHandlerError));
    refRBSheetMenu.current.close();
  };

  const editPostHandler = editData => {
    navigation.navigate('CreatePost', {
      postCardData: editData,
    });
    refRBSheetMenu.current.close();
  };

  const boostPostHandler = boostData => {
    navigation.navigate('BoostPost', {
      postID: boostData,
    });
    refRBSheetMenu.current.close();
  };

  const spamPostHandler = spamData => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'post',
        heading: 'Spam',
        scammerId: spamData,
        reporterId: loginUserId || alReadySignupId,
      },
    });
    refRBSheetMenu.current.close();
  };

  const falseInformationPostHandler = spamData => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'post',
        heading: 'False information',
        scammerId: spamData,
        reporterId: loginUserId || alReadySignupId,
      },
    });
    refRBSheetMenu.current.close();
  };

  const offensivePostHandler = spamData => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'post',
        heading: 'Offensive',
        scammerId: spamData,
        reporterId: loginUserId || alReadySignupId,
      },
    });
    refRBSheetMenu.current.close();
  };

  const bullyingPostHandler = spamData => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'post',
        heading: 'Bullying or harassment',
        scammerId: spamData,
        reporterId: loginUserId || alReadySignupId,
      },
    });
    refRBSheetMenu.current.close();
  };

  const scamPostHandler = spamData => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'post',
        heading: 'Scam or fraud',
        scammerId: spamData,
        reporterId: loginUserId || alReadySignupId,
      },
    });
    refRBSheetMenu.current.close();
  };

  const saleOfIllegalPostHandler = spamData => {
    navigation.navigate('SpamScreen', {
      postCardData: {
        label: 'post',
        heading: 'Sale of illegal or regulated goods',
        scammerId: spamData,
        reporterId: loginUserId || alReadySignupId,
      },
    });
    refRBSheetMenu.current.close();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <RBSheet
        ref={refRBSheetMenu}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: theme.lightColor.underLine,
            width: 80,
          },
        }}
        height={470}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.mainContainer}>
              {loginUserId === postUserId || alReadySignupId === postUserId ? (
                <>
                  <Text
                    children={'Actions'}
                    fonts={theme.fontFamily.TinosBold}
                    textColor={theme.lightColor.darkGray}
                    size={20}
                    alignText={'center'}
                  />
                  <View style={[styles.underLine, {marginTop: 8}]}></View>
                </>
              ) : (
                false
              )}
              {loginUserId === postUserId || alReadySignupId === postUserId ? (
                <>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 6,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      deletePostHandler(postID);
                    }}>
                    <Text
                      children={'Delete'}
                      fonts={theme.fontFamily.TinosBold}
                      textColor={theme.lightColor.darkGray}
                      size={18}
                      style={{width: '20%'}}
                      onPressHandler={() => {
                        deletePostHandler(postID);
                      }}
                    />
                    <DeleteIconSvg
                      color={theme.lightColor.red}
                      height={20}
                      width={20}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                false
              )}
              {loginUserId === postUserId || alReadySignupId === postUserId ? (
                <>
                  <View
                    style={{
                      backgroundColor: theme.lightColor.underLine,
                      height: 1,
                      width: '100%',
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      paddingVertical: 6,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      editPostHandler(editPostData);
                    }}>
                    <Text
                      children={'Edit post'}
                      fonts={theme.fontFamily.TinosBold}
                      textColor={theme.lightColor.darkGray}
                      size={18}
                      style={{width: '40%'}}
                      onPressHandler={() => {
                        editPostHandler(editPostData);
                      }}
                    />
                    <EditIconSvg height={20} width={20} />
                  </TouchableOpacity>
                </>
              ) : (
                false
              )}
              {loginUserId === postUserId || alReadySignupId === postUserId ? (
                <>
                  <View
                    style={{
                      backgroundColor: theme.lightColor.underLine,
                      height: 1,
                      width: '100%',
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      paddingVertical: 6,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      boostPostHandler(postID);
                    }}>
                    <Text
                      children={'Boost post'}
                      fonts={theme.fontFamily.TinosBold}
                      textColor={theme.lightColor.darkGray}
                      size={18}
                      style={{width: '40%'}}
                      onPressHandler={() => {
                        boostPostHandler(postID);
                      }}
                    />
                    <BoostIconSvg height={18} width={18} />
                  </TouchableOpacity>
                </>
              ) : (
                false
              )}
              <Text
                children={'Report'}
                fonts={theme.fontFamily.TinosBold}
                textColor={theme.lightColor.darkGray}
                size={20}
                alignText={'center'}
                style={{marginTop: 10}}
              />
              <View style={[styles.underLine, {marginVertical: 8}]}></View>
              <TouchableOpacity>
                <Text
                  children={'Why are you reporting this post? '}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={18}
                />
              </TouchableOpacity>
              <Text
                children={
                  'Your report is anonymous. If someone is in immediate danger, call the local emergency services - don’t wait. '
                }
                fonts={theme.fontFamily.TinosRegular}
                textColor={theme.lightColor.darkGray}
                size={16}
                style={styles.paragraph}
              />
              <View style={[styles.underLine, {marginTop: 8}]}></View>
              <TouchableOpacity
                style={{paddingVertical: 8}}
                disabled={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? false
                    : true
                }
                onPress={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? () => {}
                    : () => {
                        offensivePostHandler(postID);
                      }
                }>
                <Text
                  children={'Offensive'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={18}
                  // style={{ width: '30%' }}
                  onPressHandler={
                    loginUserId === postUserId || alReadySignupId === postUserId
                      ? () => {}
                      : () => {
                          offensivePostHandler(postID);
                        }
                  }
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: theme.lightColor.underLine,
                  height: 1,
                  width: '100%',
                }}
              />
              <TouchableOpacity
                style={{paddingVertical: 8}}
                disabled={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? false
                    : true
                }
                onPress={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? () => {}
                    : () => {
                        spamPostHandler(postID);
                      }
                }>
                <Text
                  children={'Spam'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={18}
                  // style={{ width: '20%' }}
                  onPressHandler={
                    loginUserId === postUserId || alReadySignupId === postUserId
                      ? () => {}
                      : () => {
                          spamPostHandler(postID);
                        }
                  }
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: theme.lightColor.underLine,
                  height: 1,
                  width: '100%',
                }}
              />
              <TouchableOpacity
                style={{paddingVertical: 8}}
                disabled={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? false
                    : true
                }
                onPress={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? () => {}
                    : () => {
                        falseInformationPostHandler(postID);
                      }
                }>
                <Text
                  children={'False information'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={18}
                  // style={{ width: '50%' }}
                  onPressHandler={
                    loginUserId === postUserId || alReadySignupId === postUserId
                      ? () => {}
                      : () => {
                          falseInformationPostHandler(postID);
                        }
                  }
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: theme.lightColor.underLine,
                  height: 1,
                  width: '100%',
                }}
              />
              <TouchableOpacity
                style={{paddingVertical: 8}}
                disabled={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? false
                    : true
                }
                onPress={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? () => {}
                    : () => {
                        bullyingPostHandler(postID);
                      }
                }>
                <Text
                  children={'Bullying or harassment'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={18}
                  // style={{ width: '70%' }}
                  onPressHandler={
                    loginUserId === postUserId || alReadySignupId === postUserId
                      ? () => {}
                      : () => {
                          bullyingPostHandler(postID);
                        }
                  }
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: theme.lightColor.underLine,
                  height: 1,
                  width: '100%',
                }}
              />
              <TouchableOpacity
                style={{paddingVertical: 8}}
                disabled={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? false
                    : true
                }
                onPress={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? () => {}
                    : () => {
                        scamPostHandler(postID);
                      }
                }>
                <Text
                  children={'Scam or fraud'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={18}
                  // style={{ width: '45%' }}
                  onPressHandler={
                    loginUserId === postUserId || alReadySignupId === postUserId
                      ? () => {}
                      : () => {
                          scamPostHandler(postID);
                        }
                  }
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: theme.lightColor.underLine,
                  height: 1,
                  width: '100%',
                }}
              />
              <TouchableOpacity
                style={{paddingVertical: 8}}
                disabled={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? false
                    : true
                }
                onPress={
                  loginUserId === postUserId || alReadySignupId === postUserId
                    ? () => {}
                    : () => {
                        saleOfIllegalPostHandler(postID);
                      }
                }>
                <Text
                  children={'Sale of illegal or regulated goods'}
                  fonts={theme.fontFamily.TinosBold}
                  textColor={theme.lightColor.darkGray}
                  size={18}
                  // style={{ width: '100%' }}
                  onPressHandler={
                    loginUserId === postUserId || alReadySignupId === postUserId
                      ? () => {}
                      : () => {
                          saleOfIllegalPostHandler(postID);
                        }
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={{height: 50}} />
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerUnderLine: {
    height: 4.5,
    width: '25%',
    backgroundColor: theme.lightColor.underLine,
    borderRadius: 10,
  },
  underLine: {
    height: 1.5,
    width: '100%',
    backgroundColor: theme.lightColor.underLine,
  },
  mainContainer: {
    paddingHorizontal: 25,
  },
  paragraph: {
    marginTop: 8,
    marginBottom: 6,
  },
});
