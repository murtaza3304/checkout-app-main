import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../assests/theme/Theme';
import FocusAwareStatusBar from '../authStack/FocusAwareStatusBar';
import SearchHeader from '../../components/common/searchHeader/SearchHeader';
import NotificationCard from '../../components/common/notificationCard/NotificationCard';
import {useSelector, useDispatch} from 'react-redux';
import {getNotifications} from '../../redux/actions/NotificationAction';
import {Loader} from '../../components/common/loader/Loader';
import {Text} from '../../components/common/text/Text';

export default function Notification({navigation}) {
  const dispatch = useDispatch();

  // store data
  const notificationList = useSelector(
    state => state?.NotificationReducers?.isNotification,
  );

  // states
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [hasReachesEnd, setHasReachesEnd] = useState(false);

  // get all notification
  useEffect(() => {
    notificationPages = 1;
    setHasReachesEnd(false);
    dispatch(getNotifications(1, setLoading, setHasReachesEnd));
  }, []);

  // refresh control
  const handleRefresh = () => {
    notificationPages = 1;
    setHasReachesEnd(false);
    dispatch(getNotifications(1, setLoading, setHasReachesEnd));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // load more notifications
  const fetchMore = () => {
    notificationPages += 1;
    if (!hasReachesEnd) {
      dispatch(
        getNotifications(notificationPages, setFooterLoading, setHasReachesEnd),
      );
    }
  };

  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <SearchHeader
        navigation={navigation}
        headerText={`Notifications`}
        headerTextStyles={styles.resultContainer}
        textSize={18}
        placeHoldertxt={'Search'}
        showInput={false}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <Loader color={theme.lightColor.headerBg} size={40} />
        </View>
      ) : notificationList?.length > 0 ? (
        <FlatList
          data={notificationList}
          renderItem={({item, index}) => (
            <View style={styles.flatContainer} key={index}>
              {item?.seen ? false : <View style={styles.circle} />}
              <NotificationCard
                navigation={navigation}
                cardsData={item}
                index={index}
              />
            </View>
          )}
          keyExtractor={item => item?._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: notificationList?.length > 4 ? 0 : 18,
          }}
          onRefresh={() => {
            handleRefresh();
          }}
          refreshing={refreshing}
          onEndReached={() => fetchMore()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            footerLoading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 6,
                  backgroundColor: 'transparent',
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
  maincontainer: {
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  resultContainer: {
    position: 'absolute',
    top: 155,
    width: '100%',
    paddingTop: 8,
    paddingHorizontal: 48,
  },
  loadingContainer: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  circle: {
    backgroundColor: theme.lightColor.headerBg,
    height: 8,
    width: 8,
    borderRadius: 50,
  },
});
