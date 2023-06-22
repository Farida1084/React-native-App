import {
  Button,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { useState } from "react";

// import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
export default function AddScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const [text, onChangeText] = useState("");
  const [days, setDays] = useState();
  const daysData = [
    { text: "Everyday", value: 1 },

    { text: "2 days", value: 2 },
    { text: "3 days", value: 3 },
    { text: " 4 days", value: 4 },
    { text: "5 days", value: 5 },
    { text: " once in a week", value: 6 },
  ];

  return (
    <View style={styles.container}>
      <Button title="Select picture from roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, borderRadius: 20 }}
        />
      )}

      <Text style={styles.text}>Add this plant:</Text>

      <SelectDropdown
        data={daysData}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setDays(selectedItem.value);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.text;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.text;
        }}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Button
        title="Add"
        onPress={() => {
          const todo = {
            days,
            text,
            uri: image,
            timeStamp: Date.now(),
          };
          navigation.navigate("Plants", { todo });
        }}
      />
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    height: 40,
    width: 160,
    margin: 22,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  text: {
    margin: 20,
  },
});
