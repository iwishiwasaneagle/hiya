
import { StyleSheet, TouchableOpacity } from "react-native";
import React,{useState,useEffect} from 'react';
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { addFriend, ensureValidId } from "../api/http_requests";

const endpoint = "https://us-central1-hiya-b2b7f.cloudfunctions.net";

interface friendsObj {
	friends: string[];
}
//capture current userid
let primaryUser: string = "1TTRAKMR";



//let friendsList: string[] = ["8C0IXA8C","9UD2ZWJT","F0UF7G5E","H982UZHS","ISCVQN7A",]
//console.log(friendsList.length);  

async function getFriends(userid: string){
	const response = await fetch(endpoint + "/getFriends", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      userid: userid,
    }
  })
    const json = await response.json();
  
  return json;
	
}

async function something() {
    const friendsList = await getFriends(primaryUser);
    //console.log(friendsList.friends);
	return friendsList.friends;
}

const [data,setData]= useState([]);
  
let promise = something();

promise.then(result => {
    setData(result)
});
console.log(data);


export default function FriendsScreen() {
 

  return (
    <View style={styles.container}>
	   
	  <TouchableOpacity
         
		 style={styles.button1}>
         <Text style={styles.buttonText}>Hello</Text>
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
