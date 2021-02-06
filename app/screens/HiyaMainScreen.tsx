import 'react-native-gesture-handler';

import * as React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, Image, FlatList, Button } from "react-native";
import { createStackNavigator, HeaderBackground } from "@react-navigation/stack";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { NavigationContainer } from '@react-navigation/native';

import FriendsScreen from "./FriendsScreen"
import Navigation from '../navigation';

const screenNavigator = createStackNavigator()


export default function HiyaMainScreen({navigation}: {navigation: any}) {
  
  return (
    <ImageBackground source={require('./images/bg.png')} 
      style={styles.container}>
     
      <Text style={styles.title}>Choose your message</Text>


      <TouchableOpacity 
        onPress={() => navigation.navigate('Friends')}
        style={styles.button1}> 
        <Text style={styles.textStyle}>Good morning</Text>
        <Image source={require('./images/2600.png')} style={styles.Moon}/>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => alert("Hiya! Send me a joke!")}
        style={styles.button2}> 
        <Text style={styles.textStyle}>Send me a joke</Text>
        <Image source={require('./images/1F92A.png')} style={styles.Moon}/>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => alert("Hiya! I am sending some love your way!")}
        style={styles.button3}> 
        <Text style={styles.textStyle}>Send some love</Text>
        <Image source={require('./images/2665.png')} style={styles.Moon}/>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => alert("Hiya! Sending you a virtual hug!")}
        style={styles.button4}> 
        <Text style={styles.textStyle}>Send a hug</Text>
        <Image source={require('./images/1F618.png')} style={styles.Moon}/>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => alert("Hiya! Just wanted to let you know that I'm thinking about you!")}
        style={styles.button5}> 
        <Text style={styles.textStyle}>Thinking about you</Text>
        <Image source={require('./images/263A.png')} style={styles.Moon}/>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => alert("Hiya! I just wanted to let you know that I miss you. I hope we can meet again soon!")}
        style={styles.button6}> 
        <Text style={styles.textStyle}>I miss you</Text>
        <Image source={require('./images/1F970.png')} style={styles.HeartFace}/>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => alert("Hiya! You deserve some good rest. Sleep well!")}
        style={styles.button7}> 
        <Text style={styles.textStyle}>Sleep well </Text>
        <Image source={require('./images/1F31B.png')} style={styles.Moon}/>
      </TouchableOpacity>
     </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    right: 0,
    bottom: 150,
    height: 300,
    width: 350,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button1:{
    right: 0,
    bottom: 250,
    height: 70,
    width: 350,
    borderRadius: 25,
    backgroundColor: 'rgba(250, 201, 22, 0.9)'
  },
  button2:{
    right: 0,
    bottom: 220,
    height: 70,
    width: 350,
    borderRadius: 25,
    backgroundColor: 'rgba(250, 110, 22, 0.9)'
  },
  button3:{
    right: 0,
    bottom: 190,
    height: 70,
    width: 350,
    borderRadius: 25,
    backgroundColor: 'rgba(201, 18, 70, 0.9)'
  },
  button4:{
    right: 0,
    bottom: 160,
    height: 70,
    width: 350,
    borderRadius: 25,
    backgroundColor: 'rgba(161, 24, 127, 0.9)'
  },
  button5:{
    right: 0,
    bottom: 130,
    height: 70,
    width: 350,
    borderRadius: 25,
    backgroundColor: 'rgba(133, 40, 133, 0.9)'
  },
  button6:{
    right: 0,
    bottom: 100,
    height: 70,
    width: 350,
    borderRadius: 25,
    backgroundColor: 'rgba(72, 38, 120, 0.9)'
  },
  button7:{
    right: 0,
    bottom: 70,
    height: 70,
    width: 350,
    borderRadius: 25,
    backgroundColor: 'rgba(23, 22, 105, 0.9)'
  },
  textStyle:{
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 30,
    right: -20,
    bottom: -14
  },
  Moon:{
    right: -280,
    bottom: 41,
  },
  HeartFace:{
    right: -280,
    bottom: 41,
  },
});
