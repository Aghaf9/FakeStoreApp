import React from "react";
import { View, StyleSheet } from "react-native";
import ProductListScreen from "./ProductListScreen";

export default function MensClothingScreen() {
  return (
      <ProductListScreen category="men's clothing" title="Men's Clothing" addToCart={addToCart} navigation={navigation}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});