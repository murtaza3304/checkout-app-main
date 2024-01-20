import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';
import {theme} from '../../../assests/theme/Theme';
import {windowWidth} from '../../../utils/Dimentions';
import SingleVideo from './SingleVideo';
import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Loader} from '../../../components/common/loader/Loader';
import {useIsFocused} from '@react-navigation/native';
import {Text} from '../../../components/common/text/Text';

export default function HorizontalMediaScreen({navigation, route}) {
  // console.log(route?.params?.mediaData, 'my images');
  // state
  const isFocusedCurrentPage = useIsFocused();
  const [focusedVideo, setFocusedVideo] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  function onViewableItemsChanged({viewableItems}) {
    setFocusedIndex(viewableItems[0].index);
  }
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <View style={styles.screen}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.headerIconContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIconSvg
                color={theme.lightColor.white}
                height={15}
                width={20}
              />
            </TouchableOpacity>
            {/* index container */}
            <View style={styles.indexContainer}>
              <Text
                children={`${focusedIndex + 1} / ${
                  route?.params?.mediaData?.length
                }`}
                textColor={theme.lightColor.white}
                fonts={theme.fontFamily.TinosBold}
                weight={theme.fontWeight.bold}
                size={16}
              />
            </View>
          </View>

          <FlatList
            data={route?.params?.mediaData}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}
            initialNumToRender={5}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
            nestedScrollEnabled={true}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            renderItem={({item, index}) => (
              <View
                key={index}
                style={{
                  height: '100%',
                  width: windowWidth,
                  backgroundColor: theme.lightColor.black,
                }}>
                {item?.type?.toLowerCase() === 'video' ? (
                  <SingleVideo
                    focusedIndex={focusedIndex}
                    index={index}
                    isScreenFocused={isFocusedCurrentPage}
                    videoUrl={item?.fileKey}
                    focusedVideo={focusedVideo}
                    setFocusedVideo={setFocusedVideo}
                  />
                ) : (
                  <ImageZoom
                    uri={item?.fileKey}
                    renderLoader={() => (
                      <Loader color={theme.lightColor.white} size={28} />
                    )}
                  />
                )}
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.black,
  },
  headerIconContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    position: 'absolute',
    top: 20,
    zIndex: 1,
    width: '100%',
  },
  indexContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
