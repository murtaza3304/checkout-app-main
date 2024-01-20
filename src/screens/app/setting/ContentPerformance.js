import {View, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Text} from '../../../components/common/text/Text';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import {theme} from '../../../assests/theme/Theme';
import ChatHeader from '../../../components/common/chatHeader/ChatHeader';
import ImpressionCard from '../../../components/common/impressions/ImpressionCard';
import {useDispatch, useSelector} from 'react-redux';
import {getAllboostPosts} from '../../../redux/actions/Actions';
import {Loader} from '../../../components/common/loader/Loader';

export default function ContentPerformance({navigation}) {
  const dispatch = useDispatch();
  // store data
  const boostPosts = useSelector(store => store?.Reducers?.isGetAllBoostPosts);

  // states
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [hasReachesEnd, setHasReachesEnd] = useState(false);

  // get all boosts posts handler
  useEffect(() => {
    boostPostPage = 1;
    setHasReachesEnd(false);
    dispatch(getAllboostPosts(1, setLoading, setHasReachesEnd));
  }, []);

  // control refresh
  const handleRefresh = () => {
    boostPostPage = 1;
    setHasReachesEnd(false);
    dispatch(getAllboostPosts(1, setLoading, setHasReachesEnd));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // load more posts
  const fetchMore = () => {
    boostPostPage += 1;
    if (!hasReachesEnd) {
      dispatch(
        getAllboostPosts(boostPostPage, setFooterLoading, setHasReachesEnd),
      );
    }
  };

  return (
    <View style={styles.mainScreen}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ChatHeader navigation={navigation} />
      <View style={styles.screen}>
        <Text
          children={'Top performing posts'}
          size={20}
          textColor={theme.lightColor.darkGray}
          fonts={theme.fontFamily.TinosBold}
          weight={theme.fontWeight.bold}
          style={{marginLeft: 33, marginBottom: 10}}
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <Loader color={theme.lightColor.headerBg} size={40} />
          </View>
        ) : boostPosts?.length > 0 ? (
          <FlatList
            data={boostPosts}
            renderItem={({item, index}) => (
              <ImpressionCard
                key={index}
                iconGraph={true}
                cardItems={item}
                navigation={navigation}
              />
            )}
            contentContainerStyle={{paddingHorizontal: 33}}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  loadingContainer: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
