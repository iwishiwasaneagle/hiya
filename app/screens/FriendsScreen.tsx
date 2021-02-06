import * as React from "react";
import { StyleSheet, Button, TouchableOpacity, ImageBackground, } from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RouteProp } from "@react-navigation/native";
import { getFriends, sendMessage } from "../api/http_requests";

type RootStackParamList = {
  Home: undefined;
  Friends: { myMessage: string };
};
type FriendsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Friends"
>;

type FriendsScreenRouteProp = RouteProp<RootStackParamList, "Friends">;

const screenNavigator = createStackNavigator();

type Props = {
  route: FriendsScreenRouteProp;
  navigation: FriendsScreenNavigationProp;
};

export default function FriendsScreen({ route, navigation }: Props) {
  const { myMessage } = route.params;

  var [friendsList, setFriendsList] = React.useState([]);

  getFriends("K7VFRYG4").then((friends) => {
    setFriendsList(friends);
  });

  return (
   
   <View style={styles.container}>
   <ImageBackground
      source={require("./images/bg.png")}
      style={styles.container}
    >
      {friendsList.map((friend) => (
        <TouchableOpacity
          onPress={() => sendMessage("K7VFRYG4", friend, myMessage)}
          style={styles.friendTile}
        >
          <Text style={styles.friendTileText}>{friend}</Text>
        </TouchableOpacity>
      ))}
	  </ImageBackground>
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
  friendTile: {
    right: 0,
    bottom: 100,
    height: 70,
    width: 350,
    borderRadius: 25,
	marginTop: 50,
    backgroundColor: "rgba(250, 110, 22, 0.9)",
  },
  friendTileText: {
    color: "white",
    textAlign: "left",
    fontSize: 24,
    right: -37,
    bottom: -8,
  },
});
