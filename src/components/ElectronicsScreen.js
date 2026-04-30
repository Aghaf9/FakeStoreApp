import React from "react";
import { View, StyleSheet } from "react-native";
import ProductListScreen from "./ProductListScreen";

export default function ElectronicsScreen() {
  return (
      <ProductListScreen category="electronics" title="Electronics" addToCart={addToCart} navigation={navigation}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});