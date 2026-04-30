import React from "react";
import { View, StyleSheet } from "react-native";
import ProductListScreen from "./ProductListScreen";

export default function CartScreen() {
  return (
      <ProductListScreen category="cart" title="Cart" />
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#fff",
  },
});