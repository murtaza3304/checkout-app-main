import {View, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {theme} from '../../assests/theme/Theme';
import FocusAwareStatusBar from '../authStack/FocusAwareStatusBar';
import SearchHeader from '../../components/common/searchHeader/SearchHeader';
import SearchCard from '../../components/common/searchCard/SearchCard';
import {postSearch} from '../../redux/actions/PostAction';
import {useDispatch, useSelector} from 'react-redux';
import {windowHeight} from '../../utils/Dimentions';
import {Text} from '../../components/common/text/Text';
import {Loader} from '../../components/common/loader/Loader';

export default function Search({navigation}) {
  // hook
  const dispatch = useDispatch();
  // States
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [footerLoading, setFooterLoading] = useState(false);
  const [filteredPostsData, setFilteredPostsData] = useState([]);
  const [hasReachesEnd, setHasReachesEnd] = useState(false);

  const currentPostSearchData = useSelector(
    store => store?.PostsReducers?.isGetAllPostsUser,
  );
  // console.log(currentPostSearchData?.length, 'currentPostSearchData');

  useEffect(() => {
    searchPostsPage = 1;
    setHasReachesEnd(false);
    let getSearch;
    if (inputText) {
      getSearch = setTimeout(() => {
        dispatch(postSearch(1, inputText, setLoading, setHasReachesEnd));
      }, 1000);
    }
    return () => clearTimeout(getSearch);
  }, [inputText]);

  // control refresh
  const handleRefresh = () => {
    searchPostsPage = 1;
    setHasReachesEnd(false);
    setInputText('');
    setFilteredPostsData([]);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // load more posts
  const fetchMore = () => {
    searchPostsPage += 1;
    if (inputText && !hasReachesEnd) {
      dispatch(
        postSearch(
          searchPostsPage,
          inputText,
          setFooterLoading,
          setHasReachesEnd,
        ),
      );
    }
  };

  useEffect(() => {
    if (inputText) {
      const filtered = currentPostSearchData?.filter(post => {
        let searchText = `${post?.caption} ${post?.text}`;
        if (searchText?.includes(inputText)) {
          return ['media', 'image', 'video']?.includes(
            post?.fileType?.toLowerCase(),
          );
        }
      });
      setFilteredPostsData(filtered);
    }
  }, [currentPostSearchData, inputText]);

  return (
    <View style={styles.screen}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <SearchHeader
        navigation={navigation}
        headerText={
          filteredPostsData?.length > 0 && inputText
            ? `${filteredPostsData?.length} results found`
            : ``
        }
        headerTextStyles={styles.resultContainer}
        textSize={16}
        placeHoldertxt={'Search'}
        inputValue={inputText}
        onChangeHandle={setInputText}
      />
      {loading ? (
        <View
          style={{
            height: windowHeight * 0.6,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Loader color={theme.lightColor.headerBg} size={40} />
        </View>
      ) : filteredPostsData?.length > 0 && inputText ? (
        <View style={{flex: 1}}>
          <FlatList
            data={filteredPostsData}
            renderItem={({item, index}) => (
              <SearchCard
                cardsData={item}
                index={index}
                navigation={navigation}
              />
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={{flexGrow: 1}}
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
        </View>
      ) : filteredPostsData?.length <= 0 && inputText ? (
        <View
          style={{
            height: windowHeight * 0.6,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text
            children={'No results found'}
            fonts={theme.fontFamily.TinosRegular}
            textColor={theme.lightColor.darkGray}
            weight={theme.fontWeight.bold}
            size={16}
            alignText={'center'}
          />
        </View>
      ) : (
        false
      )}
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
    paddingHorizontal: 51,
  },
});
