import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {theme} from '../../../assests/theme/Theme';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';

export default function SingleImageScreen({route, navigation}) {
  // console.log(route?.params?.images, 'route?.params?.images');
  const newArr = route?.params?.images?.map(item => {
    return {url: item?.fileKey ? item?.fileKey : item?.file};
  });
  // console.log(newArr, 'newArr');
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerIconContainer}>
            <BackIconSvg
              color={theme.lightColor.white}
              height={15}
              width={20}
            />
          </TouchableOpacity>
          <ImageViewer
            imageUrls={newArr}
            renderHeader={currentIndex => (
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                  {currentIndex + 1} {`/`} {newArr?.length}
                </Text>
              </View>
            )}
            index={route?.params?.currentIndex}
            renderIndicator={() => null}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.lightColor.black,
  },
  mainContainer: {
    backgroundColor: theme.lightColor.black,
    position: 'relative',
    flex: 1,
  },
  headerIconContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    position: 'absolute',
    top: 25,
    zIndex: 1,
    width: '100%',
  },
  headerContainer: {
    position: 'absolute',
    top: 80,
    zIndex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: theme.lightColor.white,
    fontSize: 14,
    fontFamily: theme.fontFamily.TinosBold,
    fontWeight: theme.fontWeight.bold,
  },
});
