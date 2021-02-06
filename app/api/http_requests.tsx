const endpoint = "https://us-central1-hiya-b2b7f.cloudfunctions.net/";

export function addFriend(userid: string, friendid: string) {
  fetch(endpoint + "/addFriend", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      userid: userid,
      friendid: friendid,
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

export function getFriends(userid: string) {
  fetch(endpoint + "/getFriends", {
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
