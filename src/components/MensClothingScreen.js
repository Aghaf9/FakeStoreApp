import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MensClothingScreen() {
  return (
    <View style={styles.container}>
      <ProductListScreen category="men's clothing" title="Men's Clothing" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0028b8",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
