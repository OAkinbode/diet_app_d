import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import credentials from "../credentials.json";
import { Link, useRouter } from "expo-router";

type SigninProps = {
  booleanToggle: (isLoggedIn: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
};

const Signin: React.FC<SigninProps> = ({
  booleanToggle,
  username,
  setUsername,
}) => {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = () => {
    const user = credentials.users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      booleanToggle(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const routetoPasswordRecovery = () => {
    router.push("/passwordRecovery");
  };

  return (
    <View style={style.container}>
      <Text style={style.heading}>Welcome to Login!</Text>
      <TextInput
        style={style.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={style.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleSubmit} />

      <Link href={"/passwordRecovery"}>
        <Text style={style.text}>Forgot your password?</Text>
      </Link>

      {/* <Button title="Forgot your password?" onPress={routetoPasswordRecovery} /> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: { fontSize: 20, fontWeight: "bold" },
  text: { fontSize: 16, marginVertical: 10, color: "blue" },
  button: { marginVertical: 10 },
  input: {
    width: 200,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default Signin;
