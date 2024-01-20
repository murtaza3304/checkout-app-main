import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Text} from '../../../components/common/text/Text';
import FocusAwareStatusBar from '../../../navigation/authStack/FocusAwareStatusBar';
import ChatHeader from '../../../components/common/chatHeader/ChatHeader';
import {theme} from '../../../assests/theme/Theme';
import {LineChart} from 'react-native-chart-kit';
import AnalyticsRangeBottomSheet from '../../../components/common/bottomSheet/AnalyticsRangeBottomSheet';
import DropDownIconSvg from '../../../assests/icons/svg/homeSvgs/DropDownIconSvg';
import {Button} from '../../../components/common/button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {getContentPerformance} from '../../../redux/actions/Actions';
import {Loader} from '../../../components/common/loader/Loader';
import ImpressionCard from '../../../components/common/impressions/ImpressionCard';

export default function PostsAnalytics({navigation, route}) {
  // console.log(route?.params?.cardItems, 'route?.params?.cardItems');
  const dispatch = useDispatch();
  const refRBSheet = useRef();

  // store data
  const storeData = useSelector(
    store => store?.Reducers?.isGetContentPerformance,
  );
  //   console.log(storeData, 'storeData');

  // states
  const [days, setDays] = useState('3');
  const [loading, setLoading] = useState(false);
  const [contentWidth, setContentWidth] = useState(0.8);

  // getPerformance
  const getPerformance = () => {
    let newData = {
      boostPostId: route?.params?.cardItems?._id,
      days,
    };
    dispatch(getContentPerformance(newData, setLoading));
  };
  useEffect(() => {
    getPerformance();
  }, []);

  return (
    <View style={styles.mainScreen}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ChatHeader navigation={navigation} />
      <Text
        children={'Content Performance'}
        size={20}
        textColor={theme.lightColor.darkGray}
        fonts={theme.fontFamily.TinosBold}
        weight={theme.fontWeight.bold}
        style={{marginLeft: 33, marginBottom: 10}}
      />
      <Text
        children={
          storeData?.totalImpressions ? storeData?.totalImpressions : '0'
        }
        size={16}
        textColor={theme.lightColor.darkGray}
        fonts={theme.fontFamily.TinosBold}
        weight={theme.fontWeight.bold}
        style={{marginLeft: 33, marginBottom: 4}}
      />
      <Text
        children={`Impressions Past ${days} days`}
        size={14}
        textColor={theme.lightColor.gray}
        fonts={theme.fontFamily.TinosRegular}
        style={{marginLeft: 33}}
      />
      <Button
        title={`Past ${days} days`}
        containerStyle={styles.btnContainerStyle}
        titleStyles={styles.btnTitleStyle}
        renderIconRight={() => (
          <DropDownIconSvg color={theme.lightColor.white} />
        )}
        onPressHandler={() => refRBSheet.current.open()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.screen}>
        <View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Loader color={theme.lightColor.headerBg} size={30} />
            </View>
          ) : storeData?.chartData?.impressions?.length > 0 &&
            storeData?.chartData?.labels?.length > 0 ? (
            <ScrollView
              horizontal={true}
              contentContainerStyle={{paddingHorizontal: 33}}
              showsVerticalScrollIndicator={false}
              bounces={false}>
              <LineChart
                data={{
                  labels: storeData?.chartData?.labels,
                  datasets: [
                    {
                      data: storeData?.chartData?.impressions,
                    },
                  ],
                }}
                width={Dimensions.get('window').width * contentWidth}
                height={220}
                yAxisInterval={1}
                chartConfig={{
                  backgroundGradientFrom: theme.lightColor.headerBg,
                  backgroundGradientTo: theme.lightColor.headerBg,
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#0570B0',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 12,
                }}
              />
            </ScrollView>
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
        <View style={{paddingHorizontal: 33, paddingBottom: 12}}>
          <Text
            children={'Performing posts'}
            size={20}
            textColor={theme.lightColor.darkGray}
            fonts={theme.fontFamily.TinosBold}
            weight={theme.fontWeight.bold}
            style={{marginTop: 16, marginBottom: 10}}
          />
          <ImpressionCard
            cardItems={route?.params?.cardItems}
            navigation={navigation}
          />
        </View>
      </ScrollView>
      <AnalyticsRangeBottomSheet
        refRBSheet={refRBSheet}
        setDays={setDays}
        getPerformance={getPerformance}
        setContentWidth={setContentWidth}
        duration={route?.params?.cardItems?.duration}
      />
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
  btnContainerStyle: {
    backgroundColor: theme.lightColor.lightBlue,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    marginLeft: 33,
    borderRadius: 6,
    marginTop: 20,
  },
  btnTitleStyle: {
    color: theme.lightColor.white,
    fontSize: 16,
    fontFamily: theme.fontFamily.TinosRegular,
    paddingRight: 10,
  },
  loadingContainer: {
    height: 236,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
