import {View, StyleSheet, Pressable, FlatList} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {theme} from '../../assests/theme/Theme';
import FocusAwareStatusBar from '../authStack/FocusAwareStatusBar';
import ChatHeader from '../../components/common/chatHeader/ChatHeader';
import {Text} from '../../components/common/text/Text';
import {CHAT_BUTTONS} from '../../utils/ConstantData';
import ChatsCall from '../../screens/app/chats/ChatsCall';
import ChatHook from '../../customHooks/chatHooks/ChatHook';
import {socket} from '../../../config';
import {Loader} from '../../components/common/loader/Loader';
import {useFocusEffect} from '@react-navigation/native';
import ChatCard from '../../screens/app/chats/ChatCard';
import {IS_ACTIVE_USER} from '../../redux/types/ActionsTypes';
import {useDispatch, useSelector} from 'react-redux';
export default function Chats({navigation}) {
  const dispatch = useDispatch();
  const activeUser = useSelector(store => store?.ChatReducers?.isActiveUser);

  // state
  const {
    getAllChatUserHandler,
    loading,
    allChatUsers,
    currentUserLoginData,
    deleteChatUsers,
    blockChatUsers,
    getAllCallUserHandler,
    allCallUsers,
    reFreshControlChat,
    refreshing,
    footerLoading,
    fetchMoreChatUsers,
    reFreshControlCall,
    fetchMoreCallUsers,
    deleteCallUsers,
  } = ChatHook({navigation});

  // console.log('allChatUsers*********>>>>>', allChatUsers);
  // hook calling for call users

  // states
  const [chatTopTabs, setchatTopTabs] = useState(CHAT_BUTTONS);

  // get all chat user
  useFocusEffect(
    useCallback(() => {
      if (chatTopTabs[0].pressed) {
        getAllChatUserHandler();
      } else {
        getAllCallUserHandler();
      }
    }, [deleteChatUsers, blockChatUsers, deleteCallUsers, chatTopTabs]),
  );

  useEffect(() => {
    if (currentUserLoginData?._id) {
      socket.emit('addUser', currentUserLoginData?._id, currentUserLoginData);
    }
  }, [currentUserLoginData?._id]);

  useEffect(() => {
    socket.on('activeUsers', users => {
      dispatch({
        type: IS_ACTIVE_USER,
        payload: {
          users,
          logInUser: currentUserLoginData?._id,
        },
      });
    });
  }, [currentUserLoginData?._id]);

  useEffect(() => {
    socket.on('getUsers', users => {
      dispatch({
        type: IS_ACTIVE_USER,
        payload: {
          users,
          logInUser: currentUserLoginData?._id,
        },
      });
    });
  }, [currentUserLoginData?._id]);

  const focusedHandler = Pindex => {
    let tempArray = chatTopTabs.map((item, index) => {
      if (index == Pindex) {
        if (item.pressed == false) {
          return {...item, pressed: true};
        } else {
          return {...item};
        }
      } else {
        return {...item, pressed: false};
      }
    });
    setchatTopTabs(tempArray);
  };
  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ChatHeader navigation={navigation} />
      <View style={styles.mainContainer}>
        {chatTopTabs[0].pressed ? (
          <Text
            children={'Messages'}
            textColor={theme.lightColor.darkGray}
            fonts={theme.fontFamily.TinosBold}
            size={17}
          />
        ) : (
          <Text
            children={'Calls'}
            textColor={theme.lightColor.darkGray}
            fonts={theme.fontFamily.TinosBold}
            size={17}
          />
        )}
        <View style={styles.btnContainer}>
          {chatTopTabs.map((items, index) => (
            <Pressable
              onPress={() => focusedHandler(index)}
              key={index}
              style={[
                styles.buttonStyles,
                {
                  borderBottomColor: items.pressed
                    ? theme.lightColor.headerBg
                    : theme.lightColor.bodyColor,
                  width: items.width,
                },
              ]}>
              <Text
                children={items.title}
                textColor={
                  items.pressed
                    ? theme.lightColor.headerBg
                    : theme.lightColor.gray
                }
                fonts={theme.fontFamily.TinosRegular}
                size={15}
                style={{paddingBottom: 6}}
                onPressHandler={() => focusedHandler(index)}
              />
            </Pressable>
          ))}
        </View>
      </View>

      {loading ? (
        <View
          style={{
            height: '60%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Loader color={theme.lightColor.headerBg} size={40} />
        </View>
      ) : chatTopTabs[0].pressed ? (
        allChatUsers?.length > 0 ? (
          <FlatList
            data={allChatUsers}
            keyExtractor={item => item?._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <ChatCard
                key={index}
                navigation={navigation}
                cardItems={item}
                activeUser={activeUser}
              />
            )}
            onRefresh={() => {
              reFreshControlChat();
            }}
            refreshing={refreshing}
            onEndReached={() => fetchMoreChatUsers()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              footerLoading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 6,
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
          <View
            style={{
              height: '60%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              children={'No results found'}
              fonts={theme.fontFamily.TinosRegular}
              textColor={theme.lightColor.darkGray}
              weight={theme.fontWeight.bold}
              size={16}
            />
          </View>
        )
      ) : allCallUsers?.length > 0 ? (
        <FlatList
          data={allCallUsers}
          keyExtractor={item => item?._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ChatsCall
              index={index}
              key={index}
              activeUser={activeUser}
              item={item}
              navigation={navigation}
            />
          )}
          onRefresh={() => {
            reFreshControlCall();
          }}
          refreshing={refreshing}
          onEndReached={() => fetchMoreCallUsers()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            footerLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 6,
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
        <View
          style={{
            height: '60%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            children={'No results found'}
            fonts={theme.fontFamily.TinosRegular}
            textColor={theme.lightColor.darkGray}
            weight={theme.fontWeight.bold}
            size={16}
          />
        </View>
      )}
      <View style={{height: 65}} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  mainContainer: {
    paddingHorizontal: 30,
  },
  buttonStyles: {
    borderBottomWidth: 2,
  },
  btnContainer: {
    marginTop: 20,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
