import {View, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../text/Text';
import {Button} from '../button/Button';
import CountryPicker from 'react-native-country-picker-modal';
import {HASH_TAGS_DATA, TOOLS_DATA} from '../../../utils/ConstantData';
import uuid from 'react-native-uuid';
import HashTagModel from './HashTagModel';
import RatingStarIconSvg from '../../../assests/icons/svg/homeSvgs/RatingStarIconSvg';
import CircleCrossIconSvg from '../../../assests/icons/svg/homeSvgs/CircleCrossIconSvg';
import DropDownIconSvg from '../../../assests/icons/svg/homeSvgs/DropDownIconSvg';

export default function FilterModelBUser({
  setModalVisible,
  modalVisible,
  roleFilter,
  setFillterModelData,
  pressHandler = () => null,
}) {
  // states
  const [isModel, setIsModel] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModelVisible, setIsSecondModelVisible] = useState(false);
  const [country, setCountry] = useState(null);
  const [collectHashtags, setCollectHashtags] = useState([]);
  const [toolsCategory, setToolsCategory] = useState([]);
  const [hashtagText, setHashtagText] = useState('');
  const [rating, setRating] = useState(0);

  // select country
  const onSelect = country => {
    setCountry(country?.name);
    setIsModel(false);
  };

  function generateRandomHexString(length) {
    const uid = uuid?.v4();
    return uid.replace(/-/g, '').substring(0, length);
  }

  const onHashtagSubmit = () => {
    if (!hashtagText) {
      return;
    } else {
      let newUid = generateRandomHexString(24);
      HASH_TAGS_DATA.push({id: newUid, name: `#${hashtagText} `});
    }
    setHashtagText('');
  };

  // rating handler
  const starArray = Array.from({length: 5}, (_, index) => index + 1);
  const onRatingPress = (selectedRating, index) => {
    if (selectedRating === rating) {
      setRating(index);
    } else {
      setRating(selectedRating);
    }
  };

  // filter handler
  const filterHandler = () => {
    let filterData = {
      location: country,
      professionalAffiliation: collectHashtags,
      tools: toolsCategory,
      rating: rating,
      role: roleFilter,
    };
    pressHandler(filterData);
    setFillterModelData(filterData);
    setModalVisible(false);
  };
  return (
    <Modal
      style={styles.modelContainer}
      isVisible={modalVisible}
      onRequestClose={() => {
        console.log('close the model=======');
        setModalVisible(false);
      }}
      onBackdropPress={() => {
        setModalVisible(false), setFillterModelData(null);
        setCountry(null);
        setCollectHashtags(null);
        setToolsCategory(null), console.log('======model close======');
      }}>
      <View style={styles.mainContainer}>
        {/* header */}
        <View style={styles.headerContainer}>
          <Text
            children={'Filter'}
            fonts={theme.fontFamily.TinosBold}
            weight={theme.fontWeight.bold}
            size={18}
          />
          <Button
            title={'Apply Filter'}
            titleStyles={styles.titleStyles}
            containerStyle={styles.btnContainerStyle}
            onPressHandler={() => filterHandler()}
          />
        </View>
        {/* main cntainer */}
        <View style={{marginTop: 24}}>
          <Text
            children={'Location'}
            fonts={theme.fontFamily.TinosBold}
            weight={theme.fontWeight.bold}
            textColor={theme.lightColor.darkGray}
            size={15}
            style={{marginBottom: 10}}
          />
          <Pressable
            style={styles.textInputStyle}
            onPress={() => setIsModel(true)}>
            <Text
              children={country ? country : 'Add location'}
              size={14}
              textColor={theme.lightColor.darkGray}
              fonts={theme.fontFamily.TinosRegular}
              onPressHandler={() => setIsModel(true)}
            />
            {country != null ? (
              <TouchableOpacity
                style={{padding: 2}}
                onPress={() => setCountry(null)}>
                <CircleCrossIconSvg />
              </TouchableOpacity>
            ) : (
              <DropDownIconSvg />
            )}
          </Pressable>
        </View>
        <View style={{marginTop: 14}}>
          <Text
            children={'Professional Affiliation'}
            fonts={theme.fontFamily.TinosBold}
            textColor={theme.lightColor.darkGray}
            weight={theme.fontWeight.bold}
            size={15}
            style={{marginBottom: 10}}
          />
          <Pressable
            style={styles.hashTagContainer}
            onPress={() => {
              setIsModalVisible(true);
            }}>
            <View style={styles.tagContainer}>
              {collectHashtags?.length > 0 ? (
                collectHashtags.map((item, index) => (
                  <Text
                    key={index}
                    children={`${item}, `}
                    size={14}
                    textColor={theme.lightColor.darkGray}
                    fonts={theme.fontFamily.TinosRegular}
                    onPressHandler={() => setIsModalVisible(true)}
                  />
                ))
              ) : (
                <Text
                  children={'Add Affiliation'}
                  size={14}
                  textColor={theme.lightColor.darkGray}
                  fonts={theme.fontFamily.TinosRegular}
                  onPressHandler={() => setIsModalVisible(true)}
                />
              )}
            </View>
            {collectHashtags?.length > 0 ? (
              <TouchableOpacity
                style={{padding: 2, width: '9%'}}
                onPress={() => setCollectHashtags([])}>
                <CircleCrossIconSvg />
              </TouchableOpacity>
            ) : (
              <DropDownIconSvg />
            )}
          </Pressable>
        </View>
        <View style={{marginTop: 14}}>
          <Text
            children={'Platform Tools'}
            fonts={theme.fontFamily.TinosBold}
            textColor={theme.lightColor.darkGray}
            weight={theme.fontWeight.bold}
            size={15}
            style={{marginBottom: 10}}
          />
          <Pressable
            style={styles.hashTagContainer}
            onPress={() => {
              setIsSecondModelVisible(true);
            }}>
            <View style={styles.tagContainer}>
              {toolsCategory?.length > 0 ? (
                toolsCategory.map((item, index) => (
                  <Text
                    key={index}
                    children={`${item}, `}
                    size={14}
                    textColor={theme.lightColor.darkGray}
                    fonts={theme.fontFamily.TinosRegular}
                    onPressHandler={() => setIsSecondModelVisible(true)}
                  />
                ))
              ) : (
                <Text
                  children={'Add Tools'}
                  size={14}
                  textColor={theme.lightColor.darkGray}
                  fonts={theme.fontFamily.TinosRegular}
                  onPressHandler={() => setIsSecondModelVisible(true)}
                />
              )}
            </View>
            {toolsCategory?.length > 0 ? (
              <TouchableOpacity
                style={{padding: 2, width: '9%'}}
                onPress={() => setToolsCategory([])}>
                <CircleCrossIconSvg />
              </TouchableOpacity>
            ) : (
              <DropDownIconSvg />
            )}
          </Pressable>
        </View>
        <View style={{marginTop: 14}}>
          <Text
            children={'Rating'}
            fonts={theme.fontFamily.TinosBold}
            textColor={theme.lightColor.darkGray}
            weight={theme.fontWeight.bold}
            size={15}
            style={{marginBottom: 10}}
          />
          <View style={styles.starContainer}>
            {starArray.map((items, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onRatingPress(items, index)}>
                <RatingStarIconSvg
                  height={22}
                  width={22}
                  iconStyle={{marginLeft: 5}}
                  color={
                    items <= rating
                      ? theme.lightColor.yellowColor
                      : theme.lightColor.ratingStarFillColor
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <CountryPicker
        modalProps={{
          visible: isModel,
          onRequestClose: () => setIsModel(false),
        }}
        renderFlagButton={() => null}
        {...{
          onSelect,
        }}
        withFilter={true}
        onClose={() => setIsModel(false)}
      />
      <HashTagModel
        setValue={setCollectHashtags}
        putValue={collectHashtags}
        modelData={HASH_TAGS_DATA}
        modelHeight={'100%'}
        title={'Professional Affiliation'}
        inputSelect={true}
        setHashtagText={setHashtagText}
        onHashtagSubmit={onHashtagSubmit}
        hashtagText={hashtagText}
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        placeholderInput="Add Affiliation"
      />
      <HashTagModel
        setValue={setToolsCategory}
        putValue={toolsCategory}
        modelData={TOOLS_DATA}
        modelHeight={'62%'}
        title={'Tools'}
        isModalVisible={isSecondModelVisible}
        setModalVisible={setIsSecondModelVisible}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: theme.lightColor.white,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyles: {
    fontSize: 13,
    fontWeight: theme.fontWeight.bold,
    fontFamily: theme.fontFamily.TinosBold,
    color: theme.lightColor.white,
  },
  btnContainerStyle: {
    height: 38,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.lightColor.headerBg,
    borderRadius: 8,
  },
  textInputStyle: {
    height: 45,
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 14,
    borderColor: theme.lightColor.postInputBg,
    backgroundColor: theme.lightColor.white,
    color: theme.lightColor.black,
    fontSize: 14,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.TinosRegular,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  hashTagContainer: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderColor: theme.lightColor.postInputBg,
    backgroundColor: theme.lightColor.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '90%',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
