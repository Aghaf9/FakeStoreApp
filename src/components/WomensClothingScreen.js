import React from "react";
import { View, StyleSheet } from "react-native";
import ProductListScreen from "./ProductListScreen";

export default function WomensClothingScreen({ addToCart }) {
  return (
    <ProductListScreen 
      category="women's clothing"
      title="Women's Clothing"
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