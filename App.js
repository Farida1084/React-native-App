import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Button } from "react-native";
import AddsScreen from "./Screens/AddsScreen";
import DetailsScreen from "./Screens/DetailsScreen";

import PlantsScreen from "./Screens/PlantsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Plants"
          component={PlantsScreen}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <Button title="Add" onPress={() => navigation.navigate("Add")} />
            ),
            title: "",
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailsScreen}
          options={({ navigation, route }) => ({
            // Add a placeholder button without the `onPress` to avoid flicker
            headerRight: () => (
              <Button title="Add" onPress={() => navigation.navigate("Add")} />
            ),
            title: "",
          })}
        />
        <Stack.Screen
          name="Add"
          component={AddsScreen}
          options={({ navigation, route }) => ({
            // Add a placeholder button without the `onPress` to avoid flicker
            // headerRight: () => (
            //   <Button title="Add" onPress={() => navigation.navigate("Add")} />
            // ),
            title: "",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
