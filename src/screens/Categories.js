import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { label: "Electronics", value: "electronics" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
];

export default function CategoriesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Product Categories</Text>
      {categories.map((category) => (
        <TouchableOpacity key={category.value} style={styles.card} onPress={() => navigation.navigate("ProductList", { category: category.value, title: category.label })}>
          <Ionicons name="pricetag" size={28} color="#16007a" />
          <Text style={styles.cardText}>{category.label}</Text>
          <Ionicons name="chevron-forward" size={24} color="#777" />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 18 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#16007a", marginVertical: 20 },
  card: { flexDirection: "row", alignItems: "center", padding: 18, marginVertical: 8, borderRadius: 12, backgroundColor: "#f4f2ff", borderWidth: 1, borderColor: "#ddd" },
  cardText: { flex: 1, fontSize: 18, fontWeight: "bold", marginLeft: 12 },
});
