import { Button, StyleSheet, Text, View, Image } from "react-native";

const WEEK_IN_MILLIS = 1000 * 60 * 60 * 24 * 7;
const DAYS_IN_MILLIS = 1000 * 60 * 60 * 24;

function DetailsScreen({ navigation, route }) {
  //ny inlägg
  const { title, id, timeStamp, uri, days } = route.params;
  console.log("uri", uri);

  console.log(timeStamp);

  const timeInMillis = DAYS_IN_MILLIS * days;

  const timeDiff = Date.now() - timeStamp;

  const timeToNextWater = timeInMillis - (timeDiff % timeInMillis);

  const daysLeft = Math.round(timeToNextWater / DAYS_IN_MILLIS);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={{ width: 200, height: 200, borderRadius: 20 }}
      />

      <Text>{title}</Text>

      <Text> Show som love in {daysLeft} days !!!!</Text>

      <Button
        title="Klar"
        onPress={() => {
          navigation.navigate("Plants", { deleteId: id });
        }}
      />
    </View>
  );
}
export default DetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
