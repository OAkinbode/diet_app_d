import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { Users } from "../constants/defaultTypes";
import { add } from "date-fns";

type WelcomeProps = {
  username: string;
  userObject: Users;
  setUserObject: (userObject: Users) => void;
};

const Welcome: React.FC<WelcomeProps> = ({
  username,
  userObject,
  setUserObject,
}) => {
  const [preference, setPreference] = useState<string>("");

  const addPreference = () => {
    let preferences = userObject.preferences;
    preferences.push(preference);
    setUserObject({ ...userObject, preferences });
    setPreference("");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome {userObject.firstName} to my dieting application. Your
        preferences are:
      </Text>
      {userObject.preferences.map((preference, index) => (
        <Text key={index} style={styles.preferences}>
          {preference}
        </Text>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Add a preference"
        value={preference}
        onChangeText={setPreference}
      />

      <Button title="Add preference" onPress={addPreference} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  preferences: { fontSize: 16, marginVertical: 10, color: "blue" },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    width: 200,
    marginVertical: 10,
    padding: 10,
  },
});

export default Welcome;
