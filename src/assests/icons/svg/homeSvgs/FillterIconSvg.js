import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
// import { lightThemeColors } from '../../../../themes';

const FillterIconSvg = ({height, width, color}) => {
  const defaultWidth = width ? width : '44px';
  const defaultHeight = height ? height : '44px';
  //   const defaultColor = color ? color : lightThemeColors.primaryGrey;
  const defaultColor = color ? color : '#69C3F9';
  return (
    <SvgXml
      xml={`
            <svg width="${defaultWidth}" height="${defaultHeight}" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="38.375" height="37" rx="5.5" fill="#69C3F9" stroke="#69C3F9"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6169 10H26.3831C27.0346 10 27.5913 10 28.0367 10.0555C28.5085 10.115 28.9647 10.2485 29.3397 10.5992C29.7207 10.9568 29.872 11.4021 29.9385 11.865C30 12.2908 30 12.8198 30 13.4239V14.1801C30 14.6565 30 15.0667 29.9648 15.4107C29.9258 15.781 29.8427 16.1269 29.6415 16.4591C29.4413 16.7894 29.1727 17.0291 28.8621 17.2435C28.57 17.4462 28.1979 17.6557 27.7584 17.9022L24.8848 19.5157C24.2304 19.8831 24.0028 20.0156 23.8504 20.1471C23.5017 20.4492 23.3015 20.7853 23.2077 21.2053C23.1677 21.3856 23.1628 21.6116 23.1628 22.2995V24.9615C23.1628 25.8394 23.1628 26.5848 23.072 27.1587C22.9762 27.7677 22.7526 28.3523 22.1665 28.7177C21.5932 29.0753 20.9632 29.0422 20.3498 28.897C19.7588 28.7577 19.0312 28.4732 18.158 28.1331L18.074 28.1C17.6637 27.9402 17.3062 27.8008 17.023 27.6547C16.7182 27.4978 16.435 27.3029 16.2191 26.9989C15.9993 26.691 15.9124 26.3617 15.8724 26.0245C15.8372 25.7176 15.8372 25.3493 15.8372 24.9381V22.2995C15.8372 21.6116 15.8333 21.3856 15.7923 21.2053C15.7036 20.7904 15.4771 20.4176 15.1496 20.1471C14.9972 20.0156 14.7687 19.8831 14.1152 19.5157L11.2416 17.9022C10.8021 17.6557 10.43 17.4462 10.1379 17.2435C9.8273 17.0291 9.5587 16.7894 9.35847 16.4591C9.15726 16.1269 9.07423 15.78 9.03614 15.4107C9 15.0677 9 14.6565 9 14.1801V13.4239C9 12.8198 9 12.2908 9.06153 11.865C9.12795 11.4021 9.27935 10.9568 9.66028 10.5992C10.0353 10.2485 10.4905 10.115 10.9633 10.0555C11.4087 10 11.9654 10 12.6169 10ZM11.1469 11.5064C10.8207 11.5473 10.7171 11.6136 10.6634 11.6652C10.6146 11.71 10.552 11.789 10.511 12.0725C10.4671 12.3823 10.4651 12.8052 10.4651 13.4736V14.146C10.4651 14.6663 10.4651 15.0015 10.4925 15.2606C10.5179 15.5013 10.5608 15.6173 10.6136 15.704C10.6673 15.7927 10.7572 15.893 10.973 16.0431C11.2016 16.2009 11.5132 16.3773 11.9888 16.6443L14.8341 18.2422L14.9122 18.2861C15.4592 18.593 15.8304 18.8015 16.1097 19.0432C16.6747 19.5186 17.0662 20.1671 17.2232 20.8877C17.3023 21.2452 17.3023 21.6477 17.3023 22.2128V24.9011C17.3023 25.361 17.3033 25.6436 17.3287 25.856C17.3502 26.0489 17.3863 26.1142 17.4127 26.1522C17.442 26.1931 17.5006 26.2565 17.695 26.3568C17.902 26.463 18.1882 26.5751 18.6395 26.7514C19.5781 27.1178 20.2101 27.3624 20.6877 27.4754C21.1556 27.5865 21.3099 27.529 21.389 27.4793C21.4554 27.4374 21.558 27.3526 21.6254 26.9307C21.6957 26.4854 21.6977 25.856 21.6977 24.9001V22.2128C21.6977 21.6477 21.6977 21.2452 21.7778 20.8877C21.9345 20.1673 22.3257 19.5188 22.8903 19.0432C23.1696 18.8015 23.5418 18.592 24.0868 18.2861L24.1659 18.2422L27.0112 16.6443C27.4868 16.3773 27.7984 16.2009 28.027 16.0431C28.2428 15.893 28.3327 15.7927 28.3864 15.704C28.4392 15.6173 28.4821 15.5013 28.5066 15.2606C28.5339 15.0015 28.5349 14.6663 28.5349 14.145V13.4727C28.5349 12.8052 28.5329 12.3814 28.489 12.0725C28.448 11.789 28.3845 11.71 28.3376 11.6652C28.2829 11.6145 28.1793 11.5473 27.8531 11.5064C27.5113 11.4625 27.0473 11.4616 26.3372 11.4616H12.6628C11.9527 11.4616 11.4897 11.4625 11.1469 11.5064Z" fill="white"/>
</svg>
            `}
    />
  );
};

export default FillterIconSvg;