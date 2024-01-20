import React, { useState } from 'react'
import { Pressable, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { theme } from '../../../assests/theme/Theme';
import { Text } from '../text/Text';
import Country from "../../../utils/Country.json";
import Modal from "react-native-modal";
import CrossIconSvg from '../../../assests/icons/svg/homeSvgs/CrossIconSvg';

export default function CountryPikerModel({
  setValue,
  putValue,
  targetCountryErr,
  viewWidth
}) {
  // console.log(putValue, "Country");

  const [isModalVisible, setModalVisible] = useState(false);
  const countryValueHandler = (data) => {
    setValue(data)
    setModalVisible(false)
    targetCountryErr('')
  }
  return (
    <>
      <Pressable
        style={{
          height: 50,
          width: viewWidth,
          borderRadius: 8,
          borderWidth: 1,
          paddingHorizontal: 20,
          borderColor: theme.lightColor.postInputBg,
          flexDirection: 'row',
          alignItems: 'center'
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text
          children={putValue ? putValue : 'Select'}
          size={14}
          textColor={theme.lightColor.black}
          fonts={theme.fontFamily.TinosRegular}
          onPressHandler={() => setModalVisible(true)}
        />
      </Pressable>
      <Modal style={styles.modelContainer} isVisible={isModalVisible} onBackButtonPress={() => setModalVisible(false)} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 20,
              paddingBottom: 6,
              alignItems: 'center'
            }}
          >
            <Text
              children={'Select Country'}
              size={20}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosRegular}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <CrossIconSvg
                color={theme.lightColor.darkGray}
                height={22}
                width={22}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={Country}
            renderItem={({ item }) => {
              // console.log(item?.name, "city");
              return (
                <TouchableOpacity style={{ paddingTop: 12, marginBottom: 10, }} onPress={() => countryValueHandler(item?.name)}>
                  <Text
                    children={item?.name}
                    size={14}
                    textColor={theme.lightColor.postSecHeading}
                    fonts={theme.fontFamily.TinosRegular}
                    onPressHandler={() => countryValueHandler(item?.name)}
                  />
                  <View style={{ height: 1.3, width: '100%', backgroundColor: theme.lightColor.underLine, marginTop: 3 }} />
                </TouchableOpacity>
              )
            }}
            keyExtractor={item => item?.name}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
          />
        </View>
      </Modal>
    </>
  )
}


const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: theme.lightColor.bodyColor,
    height: '100%',
    width: '100%',
    paddingHorizontal: 25,
  },
})