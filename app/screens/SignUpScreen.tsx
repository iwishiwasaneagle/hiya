import 'react-native-gesture-handler';

import * as React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, Image, View, Dimensions, Text} from "react-native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons, Feather } from '@expo/vector-icons'

const { width: WIDTH } = Dimensions.get('window')





export default function SignUpScreen() {
    return (
      <ImageBackground
          source={require('./images/loginbg.jpg')} style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
            source={require("./images/logosmall.png")}
            style={styles.logoPos}
            />
          </View>

          <Text style={styles.title}>
            Hiya! We're happy you're joining us.
          </Text>

          <View>
            <Ionicons name="person-outline" size={24} color="white"
            style={styles.inputIcon} />
        
            <TextInput
              style={styles.input}
              placeholder={'New Username'}
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid='transparent'
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={24} color="white"
            style={styles.inputIcon} />
        
            <TextInput
              style={styles.input}
              placeholder={'New Password'}
              secureTextEntry={true}
              placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
              underlineColorAndroid='transparent'
            />
          </View>

          <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.text}>Create Account</Text>
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
      fontSize: 22,
      fontWeight: "bold",
      color: "white",
      bottom: 30
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    logoPos: {
      right: 0,
      bottom: 41,
    },
    logoContainer: {
      alignItems: 'center'
    },
    inputContainer:{
      marginTop: 10
    },
    input:{
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      color: 'rgba(255, 255, 255, 0.7)',
      marginHorizontal: 25
    },
    inputIcon:{
      position: 'absolute',
      top: 9,
      left: 37,
    },
    eyeButton:{
      position: 'absolute',
      top: 9,
      right: 37,
    },
    loginButton:{
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      backgroundColor: '#432577',
      justifyContent: 'center',
      marginTop: 20
    },
    text: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 16,
      textAlign: 'center'
    },
    signupButton:{
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      backgroundColor: '#ff8c69',
      justifyContent: 'center',
      marginTop: 20
    }

});