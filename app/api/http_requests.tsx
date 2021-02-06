import { Alert } from "react-native";

const endpoint = "https://us-central1-hiya-b2b7f.cloudfunctions.net";

export function ensureValidId(id: string) {
  if (id.length != 8) {
    return false;
  }
  var alphaNumeric = /^[0-9A-Z]+$/;
  if (alphaNumeric.test(id)) {
    return true;
  }
}

export function addFriend(userid: string, friendid: string) {
  fetch(endpoint + "/addFriend", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      userid: userid,
      friendid: friendid,
    },
  }).then((response) => {
    if (response.status == 200) {
      Alert.alert("Successfully added friend!");
    } else {
      Alert.alert("Unable to add friend");
    }
  });
}

export async function getFriends(userid: string) {
  try {
    let response = await fetch(endpoint + "/getFriends", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        userid: userid,
      },
    });
    let json = await response.json();
    return json.friends;
  } catch (error) {
    console.log(error);
  }
}

export function getUserById(userid: string) {
  fetch(endpoint + "/getUserById", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      userid: userid,
    },
  })
    .then((response) => {
      response.json();
    })
    .then((responseJson) => {
      // Edit this to use the response
      console.log(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getNewUserId(userid: string) {
  fetch(endpoint + "/getNewUserId", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      response.json();
    })
    .then((responseJson) => {
      // Edit this to use the response
      console.log(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function sendMessage(
  senderid: string,
  recipientid: string,
  message: string
) {
  fetch(endpoint + "/sendMessage", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      senderid: senderid,
      recipientid: recipientid,
      message: message,
    },
  })
    .then((response) => {
      response.json();
      console.log(response.status);
    })
    .then((responseJson) => {
      // Edit this to use the response
      console.log(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
}
