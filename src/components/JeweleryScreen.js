import React from "react";
import { View, StyleSheet } from "react-native";
import ProductListScreen from "./ProductListScreen";

export default function JeweleryScreen() {
  return (
    <ProductListScreen 
      category="jewelery"
      title="Jewelery"
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