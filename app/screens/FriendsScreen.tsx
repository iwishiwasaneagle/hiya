import * as React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined,
  Friends: { myMessage: string };
}
type FriendsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Friends'
>;

type FriendsScreenRouteProp = RouteProp<RootStackParamList, 'Friends'>;

const screenNavigator = createStackNavigator()

type Props = {
  route: FriendsScreenRouteProp;
  navigation: FriendsScreenNavigationProp;

}


export default function FriendsScreen({route, navigation}: Props) {
   const { myMessage } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>myMessage</Text>
      <Text>{myMessage}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/FriendsScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
