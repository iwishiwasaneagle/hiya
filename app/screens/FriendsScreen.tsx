import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { addFriend, ensureValidId, getFriends } from "../api/http_requests";



interface friendsObj {
	friends: string[];
}
//capture current userid
let primaryUser: string = "1TTRAKMR";

/*
//retreive friends for current user
console.log("before function");
//let friends: any = getFriends(primaryUser);
//console.log("after function")
//console.log(friends)
//let friendsList = JSON.parse(getFriends(primaryUser));

getFriends(primaryUser).then((friends) =>{
	let friendsList: string[] = friends;
});
*/

let friendsList: string[] = ["8C0IXA8C","9UD2ZWJT","F0UF7G5E","H982UZHS","ISCVQN7A",]
console.log(friendsList.length);  

 

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
	   
	  <TouchableOpacity
         onPress={() => getFriends()}
		 style={styles.button1}>
         <Text style={styles.buttonText}>{friendsList[0]}</Text>
      </TouchableOpacity>
	  
	  <TouchableOpacity
         onPress={() => getFriends()}
		 style={styles.button2}>
         <Text style={styles.buttonText}>{friendsList[1]}</Text>
      </TouchableOpacity>
	  
	  <TouchableOpacity
         onPress={() => getFriends()}
		 style={styles.button3}>
         <Text style={styles.buttonText}>{friendsList[2]}</Text>
      </TouchableOpacity>
    
	
	<TouchableOpacity
         onPress={() => getFriends()}
		 style={styles.button4}>
         <Text style={styles.buttonText}>{friendsList[3]}</Text>
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
   button1: {
	right: 125,
	bottom: 60,
	height: 100,
	width: 100,
	borderRadius: 25,
	backgroundColor: "blue"
	,
  },
  button2: {
	left: 125,
	bottom: 80,
	height: 100,
	width: 100,
	borderRadius: 25,
	backgroundColor: "red"
	,
  },
  button3: {
	right: 100,
	bottom: 30,
	height: 100,
	width: 100,
	borderRadius: 25,
	backgroundColor: "orange"
	,
  },
   button4: {
	left: 100,
	bottom: 5,
	height: 100,
	width: 100,
	borderRadius: 25,
	backgroundColor: "green"
	,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
	textAlign: "center",
  }, 
});
