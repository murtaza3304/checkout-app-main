import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import {theme} from '../../../assests/theme/Theme';
import BackIconSvg from '../../../assests/icons/svg/homeSvgs/BackIconSvg';

export default function SingleImage({route, navigation}) {
  // console.log([route?.params?.images], "route?.params?.images");
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIconContainer}>
          <BackIconSvg color={theme.lightColor.white} height={15} width={20} />
        </TouchableOpacity>
        <ImageViewer
          imageUrls={[route?.params?.images].map(item => ({url: item}))}
          renderIndicator={() => null}
        />
      </SafeAreaView>
    </View>
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
    top: 25,
    zIndex: 1,
    width: '100%',
  },
});
