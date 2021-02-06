import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { enableScreens } from "react-native-screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { NavigatorScreenParams } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

enableScreens();

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import HiyaMainScreen from "./screens/HiyaMainScreen";
import FriendsScreen from "./screens/FriendsScreen";
import AddFriendScreen from "./screens/AddFriendScreen";
import { Button } from "react-native";

type RootStackParamList = {
  Home: undefined;
  Friends: { myMessage: string };
  AddFriends: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={HiyaMainScreen} />
          <RootStack.Screen
            name="Friends"
            component={FriendsScreen}
            initialParams={{ myMessage: "myMessage" }}
          />
          <RootStack.Screen name="AddFriends" component={AddFriendScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
