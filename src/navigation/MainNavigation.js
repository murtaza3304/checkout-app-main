import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppStack from './AppStack/AppStack';
import Splash from './authStack/Splash';
import AuthStack from './authStack/AuthStack';
import PrivacyPolicy from '../screens/app/setting/PrivacyPolicy';
import TermsAndCondition from '../screens/app/setting/TermsAndCondition';

const Stack = createNativeStackNavigator();
export default function Navigation() {
  const options = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    headerShown: false,
  };
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} options={options} />
      <Stack.Screen name="AuthStack" component={AuthStack} options={options} />
      <Stack.Screen name="AppStack" component={AppStack} options={options} />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={options}
      />
      <Stack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
        options={options}
      />
    </Stack.Navigator>
  );
}
