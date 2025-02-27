import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import cuisines from "../constants/cuisines";
import { useState } from "react";

const Settings = () => {
  const [cuisineList, setCuisineList] = useState<string[]>(
    cuisines.slice(0, 15)
  );
  const [newCuisine, setNewCuisine] = useState<string>("");

  const removeCuisine = (index: number) => {
    let newList = cuisineList.filter((_, i) => i !== index);
    setCuisineList(newList);
  };

  const addCuisine = () => {
    const isDuplicate = cuisineList.some(
      (cuisine) =>
        cuisine.toLowerCase().trim() === newCuisine.toLowerCase().trim()
    );

    if (newCuisine !== "" && !isDuplicate) {
      let newList = [...cuisineList, newCuisine];
      setCuisineList(newList);
    }
    setNewCuisine("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modify list of cuisines</Text>
      <View style={{ width: "100%", flex: 1 }}>
        <FlatList
          data={cuisineList}
          renderItem={({ item, index }) => (
            <View style={styles.listView}>
              <Text>{item}</Text>

              <Pressable
                onPress={() => {
                  removeCuisine(index);
                }}
              >
                <Text style={{ color: "red" }}>x</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          height: "15%",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter new cuisine"
          value={newCuisine}
          onChangeText={setNewCuisine}
        />
        <Button title={"add new cuisine"} onPress={addCuisine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    width: 200,
    marginVertical: 10,
    padding: 10,
  },
});

export default Settings;
