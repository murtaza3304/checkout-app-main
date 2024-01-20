import {View, StyleSheet, Image, FlatList, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import ChatHeader from '../../../components/common/chatHeader/ChatHeader';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../../../components/common/text/Text';
import FillLikeIconSvg from '../../../assests/icons/svg/homeSvgs/FillLikeIconSvg';
import {useDispatch, useSelector} from 'react-redux';
import {getPostAllLikes} from '../../../redux/actions/PostAction';
import {Loader} from '../../../components/common/loader/Loader';
import CapitalizeLetter from '../../../utils/CapitalizeLetter';

export default function PostLikes({navigation, route}) {
  // console.log(route?.params?.uniquePostID, 'route?.params?.uniquePostID');
  const dispatch = useDispatch();

  // store data
  const getAllLikes = useSelector(
    store => store?.PostsReducers?.isGetAllPostLikes,
  );
  //   console.log(getAllLikes, 'getAllLikes');

  // states
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [hasReachesEnd, setHasReachesEnd] = useState(false);

  // To convert capital letter
  const {capitalizeFirstLetter} = CapitalizeLetter();

  // get all likes
  useEffect(() => {
    allPostLikesPage = 1;
    setHasReachesEnd(false);
    let newPostID = {
      postId: route?.params?.uniquePostID,
    };
    dispatch(getPostAllLikes(1, newPostID, setLoading, setHasReachesEnd));
  }, []);

  // control refresh
  const handleRefresh = () => {
    allPostLikesPage = 1;
    setHasReachesEnd(false);
    let newPostID = {
      postId: route?.params?.uniquePostID,
    };
    dispatch(getPostAllLikes(1, newPostID, setLoading, setHasReachesEnd));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // load more likes
  const fetchMore = () => {
    allPostLikesPage += 1;
    let newPostID = {
      postId: route?.params?.uniquePostID,
    };
    if (!hasReachesEnd) {
      dispatch(
        getPostAllLikes(
          allPostLikesPage,
          newPostID,
          setFooterLoading,
          setHasReachesEnd,
        ),
      );
    }
  };

  const LikeCard = ({item}) => (
    <View style={styles.flatListContainer}>
      <View style={{position: 'relative'}}>
        <View style={styles.defaultAvatar}>
          {item?.profilePic ? (
            <Image
              source={{uri: item?.profilePic}}
              resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
              style={styles.avatarImage}
            />
          ) : (
            <Image
              source={require('../../../assests/images/userIconImage.png')}
              resizeMode="contain"
              style={{height: 35, width: 35}}
            />
          )}
        </View>
        <View style={styles.IndicatorContainer}>
          <FillLikeIconSvg height={16} width={16} />
        </View>
      </View>
      <Text
        children={
          item?.firstName && item?.lastName
            ? `${capitalizeFirstLetter(
                item?.firstName,
              )} ${capitalizeFirstLetter(item?.lastName)}`
            : ''
        }
        size={16}
        lines={1}
        textColor={theme.lightColor.darkGray}
        fonts={theme.fontFamily.TinosBold}
        weight={theme.fontWeight.bold}
        style={[styles.profileText]}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ChatHeader navigation={navigation} />
      <View style={styles.headingContainer}>
        <Text
          children={'People reacted'}
          size={20}
          textColor={theme.lightColor.darkGray}
          fonts={theme.fontFamily.TinosBold}
          weight={theme.fontWeight.bold}
        />
      </View>
      <View style={styles.mainContainer}>
        {loading ? (
          <View style={styles.constantContainer}>
            <Loader color={theme.lightColor.headerBg} size={40} />
          </View>
        ) : getAllLikes?.length > 0 ? (
          <FlatList
            data={getAllLikes}
            renderItem={({item, index}) => <LikeCard item={item} key={index} />}
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
          <View style={styles.constantContainer}>
            <Text
              children={'No results found'}
              fonts={theme.fontFamily.TinosBold}
              textColor={theme.lightColor.darkGray}
              weight={theme.fontWeight.bold}
              size={16}
              alignText={'center'}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.newBodyColor,
  },
  mainContainer: {
    paddingHorizontal: 25,
    flex: 1,
  },
  defaultAvatar: {
    height: 46,
    width: 46,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.lightColor.darkGray,
  },
  avatarImage: {
    height: 46,
    width: 46,
    borderRadius: 50,
  },
  profileText: {
    marginLeft: 10,
  },
  IndicatorContainer: {
    position: 'absolute',
    top: 26,
    right: -4,
  },
  headingContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  constantContainer: {
    flex: 0.83,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
});
