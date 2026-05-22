import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}><Ionicons name="storefront" size={64} color="#fff" /></View>
      <Text style={styles.title}>Fake Store</Text>
      <Text style={styles.subtitle}>Welcome to Ali's App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#16007a", justifyContent: "center", alignItems: "center" },
  logo: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: "#fff", justifyContent: "center", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 42, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "#ddd", marginTop: 8 },
});
