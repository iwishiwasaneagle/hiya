import * as React from "react";
import { StyleSheet, TextInput, Button, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { addFriend, ensureValidId } from "../api/http_requests";

export default function AddFriendScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your User ID </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <UserIdBox>123456 </UserIdBox>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>
        Ask your friend for their User ID and add them below!
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <UserIdTextInput></UserIdTextInput>
    </View>
  );
}

const UserIdBox = (props) => (
  <TouchableOpacity style={styles.userIdBoxContainer}>
    <Text style={styles.userIdBoxText}>{props.children}</Text>
  </TouchableOpacity>
);

const UserIdTextInput = () => {
  const [enteredId, setEnteredId] = React.useState("");

  const submit = () => {
    // Ensure it is valid (alphaNumeric and 8 chars long)
    const valid = ensureValidId(enteredId);
    if (valid) {
      // Check they dont try to add themselves
      if (enteredId != "9UD2ZWJT") {
        addFriend("9UD2ZWJT", enteredId);
      } else {
        Alert.alert("Cannot add yourself as a friend");
      }
    } else {
      // Present error message saying invalid
      Alert.alert("Invalid ID");
    }
  };

  return (
    <TextInput
      style={styles.userIdTextInput}
      placeholder="Enter your friend's ID here!"
      onChangeText={(text) => setEnteredId(text)}
      onSubmitEditing={submit}
      autoCapitalize="characters"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  userIdBoxContainer: {
    elevation: 25,
    backgroundColor: "#2f95dc",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    paddingHorizontal: 25,
    width: "100%",
    height: "30%",
  },
  userIdBoxText: {
    fontSize: 32,
    color: "#fff",
    // fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    justifyContent: "center",
  },
  userIdTextInput: {
    color: "#fff",
    fontSize: 18,
    height: 40,
    borderColor: "#2f95dc",
    borderWidth: 1,
    padding: 10,
  },
});
