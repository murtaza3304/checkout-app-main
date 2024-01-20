import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {theme} from '../../assests/theme/Theme';

const FocusAwareStatusBar = props => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar backgroundColor={theme.lightColor.white} {...props} />
  ) : null;
};
export default FocusAwareStatusBar;
