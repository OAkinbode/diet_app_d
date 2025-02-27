import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const ApiCallComponent = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const [food, setFood] = useState<string>("");

  //   const makeApiCall = async () => {
  //     setLoading(true);
  //     await fetch("https://jsonplaceholder.typicode.com/posts")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setData(data);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });

  //     console.log(data);
  //   };

  const foodList = ["hamburger", "pizza", "fries", "chicken", "salad"];

  useEffect(() => {
    const foodPresent = foodList.includes(food);
    console.log(food);
    if (foodPresent) {
      makeApiCall();
      setFood("");
    }
  }, [food]);

  const makeApiCall = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/search/instant/?query=${food}`,
        {
          method: "GET",
          headers: {
            "x-app-id": "363f223f",
            "x-app-key": "6f523dab928dce2190670ef3e229260a",
          },
        }
      );
      const data = await response.json();
      setData(data.branded.slice(0, 7));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to API Call</Text>
      <TextInput
        placeholder="Input a food"
        value={food}
        onChangeText={setFood}
        style={styles.input}
      ></TextInput>
      {loading ? (
        <Text style={{ fontSize: 40 }}>Value is loading...</Text>
      ) : (
        <></>
      )}
      <View>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <View
              key={item.nix_item_id}
              style={{ margin: 5, flexDirection: "row", maxWidth: "100%" }}
            >
              <Text>{item.brand_name} </Text>
              <Text>{item.food_name}, </Text>
              <Text>{item.nf_calories} calories</Text>
            </View>
          ))}
      </View>
      {/* <Button title="Make API call" onPress={makeApiCall} /> */}
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
  },
  input: {
    width: 200,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default ApiCallComponent;
