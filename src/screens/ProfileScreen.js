import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen({ username }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.username}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 30, fontWeight: "bold" },
  username: { fontSize: 20, marginTop: 10 },
});