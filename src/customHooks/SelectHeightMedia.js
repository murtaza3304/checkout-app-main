import { Dimensions } from 'react-native';

const heightMatrix = {
  sm: 700,
  md: 800,
};

export function SelectHeightMedia(params) {
  const { height } = Dimensions.get('window');
  if (params.sm && height <= heightMatrix.sm) {
    return params.sm;
  }
  if (params.md && height <= heightMatrix.md) {
    return params.md;
  }
  return params.default;
}