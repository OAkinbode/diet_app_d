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
import { Link, useRouter } from "expo-router";
import ApiCallComponent from "./apiCall";

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
  const router = useRouter();

  const addPreference = () => {
    let preferences = userObject.preferences;
    preferences.push(preference);
    setUserObject({ ...userObject, preferences });
    setPreference("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.settingsSection}>
        <Link href="/settings">
          <Text style={styles.settingsText}>Settings</Text>
        </Link>
      </View>
      <View style={styles.bodySection}>
        <Text style={styles.text}>
          Welcome {userObject.firstName} to my dieting application. Your
          preferences are:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Add a preference"
          value={preference}
          onChangeText={setPreference}
        />

        <Button title="Add preference" onPress={addPreference} />
        <View style={{ height: "70%" }}>
          <Button
            title="Go to API Call"
            onPress={() => {
              router.push("/apicallDemo");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
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
  settingsSection: {
    height: "5%",
    width: "100%",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  settingsText: {
    fontSize: 16,
    color: "green",
  },
  bodySection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Welcome;
