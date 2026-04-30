import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WomensClothingScreen() {
  return (
    <View style={styles.container}>
      <ProductListScreen category="women's clothing" title="Women's Clothing" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b35cac",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});