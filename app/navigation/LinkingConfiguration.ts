import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          HiyaMain: {
            screens: {
              HiyaMainScreen: "one",
            },
          },
          FriendsScreen: {
            screens: {
              FriendsScreenScreen: "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
