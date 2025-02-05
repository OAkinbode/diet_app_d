import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Signin from "../components/signin";
import Welcome from "../components/welcome";
import { useState } from "react";
import { Users } from "../constants/defaultTypes";

const userObjectDefault: Users = {
  firstName: "felix",
  lastName: "Turnbull",
  phoneNumber: "750320333",
  email: "felix@gmail.com",
  username: "felix",
  preferences: ["vegan", "vegetarian"],
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [userObject, setUserObject] = useState<Users>(userObjectDefault);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Welcome
          username={username}
          userObject={userObject}
          setUserObject={setUserObject}
        />
      ) : (
        <Signin
          booleanToggle={setIsLoggedIn}
          username={username}
          setUsername={setUsername}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
