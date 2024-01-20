import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import BottomTabs from '../bottomTabs/BottomTabs';
import Search from './Search';
import ATypeUserVaildCard from '../../screens/app/profile/ATypeUserVaildCard';
import AtypeUserProfile from '../../screens/app/profile/AtypeUserProfile';
import ATypeUserFinalize from '../../screens/app/profile/ATypeUserFinalize';
import CreatePost from '../../screens/app/createPost/CreatePost';
import Profile from './Profile';
import Setting from '../../screens/app/setting/Setting';
import FeedPreferences from '../../screens/app/setting/FeedPreferences';
import SettingNotification from '../../screens/app/setting/SettingNotification';
import PrivacyAndSecurity from '../../screens/app/setting/PrivacyAndSecurity';
import ProfileCUserSpecification from '../../screens/app/profileCUser/ProfileCUserSpecification';
import ProfileBUserSpecification from '../../screens/app/profileBUser/ProfileBUserSpecification';
import SearchResults from '../../screens/app/search/SearchResults';
import ContentPerformance from '../../screens/app/setting/ContentPerformance';
import SingleChatMessage from '../../screens/app/chats/SingleChatMessage';
import ProfileBUser from '../../screens/app/profileBUser/ProfileBUser';
import ProfileCUser from '../../screens/app/profileCUser/ProfileCUser';
import SpamScreen from '../../screens/app/report/SpamScreen';
import VideoScreen from '../../screens/app/videoScreen/VideoScreen';
import SingleImage from '../../screens/app/videoScreen/SingleImage';
import HorizontalMediaScreen from '../../screens/app/videoScreen/HorizontalMediaScreen';
import SingleImageScreen from '../../screens/app/chats/SingleImageScreen';
import SingleVideoScreen from '../../screens/app/chats/SingleVideoScreen';
import AudioCallScreen from './AudioCallScreen';
import BoostPost from '../../screens/app/createPost/BoostPost';
import ChangeEmailAddress from '../../screens/app/setting/ChangeEmailAddress';
import PostLikes from '../../screens/app/postLikes/PostLikes';
import ProfileCompleted from '../../screens/app/profile/ProfileCompleted';
import DisplayMediaScreen from '../../screens/app/chats/DisplayMediaScreen';
import VideoCallScreen from './VideoCallScreen';
import PostsAnalytics from '../../screens/app/setting/PostsAnalytics';
import {navigateToNestedRoute} from '../../../App';
import UserSpecification from '../../screens/app/userSpecification/UserSpecification';
// StackContainer
function AppStack({route}) {
  const options = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    headerShown: false,
    headerLeft: null,
    gestureEnabled: false,
  };
  // console.log(route?.params?.isNotificationPage, 'isNotificationPage');
  useEffect(() => {
    if (route?.params?.isNotificationPage) {
      navigateToNestedRoute('BottomTabs', 'Notification');
    }
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'BottomTabs'}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileBUser"
        component={ProfileBUser}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileCUser"
        component={ProfileCUser}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FeedPreferences"
        component={FeedPreferences}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SettingNotification"
        component={SettingNotification}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyAndSecurity"
        component={PrivacyAndSecurity}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContentPerformance"
        component={ContentPerformance}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeEmailAddress"
        component={ChangeEmailAddress}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AtypeUserProfile"
        component={AtypeUserProfile}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ATypeUserVaildCard"
        component={ATypeUserVaildCard}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ATypeUserFinalize"
        component={ATypeUserFinalize}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BoostPost"
        component={BoostPost}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PostLikes"
        component={PostLikes}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileCompleted"
        component={ProfileCompleted}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DisplayMediaScreen"
        component={DisplayMediaScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="ProfileCUserSearch"
        component={ProfileCUserSearch}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="ProfileCUserSpecification"
        component={ProfileCUserSpecification}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PostsAnalytics"
        component={PostsAnalytics}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="ProfileBUserSearch"
        component={ProfileBUserSearch}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="ProfileBUserSpecification"
        component={ProfileBUserSpecification}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SingleChatMessage"
        component={SingleChatMessage}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpamScreen"
        component={SpamScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="SingleImage"
        component={SingleImage}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="HorizontalMediaScreen"
        component={HorizontalMediaScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="SingleImageScreen"
        component={SingleImageScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="SingleVideoScreen"
        component={SingleVideoScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      />

      <Stack.Screen
        name="AudioCallScreen"
        component={AudioCallScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="VideoCallScreen"
        component={VideoCallScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      />
      <Stack.Screen
        name="UserSpecification"
        component={UserSpecification}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          animation: 'fade',
          animationDuration: 100,
        }}
      />
    </Stack.Navigator>
  );
}
export default AppStack;
