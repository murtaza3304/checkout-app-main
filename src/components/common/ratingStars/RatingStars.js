import {TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import RatingStarIconSvg from '../../../assests/icons/svg/homeSvgs/RatingStarIconSvg';
import {theme} from '../../../assests/theme/Theme';

export default function RatingStars({ratingHandler = () => false}) {
  const [rating, setRating] = useState(0);
  const starArray = Array.from({length: 5}, (_, index) => index + 1);
  const onRatingPress = (selectedRating, index) => {
    if (selectedRating === rating) {
      setRating(index);
      ratingHandler(index);
    } else {
      setRating(selectedRating);
      ratingHandler(selectedRating);
    }
  };
  return (
    <View style={styles.container}>
      {starArray.map((items, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onRatingPress(items, index)}>
          <RatingStarIconSvg
            height={14}
            width={14}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
