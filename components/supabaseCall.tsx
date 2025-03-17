import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import {
  getDeserts,
  createDesert,
  updateDesert,
  deleteDesert,
} from "../lib/supabase_crud";

interface UpdateDesertCompProps {
  desert_uuid: string;
  newCalories: string;
  desert_name: string;
  setNewCalories: (newCalories: string) => void;
  updateNewCalories: (desert_uuid: string, desert_name: string) => void;
}

interface Desert {
  desert_name: string;
  calories: number;
}

const UpdateDesertComp: React.FC<UpdateDesertCompProps> = ({
  desert_uuid,
  newCalories,
  updateNewCalories,
  setNewCalories,
  desert_name,
}) => {
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 10,
        padding: 10,
      }}
    >
      <TextInput
        style={styles.input}
        placeholder="Update Calories"
        value={newCalories}
        onChangeText={setNewCalories}
      />
      <Pressable
        style={styles.button}
        onPress={() => updateNewCalories(desert_uuid, desert_name)}
      >
        <Text style={styles.buttonText}>Update</Text>
      </Pressable>
    </View>
  );
};

const DatabaseCallComponent = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const [desertName, setDesertName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [newCalories, setNewCalories] = useState<string>("");
  const [showEdit, setShowEdit] = useState<number[]>([]);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getDeserts();
      setData(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateDesert = async () => {
    if (desertName === "") {
      return;
    }
    try {
      await createDesert({
        desert_name: desertName,
        calories: calories === "" ? 0 : parseInt(calories),
      });
      fetchData();
    } catch (error) {
      setError(error as Error);
    } finally {
      setDesertName("");
      setCalories("");
    }
  };

  const handleUpdateDesert = async (
    desert_uuid: string,
    desert_name: string
  ) => {
    if (newCalories === "") {
      return;
    }
    try {
      const new_data: Desert = {
        desert_name: desert_name,
        calories: newCalories === "" ? 0 : parseInt(newCalories),
      };
      await updateDesert(desert_uuid, new_data);
      fetchData();
    } catch (error) {
      setError(error as Error);
    } finally {
      setNewCalories("");
    }
  };

  const handleDeleteDesert = async (desert_uuid: string) => {
    try {
      await deleteDesert(desert_uuid);
      fetchData();
    } catch (error) {
      setError(error as Error);
    }
  };

  const toggleEdit = (index: number) => {
    if (showEdit.includes(index)) {
      setShowEdit(showEdit.filter((i) => i !== index));
    } else {
      setShowEdit([...showEdit, index]);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setShowUpdate(!showUpdate);
        }}
      >
        <Text>{showUpdate ? "Close update window" : "Add desert"}</Text>
      </Pressable>
      {showUpdate && (
        <View
          style={{
            height: 200,
            padding: 10,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Desert Name"
            value={desertName}
            onChangeText={setDesertName}
          />
          <TextInput
            style={styles.input}
            placeholder="Calories"
            value={calories}
            onChangeText={setCalories}
          />
          <Pressable style={styles.button} onPress={handleCreateDesert}>
            <Text style={styles.buttonText}>add Desert</Text>
          </Pressable>
        </View>
      )}
      <ScrollView contentContainerStyle={{ padding: 10, width: "100%" }}>
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error.message}</Text>}
        {data &&
          data.map((desert, index) => (
            <View key={index} style={styles.userCard}>
              <Pressable onPress={() => handleDeleteDesert(desert.desert_uuid)}>
                <Text style={{ fontSize: 20, color: "red" }}>X</Text>
              </Pressable>

              <Pressable onPress={() => toggleEdit(index)}>
                <Text style={styles.userText}>UUID: {desert.desert_uuid}</Text>
                <Text style={styles.userText}>Name: {desert.desert_name}</Text>
                <Text style={styles.userText}>Calories: {desert.calories}</Text>
              </Pressable>

              {showEdit.includes(index) && (
                <UpdateDesertComp
                  desert_uuid={desert.desert_uuid}
                  newCalories={newCalories}
                  updateNewCalories={handleUpdateDesert}
                  setNewCalories={setNewCalories}
                  desert_name={desert.desert_name}
                />
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default DatabaseCallComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: "green",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
  },
});
