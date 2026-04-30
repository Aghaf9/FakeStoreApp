import React from "react";
import { View, StyleSheet } from "react-native";
import ProductListScreen from "./ProductListScreen";

export default function MensClothingScreen({ addToCart }) {
  return (
    <ProductListScreen 
      category="men's clothing"
      title="Men's Clothing"
      addToCart={addToCart} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});