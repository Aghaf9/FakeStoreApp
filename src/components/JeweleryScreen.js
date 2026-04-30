import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JeweleryScreen() {
  return (
    <View style={styles.container}>
      <ProductListScreen category="jewelery" title="Jewelery" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe65b",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});