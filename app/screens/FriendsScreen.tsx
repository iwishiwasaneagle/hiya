import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

function getFriends(){
    // GET request using fetch with set headers
    const dict = { 'Content-Type': 'application/json', 'userid' : '9UD2ZWJT' };
    fetch('https://us-central1-hiya-b2b7f.cloudfunctions.net/getFriends ', {method: "GET", headers : dict })
        .then((response) => {
        response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
      })
      
      
}
export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      
	  <TouchableOpacity
         onPress={() => getFriends()}
		 style={styles.button}>
         <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
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
   button: {
	right: 125,
	bottom: 150,
	height: 100,
	width: 100,
	borderRadius: 25,
	backgroundColor: "blue"
	,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
	textAlign: "center",
  }, 
});
