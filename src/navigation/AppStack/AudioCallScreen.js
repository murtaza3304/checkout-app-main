import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ScaledSize,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
} from 'react-native-agora';
import AudioCallIconSvg from '../../assests/icons/svg/chatSvgs/AudioCallIconSvg';
import VideoCallIconSvg from '../../assests/icons/svg/chatSvgs/VideoCallIconSvg';
import {theme} from '../../assests/theme/Theme';
import {BASE_URL, socket} from '../../../config';
import {useSelector} from 'react-redux';
import ProfileHeader from '../../components/common/profileHeader/ProfileHeader';
import {windowHeight, windowWidth} from '../../utils/Dimentions';
import NewAudioCallIconSvg from '../../assests/icons/svg/chatSvgs/NewAudioCallIconSvg';
import RecCallIconSvg from '../../assests/icons/svg/homeSvgs/RecCallIconSvg';
import MicSvg from '../../assests/icons/svg/chatSvgs/MicSvg';
import SpeakerSvg from '../../assests/icons/svg/chatSvgs/SpeakerSvg';
import FocusAwareStatusBar from '../authStack/FocusAwareStatusBar';
import {navigate, navigateToNestedRoute} from '../../../App';
import UTC_Time from '../../utils/UTC_Time';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const AudioCallScreen = ({navigation, route}) => {
  const {convertUTC_Time} = UTC_Time();
  const user = route.params;
  const {type} = route.params;
  const [appId, setppId] = useState('a39d4c9fd2234e53a99f7fdfb518642b');
  const [iJoinSucceed, setJoinSucceed] = useState(false);
  const [userBusy, setUserBusy] = useState(false);
  const currentUserLoginData = useSelector(store => store?.AuthReducers?.user);
  const [callTimeStart, setCallTimeStart] = useState(null);
  const [callTime, setCallTime] = useState(null);
  const [isMute, setIsMute] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [acceptCall, setAcceptCall] = useState('initial');
  const [changeAccept, setChangeAccept] = useState('');
  const [count, setCount] = React.useState(0);
  const intervalRef = useRef(null);
  var engine = createAgoraRtcEngine();
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };
  useEffect(() => {
    socket.on('endCall', data => {
      if (data.acceptCall == false) {
        engine.leaveChannel({
          stopAllEffect: true,
        });
        disConnentUserHandler();
        navigate('Chats');
      }
    });
  }, []);
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
    if (Platform.OS == 'android') {
      getPermission();
    }
    if (type != 'recieved') {
      if (user?.user?.socketId[0]?.socketId) {
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
                callType: 'Audio',
              });

              engine.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
              );
              const callConnectResponse = engine.joinChannel(
                result.token,
                user.user.socketId[0].socketId,
                2,
              );
              console.log('Host res', callConnectResponse);
            } else if (result?.error && result?.error == 'user busy') {
              setUserBusy(true);
              setTimeout(() => {
                engine.leaveChannel({
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
              console.log('response from api---->>>>', res.data);
            })
            .catch(err => console.log('error while calling api history', err));
        })
        .catch(err => console.log('error while calling async token', err));
    }
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
      engine.leaveChannel();
      disConnentUserHandler();
      navigate('Chats');
      clearInterval(intervalRef.current);
    } else if (changeAccept !== 'no' && acceptCall === 'Accepted') {
      clearInterval(intervalRef.current);
    }
  }, [acceptCall]);

  const init = async () => {
    if (Platform.OS == 'android') {
      getPermission();
    }
    console.log('Trying to create');
    const initinit = engine.initialize({
      appId: appId,
    });

    // Enable the audio module.
    console.log('Engine Created');
    const audio = engine.enableAudio();

    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    engine.addListener('onUserJoined', uid => {
      console.log('UserJoined', uid);
      setJoinSucceed(true);

      setCallTimeStart(new Date().getTime());
      const data = {
        callReceiverId:
          type === 'recieved' ? user?.user?.senderId : user.user.receiverId,
        callSenderId:
          type === 'recieved' ? user.user.receiverId : user?.user?.senderId,
        isAccept: true,
        callTime: convertUTC_Time(),
      };

      // console.log(data, type, 'data------------------------->');
      if (type === 'recieved') {
        setJoinSucceed(true);
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
                  'response from api accept call api---->>>>',
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
    engine.addListener('onUserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      setJoinSucceed(false);
      engine.leaveChannel({
        stopAllEffect: true,
      });
      navigate('Chats');
      disConnentUserHandler();
    });
    // This callback occurs when the local user successfully joins the channel.
    engine.addListener('onJoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      setCallTimeStart(new Date().getTime());
    });
    engine.addListener('onError', err => {
      console.log('onError', err);
      disConnentUserHandler();
    });
    console.log('listeners added');
  };
  const onAcceptCall = () => {
    engine.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
    const remoteRes = engine.joinChannel(
      user.user.signal.token,
      user.user.signal.channelName,
      1,
    );
    setAcceptCall('Accepted');

    // console.log('socket id+++++++++++:', user.user.senderId);

    if (user.user.senderId) {
      socket.emit('startCall', {receiverId: user.user.senderId});
    }
  };
  const onEndCall = () => {
    if (!iJoinSucceed) {
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
    }
    engine.leaveChannel({
      stopAllEffect: true,
    });
    disConnentUserHandler();
  };
  useEffect(() => {
    init();
  }, []);
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

  useEffect(() => {
    engine.adjustRecordingSignalVolume(isMute ? 0 : 100);
    engine.setEnableSpeakerphone(isSpeaker);
  }, [isMute, isSpeaker]);

  return (
    <View style={styles.main}>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={theme.lightColor.lightBlue}
      />
      <View
        style={{
          height: windowWidth * 1.2,
          width: windowWidth * 1.3,
          backgroundColor: theme.lightColor.lightBlue,
          marginTop: -windowWidth * 2,
          borderRadius: 1000,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontFamily: theme.fontFamily.TinosBold,

            fontWeight: theme.fontWeight.bold,
            color: 'black',
            marginTop: 120,
          }}>
          {iJoinSucceed
            ? 'Connected'
            : type != 'recieved'
            ? userBusy
              ? 'On another Call'
              : 'Dialing'
            : 'In Coming'}
        </Text>
      </View>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          flex: 1,
          // justifyContent: 'space-between',
        }}>
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            backgroundColor: '#E7E6E6',
            alignSelf: 'center',
            marginTop: windowWidth * 1.2 - windowWidth * 0.68,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              user?.user?.picture || user?.user?.profilePic
                ? {
                    uri: user?.user?.picture
                      ? user?.user?.picture
                      : user?.user?.profilePic,
                  }
                : require('../../assests/images/userIconImage.png')
            }
            style={{
              height: 65,
              width: 65,
              borderRadius: 100,
              resizeMode: 'center',
            }}
          />
        </View>
        <View
          style={{
            height: windowHeight * 0.49,
            width: '90%',
            borderRadius: 10,
            backgroundColor: theme.lightColor.newBodyColor,
            alignSelf: 'center',
            paddingHorizontal: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            marginTop: 30,
          }}>
          <View
            style={{
              height: '40%',
              width: '100%',
              borderBottomWidth: 1,
              borderColor: '#C7C7CD',
              // backgroundColor: 'red',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                fontFamily: theme.fontFamily.TinosBold,
                marginTop: 20,
                fontWeight: theme.fontWeight.bold,
                color: theme.lightColor.black,
              }}>
              {type == 'recieved'
                ? user?.user?.name
                : user?.user?.firstName + ' ' + user?.user?.lastName}
            </Text>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontFamily: theme.fontFamily.TinosRegular,
                marginTop: 10,
                color: theme.lightColor.black,
              }}>
              {iJoinSucceed ? callTime : ''}
            </Text>
          </View>
          <View
            style={{
              height: '60%',
              width: '100%',
              paddingVertical: 20,
              borderColor: 'silver',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'red',
              }}>
              {iJoinSucceed && (
                <>
                  <TouchableOpacity
                    onPress={() => setIsMute(!isMute)}
                    style={{
                      backgroundColor: isMute
                        ? '#E7E6E6'
                        : theme.lightColor.newBodyColor,
                      height: 75,
                      width: 75,
                      borderRadius: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MicSvg />
                    <Text
                      style={{
                        marginTop: 3,
                        fontFamily: theme.fontFamily.TinosRegular,
                        fontSize: 12,
                        color: theme.lightColor.black,
                      }}>
                      {isMute ? 'Unmute' : 'Mute'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsSpeaker(!isSpeaker)}
                    style={{
                      backgroundColor: isSpeaker
                        ? '#E7E6E6'
                        : theme.lightColor.newBodyColor,
                      height: 75,
                      width: 75,
                      borderRadius: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SpeakerSvg />
                    <Text
                      style={{
                        marginTop: 3,
                        fontFamily: theme.fontFamily.TinosRegular,
                        fontSize: 12,
                        color: theme.lightColor.black,
                      }}>
                      Speaker
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent:
                  type == 'recieved' && !iJoinSucceed
                    ? 'space-between'
                    : 'center',
                // backgroundColor: 'green',
              }}>
              {type == 'recieved' && !iJoinSucceed && (
                <TouchableOpacity onPress={() => onAcceptCall()}>
                  <RecCallIconSvg />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  onEndCall();
                  let data = {
                    user_Id:
                      type == 'recieved' ? user?.user?.senderId : user.user._id,
                  };
                  console.log('dataaaa--------->>>>', data);
                  socket.emit('endCall', data);
                  engine.leaveChannel({
                    stopAllEffect: true,
                  });
                  navigate('Chats');
                }}>
                <NewAudioCallIconSvg color={theme.lightColor.red} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AudioCallScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.lightColor.newBodyColor,
  },
  profile: {
    height: 200,
    width: 200,
    borderRadius: 130,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//{"data": {"__v": 0, "_id": "65213971635ad544b9fe91a5", "author": "651d367bd88adc10c6ef596c", "callReceiverId": "651d3859d88adc10c6ef5cac", "callSenderId": "651d367bd88adc10c6ef596c", "callTime": "3:56 PM", "durations": "1", "isAccept": false}, "message": "Call created successfully", "success": true}
