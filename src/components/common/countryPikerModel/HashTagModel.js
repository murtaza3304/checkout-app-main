import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {theme} from '../../../assests/theme/Theme';
import {Text} from '../text/Text';
import Modal from 'react-native-modal';
import CrossIconSvg from '../../../assests/icons/svg/homeSvgs/CrossIconSvg';
import SendMessageIconSvg from '../../../assests/icons/svg/chatSvgs/SendMessageIconSvg';

export default function HashTagModel({
  setValue,
  putValue,
  modelData,
  modelHeight,
  title,
  inputSelect = false,
  setHashtagText,
  onHashtagSubmit = () => false,
  hashtagText,
  setModalVisible,
  isModalVisible,
  placeholderInput = '',
}) {
  const scrollViewRef = useRef(null);
  return (
    <Modal
      style={styles.modelContainer}
      isVisible={isModalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      onBackdropPress={() => {
        setModalVisible(false);
      }}>
      <View style={[styles.mainContainer, {height: modelHeight}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 20,
            paddingBottom: 6,
            alignItems: 'center',
          }}>
          <Text
            children={title ? title : ''}
            size={18}
            textColor={theme.lightColor.darkGray}
            fonts={theme.fontFamily.TinosRegular}
          />
          {putValue?.length <= 0 ? (
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                height: 35,
                justifyContent: 'center',
              }}>
              <CrossIconSvg
                color={theme.lightColor.lightBlue}
                height={16}
                width={16}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                height: 35,
                width: 90,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
                backgroundColor: theme.lightColor.lightBlue,
              }}
              onPress={() => setModalVisible(false)}>
              <Text
                children={`Select  ${putValue?.length}`}
                size={14}
                textColor={theme.lightColor.white}
                fonts={theme.fontFamily.TinosRegular}
                onPressHandler={() => setModalVisible(false)}
              />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={modelData}
          renderItem={({item}) => {
            const isSelected = putValue.includes(item.name);

            const handleItemPress = () => {
              if (isSelected) {
                setValue(
                  putValue.filter(selectedItem => selectedItem !== item.name),
                );
              } else {
                setValue([...putValue, item.name]);
              }
            };
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  paddingTop: 12,
                  backgroundColor: isSelected
                    ? theme.lightColor.lightBlue
                    : theme.lightColor.white,
                }}
                onPress={handleItemPress}>
                <Text
                  children={item?.name}
                  size={14}
                  textColor={
                    isSelected
                      ? theme.lightColor.white
                      : theme.lightColor.postSecHeading
                  }
                  fonts={theme.fontFamily.TinosRegular}
                  onPressHandler={handleItemPress}
                />
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: theme.lightColor.underLine,
                    marginTop: 3,
                  }}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item?.id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }
        />
        {inputSelect ? (
          <View style={{marginTop: 20, flexDirection: 'row'}}>
            <TextInput
              value={hashtagText}
              placeholder={placeholderInput ? placeholderInput : ''}
              placeholderTextColor={theme.lightColor.postSecHeading}
              style={styles.textInputStyle}
              onChangeText={newText => setHashtagText(newText)}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={onHashtagSubmit}>
              <SendMessageIconSvg />
            </TouchableOpacity>
          </View>
        ) : (
          false
        )}
      </View>
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
    paddingBottom: 20,
  },
  textInputStyle: {
    height: 48,
    width: '84%',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: theme.lightColor.postInputBg,
    paddingHorizontal: 16,
    color: theme.lightColor.postSecHeading,
  },
  addButton: {
    width: '16%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
