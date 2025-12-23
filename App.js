import { StatusBar } from "expo-status-bar";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  function sayHi() {
    alert("Hi user!");
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Pressable
        onPress={() => sayHi()}
        style={{
          backgroundColor: "#00ccff",
          padding: 10,
        }}
      >
        <Text>Hi</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
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
