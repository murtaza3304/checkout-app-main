import Toast from 'react-native-toast-message';

export default function CommonToast() {
    const showToast = ({
        title1,
        title2,
        type
    }) => {
        Toast.show({
            type: type,
            text1: title1,
            text2: `${title2} 👋`
        });
    }
    return {
        showToast
    }
}