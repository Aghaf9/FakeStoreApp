import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ElectronicsScreen() {
  return (
    <View style={styles.container}>
      <ProductListScreen category="electronics" title="Electronics" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001040",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

JeweleryScreen.js
JavaScript
import React from "react";
import { View, Text, StyleSheet } from "react-native";

