import React from "react";
import { View, StyleSheet } from "react-native";
import ProductListScreen from "./ProductListScreen";

export default function WomensClothingScreen() {
  return (
      <ProductListScreen category="women's clothing" title="Women's Clothing" addToCart={addToCart} navigation={navigation}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});