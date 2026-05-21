import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCartCount, getCartTotal, money } from "../utils/helpers";

export default function CartScreen({ app }) {
  const { cart, increaseQuantity, decreaseQuantity, checkout } = app;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <Text style={styles.summary}>Items: {getCartCount(cart)} | Total: {money(getCartTotal(cart))}</Text>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}><Ionicons name="cart-outline" size={64} color="#16007a" /><Text style={styles.emptyTitle}>Your cart is empty</Text></View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.price}>{money(item.price)} x {item.quantity}</Text>
                  <View style={styles.quantityRow}>
                    <TouchableOpacity style={styles.smallButton} onPress={() => decreaseQuantity(item.id)}><Text style={styles.buttonText}>-</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton} onPress={() => increaseQuantity(item.id)}><Text style={styles.buttonText}>+</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          <TouchableOpacity style={styles.checkoutButton} onPress={checkout}><Text style={styles.buttonText}>Check Out</Text></TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#16007a", marginVertical: 12 },
  summary: { textAlign: "center", color: "#666", marginBottom: 10 },
  emptyContainer: { alignItems: "center", marginTop: 90 },
  emptyTitle: { fontSize: 22, fontWeight: "bold", marginTop: 15 },
  card: { flexDirection: "row", padding: 12, marginVertical: 7, borderRadius: 12, backgroundColor: "#f7f7f7", borderWidth: 1, borderColor: "#ddd" },
  image: { width: 88, height: 88, resizeMode: "contain", backgroundColor: "#fff", borderRadius: 8 },
  info: { flex: 1, marginLeft: 12 },
  productTitle: { fontSize: 15, fontWeight: "bold" },
  price: { marginTop: 6, fontWeight: "bold", color: "#0f52ba" },
  quantityRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  smallButton: { backgroundColor: "#16007a", paddingHorizontal: 18, paddingVertical: 8, borderRadius: 6 },
  checkoutButton: { backgroundColor: "#16007a", padding: 15, borderRadius: 8, alignItems: "center", marginVertical: 12 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
