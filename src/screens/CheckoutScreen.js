import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CheckoutScreen({ route, navigation }) {
  const username = route?.params?.username || "Guest";
  const email = route?.params?.email || "No email provided";
  const orderId = route?.params?.orderId || "No order ID";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout Complete</Text>

      <Text style={styles.text}>Username: {username}</Text>
      <Text style={styles.text}>Email: {email}</Text>
      <Text style={styles.text}>Order ID: {orderId}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
    >
        
  <Text style={styles.buttonText}>Sign Out</Text>
</TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Back to Categories</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#16007a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});