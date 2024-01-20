import React, {useRef, useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  RtcSurfaceView,
  VideoSourceType,
} from 'react-native-agora';
import NewAudioCallIconSvg from '../../assests/icons/svg/chatSvgs/NewAudioCallIconSvg';
import {windowHeight, windowWidth} from '../../utils/Dimentions';
import {navigate, navigateToNestedRoute} from '../../../App';
import CameraIconSvg from '../../assests/icons/svg/chatSvgs/CameraIconSvg';
import MicSvg from '../../assests/icons/svg/chatSvgs/MicSvg';
import VideoCallIconSvg from '../../assests/icons/svg/chatSvgs/VideoCallIconSvg';
import {SvgFromXml} from 'react-native-svg';
import Xmls from '../../utils/Xmls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, socket} from '../../../config';
import UTC_Time from '../../utils/UTC_Time';
import {useSelector} from 'react-redux';
import AudioCallIconSvg from '../../assests/icons/svg/chatSvgs/AudioCallIconSvg';
import axios from 'axios';
import RecCallIconSvg from '../../assests/icons/svg/homeSvgs/RecCallIconSvg';
import CrossIconSvg from '../../assests/icons/svg/homeSvgs/CrossIconSvg';
import {theme} from '../../assests/theme/Theme';
const appId = 'a39d4c9fd2234e53a99f7fdfb518642b';
const VideoCallScreen = ({navigation, route}) => {
  const {convertUTC_Time} = UTC_Time();
  const currentUserLoginData = useSelector(store => store?.AuthReducers?.user);
  const user = route.params;
  const {type} = route.params;
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [userBusy, setUserBusy] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [isMute, setIsMute] = useState(false);
  const [callTimeStart, setCallTimeStart] = useState(null);
  const [callTime, setCallTime] = useState(null);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [acceptCall, setAcceptCall] = useState('initial');
  const [isRemotejoined, setRemoteJoined] = useState(false);
  const [changeAccept, setChangeAccept] = useState('');
  const [count, setCount] = React.useState(0);
  const [switchView, setSwitchView] = useState(false);
  const intervalRef = useRef(null);
  var agoraEngine = createAgoraRtcEngine();
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };
  ////////Initialize Agora engine when the app starts & rigesters the listeners on engine
  useEffect(() => {
    setupVoiceSDKEngine();
  }, []);
  const disConnentUserHandler = async () => {
    try {
      let user = await AsyncStorage.getItem('userDetails');
      user = JSON.parse(user);
      let token = user?.token;

      const response = await axios.get(
        `${BASE_URL}/api/user/disconnectUser?userId=${currentUserLoginData?._id}`,
        {
          headers: {
            'access-control-allow-origin': '*',
            Authorization: token,
          },
        },
      );
      console.log(response, 'response to get disconnect user');
    } catch (error) {
      console.log(error, 'get disconnect user error');
    }
  };
  const setupVoiceSDKEngine = async () => {
    // use the helper function to get permissions
    if (Platform.OS === 'android') {
      getPermission();
    }
    const init = agoraEngine?.initialize({
      appId: appId,
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    // Enable the video module.
    console.log('Engine Created', init);
    agoraEngine?.enableVideo();
    // This callback occurs when the remote user successfully joins the channel.
    agoraEngine?.addListener('onUserJoined', uid => {
      setRemoteJoined(true);
      setRemoteUid(uid.localUid);
      setCallTimeStart(new Date().getTime());
      const data = {
        callReceiverId:
          type === 'recieved' ? user?.user?.senderId : user.user.receiverId,
        callSenderId:
          type === 'recieved' ? user.user.receiverId : user?.user?.senderId,
        isAccept: true,
        callTime: convertUTC_Time(),
      };

      if (type === 'recieved') {
        setAcceptCall('Accepted');
        AsyncStorage.getItem('userDetails')
          .then(response => {
            let token = JSON.parse(response);
            axios
              .post(
                `${BASE_URL}/api/acceptCall`,
                {...data},
                {
                  headers: {
                    'access-control-allow-origin': '*',
                    Authorization: token?.token,
                  },
                },
              )
              .then(res => {
                console.log(
                  'response from api when remote user is joining---->>>>',
                  res.data,
                );
              })
              .catch(err =>
                console.log('error while accept calling api ', err),
              );
          })
          .catch(err => console.log('error while calling async token', err));
      }
    });
    // This callback occurs when the remote user leaves the channel or drops offline.
    agoraEngine?.addListener('onUserOffline', (uid, reason) => {
      setRemoteUid(0);
      agoraEngine?.leaveChannel({
        stopAllEffect: true,
      });
      disConnentUserHandler();
      navigate('Chats');
    });
    // This callback occurs when the local user successfully joins the channel.
    agoraEngine?.addListener(
      'onJoinChannelSuccess',
      (channel, uid, elapsed) => {
        setIsJoined(true);
        setCallTimeStart(new Date().getTime());
      },
    );
    agoraEngine?.addListener('onError', err => {
      console.log('onError', err);
    });
    console.log('listeners added');
  };
  //// this effect joins the user's local agora chanel
  useEffect(() => {
    if (Platform.OS == 'android') {
      getPermission();
    }
    if (type != 'recieved') {
      if (user?.user?.socketId[0]?.socketId) {
        // console.log(
        //   'socket id of remote user',
        //   user?.user?.socketId[0]?.socketId,
        // );
        fetch(
          `${BASE_URL}/api/user/agoraToken?channelName=${user?.user?.socketId[0]?.socketId}&remoteId=${user?.user?._id}&userId=${currentUserLoginData?._id}&uid=&role=host`,
          {
            method: 'GET',
          },
        )
          .then(res => res.json())
          .then(result => {
            console.log('result from agora token generation', result);
            if (result.token) {
              socket.emit('callUser', {
                //receiverID IS THE FRIEND ID FORCALL
                receiverId: user.user.socketId[0].userId,
                senderId: currentUserLoginData._id,
                signal: {
                  token: result.token,
                  channelName: user.user.socketId[0].socketId,
                },
                // SOCKET IS THE ACTIVE USER
                socketId: user.user.socketId[0].socketId,
                name: currentUserLoginData.firstName,
                picture: currentUserLoginData?.profilePic,
                remoteUserId: 1,
              });
              agoraEngine?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
              );
              agoraEngine?.startPreview();
              agoraEngine?.joinChannel(
                result?.token,
                user?.user?.socketId[0]?.socketId,
                2,

                {
                  clientRoleType: ClientRoleType.ClientRoleBroadcaster,
                },
              );
              setIsJoined(true);
            } else if (result?.error && result?.error == 'user busy') {
              setUserBusy(true);
              setTimeout(() => {
                agoraEngine.leaveChannel({
                  stopAllEffect: true,
                });
                disConnentUserHandler();
                navigate('Chats');
              }, 2000);
            }
          })
          .catch(errr => console.log('error while calling ', errr));
      }
      let data = {
        callReceiverId: user?.user?._id,
        callTime: convertUTC_Time(),
        durations: '1',
      };
      // second api call for making call request history to server
      AsyncStorage.getItem('userDetails')
        .then(response => {
          let token = JSON.parse(response);
          axios
            .post(
              `${BASE_URL}/api/call`,
              {...data},
              {
                headers: {
                  'access-control-allow-origin': '*',
                  Authorization: token?.token,
                },
              },
            )
            .then(res => {
              if (res.success) {
                console.log('createCallResponse', res.success);
              }
            })
            .catch(err => console.log('error while calling api history', err));
        })
        .catch(err => console.log('error while calling async token', err));
    }
  }, []);
  //on end call socket trigger
  useEffect(() => {
    socket.on('endCall', data => {
      if (data.acceptCall == false) {
        agoraEngine?.leaveChannel({
          stopAllEffect: true,
        });
        disConnentUserHandler();
        setIsJoined(false);
        navigate('Chats');
      }
    });
  }, []);
  ///////when the user accept the call
  const onAcceptCall = () => {
    agoraEngine?.setChannelProfile(
      ChannelProfileType.ChannelProfileCommunication,
    );
    console.log(
      'parameters for remote user joining call',
      user.user.signal.token,
      user.user.signal.channelName,
    );
    agoraEngine?.startPreview();
    agoraEngine?.joinChannel(
      user.user.signal.token,
      user.user.signal.channelName,
      1,
      {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      },
    );
    setAcceptCall('Accepted');
    if (user.user.senderId) {
      socket.emit('startCall', {receiverId: user.user.senderId});
    }
  };
  // on end call the handler will be called to leave the agora channel
  const leave = () => {
    try {
      if (!isRemotejoined) {
        let datas = {
          user_Id: type == 'recieved' ? user?.user?.senderId : user.user._id,
        };
        socket.emit('endCall', datas);
        console.log(
          'receiverId:',
          user?.user._id,
          'senderIs: ',
          currentUserLoginData?._id,
        );
        const data = {
          callReceiverId:
            type === 'recieved' ? user?.user?.senderId : user?.user._id,
          callSenderId:
            type === 'recieved'
              ? user.user.receiverId
              : currentUserLoginData?._id,
          isAccept: false,
          callTime: convertUTC_Time(),
        };
        AsyncStorage.getItem('userDetails')
          .then(response => {
            let token = JSON.parse(response);
            if (data) {
              axios
                .post(
                  `${BASE_URL}/api/acceptCall`,
                  {...data},
                  {
                    headers: {
                      'access-control-allow-origin': '*',
                      Authorization: token?.token,
                    },
                  },
                )
                .then(res => {
                  console.log(
                    'response from api on Reject call api---->>>>',
                    res.data,
                  );
                  setIsJoined(false);
                  disConnentUserHandler();
                  navigate('Chats');
                })
                .catch(err =>
                  console.log('error while Reject calling api ', err),
                );
            }
          })
          .catch(err =>
            console.log('error while reject calling async token', err),
          );
      } else {
        console.log('else while leaving in --------------------------->');
        agoraEngine?.leaveChannel({
          stopAllEffect: true,
        });
        setRemoteUid(0);
        setIsJoined(false);
        setRemoteJoined(false);
        navigate('Chats');
        disConnentUserHandler();
      }
    } catch (e) {
      console.log(e);
    }
  };

  function trackCallTime(callStartTime) {
    // Get the current time
    const currentTime = new Date();

    // Calculate the elapsed time in milliseconds
    const elapsedTime = currentTime - callStartTime;

    // Convert elapsed time to seconds and minutes
    const elapsedSeconds = parseInt(elapsedTime / 1000);
    const elapsedMinutes = parseInt(elapsedSeconds / 60);

    return {
      seconds: elapsedSeconds % 60,
      minutes: elapsedMinutes,
    };
  }
  useEffect(() => {
    socket.on('callAccepted', data => {
      // console.log('Accepted socket data------>', data);
      if (data) {
        setAcceptCall('Accepted');
        setChangeAccept('yes');
        clearInterval(intervalRef.current);
      }
    });
  }, []);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (count < 10) {
        setCount(prevCount => prevCount + 1);
        setAcceptCall('notAccepted');
        setChangeAccept('no');
        disConnentUserHandler();
      } else {
        clearInterval(intervalRef.current);
        disConnentUserHandler();
      }
    }, 10000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [count]);

  React.useEffect(() => {
    if (changeAccept !== 'no' && acceptCall === 'notAccepted') {
      leave();
      clearInterval(intervalRef.current);
      disConnentUserHandler();
    } else if (changeAccept !== 'no' && acceptCall === 'Accepted') {
      clearInterval(intervalRef.current);
    }
  }, [acceptCall]);
  useEffect(() => {
    let intervalId;
    if (callTimeStart !== null) {
      const time = callTimeStart;
      intervalId = setInterval(() => {
        const elapsed = trackCallTime(time);
        // console.log(
        //   `Function was called after ${elapsed.minutes} minutes and ${elapsed.seconds} seconds.`,
        // );

        setCallTime(
          `${
            elapsed.minutes < 10 ? '0' + elapsed.minutes : elapsed.minutes
          } : ${
            elapsed.seconds < 10 ? '0' + elapsed.seconds : elapsed.seconds
          }`,
        );
      }, 1000);
    }
    return () => {
      // Clear the interval when the component unmounts
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [callTimeStart]);
  const switchCam = () => {
    agoraEngine?.switchCamera();
  };
  useEffect(() => {
    agoraEngine?.adjustRecordingSignalVolume(isMute ? 0 : 100);
    agoraEngine?.setEnableSpeakerphone(isSpeaker);
  }, [isMute]);

  return (
    <SafeAreaView style={styles.main}>
      {type === 'recieved' && !isRemotejoined ? (
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  backgroundColor: 'white',
                  alignSelf: 'center',
                }}
                resizeMode="contain"
                source={
                  user?.user?.picture || user?.user?.profilePic
                    ? {
                        uri: user?.user?.picture
                          ? user?.user?.picture
                          : user?.user?.profilePic,
                      }
                    : require('../../assests/images/userIconImage.png')
                }></Image>
              <Text
                style={{
                  marginTop: 15,
                  color: 'white',
                  fontSize: 22,
                  textAlign: 'center',
                  fontFamily: theme.fontFamily.TinosBold,
                  fontWeight: theme.fontWeight.bold,
                }}>
                {type == 'recieved'
                  ? user?.user?.name
                  : user?.user?.firstName + ' ' + user?.user?.lastName}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: theme.fontFamily.TinosBoldItalic,
                }}>
                {isJoined ? callTime : 'Incoming Video Call'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'yellow',
              justifyContent: 'flex-end',
              paddingBottom: '10%',
            }}>
            <View
              style={{
                // backgroundColor: 'purple',
                justifyContent: 'space-between',
                width: '100%',
                flexDirection: 'row',
                paddingHorizontal: 30,
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    leave();
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 30,
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CrossIconSvg color={'white'} />
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: 5,
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: theme.fontFamily.TinosBoldItalic,
                    fontSize: 16,
                  }}>
                  DECLINE
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    onAcceptCall();
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 30,
                    backgroundColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <VideoCallIconSvg color={'white'} />
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: 5,
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: theme.fontFamily.TinosBoldItalic,
                    fontSize: 16,
                  }}>
                  ANSWER
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <React.Fragment key={0}>
          <RtcSurfaceView
            canvas={
              switchView
                ? {uid: 0}
                : {uid: isJoined ? (type == 'recieved' ? 2 : 1) : 0}
            }
            style={styles.videoView}
          />
          {type !== 'recieved' && !isRemotejoined ? (
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                height: windowHeight,
                width: windowWidth,
              }}>
              <View style={{marginTop: 100}}>
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    backgroundColor: 'white',
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                  source={
                    user?.user?.picture || user?.user?.profilePic
                      ? {
                          uri: user?.user?.picture
                            ? user?.user?.picture
                            : user?.user?.profilePic,
                        }
                      : require('../../assests/images/userIconImage.png')
                  }></Image>
                <Text
                  style={{
                    marginTop: 15,
                    color: 'white',
                    fontSize: 22,
                    textAlign: 'center',
                    fontFamily: theme.fontFamily.TinosBold,
                    fontWeight: theme.fontWeight.bold,
                  }}>
                  {type == 'recieved'
                    ? user?.user?.name
                    : user?.user?.firstName + ' ' + user?.user?.lastName}
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: theme.fontFamily.TinosBoldItalic,
                  }}>
                  {userBusy ? 'On another Call' : 'OutGoing Video Call'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  leave();
                }}
                style={{
                  height: windowHeight * 0.58,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <NewAudioCallIconSvg
                  color={'white'}
                  height={50}
                  width={50}
                  opacity={'1'}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                position: 'absolute',
                bottom: 80,
                backgroundColor: 'transparent',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  marginTop: 5,
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: theme.fontFamily.TinosBold,
                  fontWeight: theme.fontWeight.bold,
                  fontSize: 16,
                }}>
                {callTime}
              </Text>
            </View>
          )}
          <View
            style={{
              width: '100%',
              // height: 100,
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: 'transparent',
              position: 'absolute',
              bottom: 20,
              alignItems: 'center',
            }}>
            {isJoined && acceptCall == 'Accepted' ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    switchCam();
                  }}>
                  <SvgFromXml xml={Xmls.switch} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SvgFromXml xml={Xmls.vid} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsMute(!isMute);
                  }}>
                  <SvgFromXml xml={isMute ? Xmls.micFocused : Xmls.mic} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsSpeaker(!isSpeaker);
                  }}>
                  <SvgFromXml
                    xml={!isSpeaker ? Xmls.speaker : Xmls.speakerFocused}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    leave();
                  }}>
                  <NewAudioCallIconSvg
                    color={'white'}
                    height={50}
                    width={50}
                    opacity={'1'}
                  />
                </TouchableOpacity>
              </>
            ) : (
              false
            )}
          </View>
        </React.Fragment>
      )}

      {isJoined && remoteUid > 0 ? (
        <React.Fragment key={1}>
          <RtcSurfaceView
            onStartShouldSetResponder={() => {
              setSwitchView(!switchView);
              console.log('Magic tap');
            }}
            canvas={
              switchView
                ? {uid: isJoined ? (type == 'recieved' ? 2 : 1) : 0}
                : {uid: 0}
            }
            style={styles.smallVideoView}
          />
        </React.Fragment>
      ) : (
        false
      )}
    </SafeAreaView>
  );
};
export default VideoCallScreen;
const styles = StyleSheet.create({
  main: {flex: 1},
  videoView: {width: windowWidth * 1, height: windowHeight * 1},
  smallVideoView: {
    position: 'absolute',
    height: 140,
    width: 100,
    backgroundColor: 'green',
    bottom: windowHeight * 0.77,
    left: 10,
  },
});
