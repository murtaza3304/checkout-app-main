import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomBottomTabBar from './CustomBottomTabBar';
import Home from '../AppStack/Home';
import Chats from '../AppStack/Chats';
import Notification from '../AppStack/Notification';
import AtypeUserProfile from '../../screens/app/profile/AtypeUserProfile';
import ProfileBUserSearch from '../../screens/app/profileBUser/ProfileBUserSearch';
import ProfileCUserSearch from '../../screens/app/profileCUser/ProfileCUserSearch';
const Tab = createBottomTabNavigator();
export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName={'Home'}
      tabBar={props => <CustomBottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ProfileBUserSearch" component={ProfileBUserSearch} />
      <Tab.Screen name="ProfileCUserSearch" component={ProfileCUserSearch} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Chats" component={Chats} />
      {/* <Tab.Screen name="AtypeUserProfile" component={AtypeUserProfile} /> */}
    </Tab.Navigator>
  );
}
