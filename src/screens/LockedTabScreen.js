import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LockedTabScreen() {
  useEffect(() => {
    Alert.alert("Login Required", "Please sign in or sign up to access this tab.");
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="lock-closed" size={60} color="#16007a" />
      <Text style={styles.title}>Login Required</Text>
      <Text style={styles.text}>Use the Account tab to sign in or sign up.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 25, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 15 },
  text: { color: "#666", marginTop: 8, textAlign: "center" },
});
