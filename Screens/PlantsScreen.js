import {
  TouchableOpacity,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { Image } from "expo-image";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
export default function PlantScreen({ navigation, route }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("Add")}
          title="Add"
          color="black"
        />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    if (route.params?.todo) {
      console.log("new todo: ", route.params?.todo);
      const todo = {
        title: route.params?.todo.text,
        id: Date.now(),
        timeStamp: route.params?.todo.timeStamp,
        uri: route.params?.todo.uri,
        days: route.params?.todo.days,
        daysLeft: route.params?.todo.daysLeft,
      };
      setTodos((prev) => [...prev, todo]);
    }
  }, [route.params?.todo]);
  //A ny
  useEffect(() => {
    if (route?.params?.deleteId) {
      //const newTodos = todos.filter((item) => item.id !== id);
    }
    setTodos((prev) => {
      return prev.filter((todo) => todo.id != route?.params?.deleteId);
    });
  }, [route?.params?.deleteId]);
  return (
    <SafeAreaView style={styles.container}>
      {todos.length == 0 ? (
        <View style={styles.container}>
          <Text style={styles.header}>Plants Lovers</Text>

          <Image
            style={styles.image}
            source={require("../assets/Homepage.png")}
            contentFit="cover"
            transition={1000}
          />
        </View>
      ) : (
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Detail", {
                  title: item.title,
                  id: item.id,
                  timeStamp: item.timeStamp,
                  uri: item.uri,
                  days: item.days,
                  daysLeft: item.daysLeft,
                });
              }}
            >
              <View style={styles.item}>
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: 200, height: 200, borderRadius: 20 }}
                />
                <Text>{item.days} days</Text>
                <Text>{item.daysLeft} </Text>

                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    width: 300,
    height: 80,
    backgroundColor: "#0553",
    borderRadius: 10,
  },
  item: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    height: 80,
    padding: 10,
    margin: 80,
  },
  header: {
    fontSize: 40,
    padding: 10,
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
});
