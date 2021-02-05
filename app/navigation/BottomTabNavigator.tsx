import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HiyaMainScreen from "../screens/HiyaMainScreen";
import FriendsScreen from "../screens/FriendsScreen";
import AddFriendScreen from "../screens/AddFriendScreen";
import {
  BottomTabParamList,
  HiyaMainParamList,
  FriendsScreenParamList,
  AddFriendScreenParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HiyaMain"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="HiyaMain"
        component={HiyaMainNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="FriendsScreen"
        component={FriendsScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="AddFriendScreen"
        component={AddFriendScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-add" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HiyaMainStack = createStackNavigator<HiyaMainParamList>();

function HiyaMainNavigator() {
  return (
    <HiyaMainStack.Navigator>
      <HiyaMainStack.Screen
        name="HiyaMainScreen"
        component={HiyaMainScreen}
        options={{ headerTitle: "Hiya Main Screen" }}
      />
    </HiyaMainStack.Navigator>
  );
}

const FriendsScreenStack = createStackNavigator<FriendsScreenParamList>();

function FriendsScreenNavigator() {
  return (
    <FriendsScreenStack.Navigator>
      <FriendsScreenStack.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{ headerTitle: "My Friends" }}
      />
    </FriendsScreenStack.Navigator>
  );
}

const AddFriendScreenStack = createStackNavigator<AddFriendScreenParamList>();

function AddFriendScreenNavigator() {
  return (
    <AddFriendScreenStack.Navigator>
      <AddFriendScreenStack.Screen
        name="AddFriendScreen"
        component={AddFriendScreen}
        options={{ headerTitle: "Add Friend" }}
      />
    </AddFriendScreenStack.Navigator>
  );
}
