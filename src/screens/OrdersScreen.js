import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { money } from "../utils/helpers";

const sections = ["new", "paid", "delivered"];
const labels = { new: "New Orders", paid: "Paid Orders", delivered: "Delivered Orders" };

export default function OrdersScreen({ app }) {
  const { orders, updateOrderStatus } = app;
  const [expanded, setExpanded] = useState({});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>My Orders</Text>
        {orders.length === 0 && <Text style={styles.empty}>No orders yet.</Text>}
        {sections.map((status) => {
          const matchingOrders = orders.filter((order) => order.status === status);
          return (
            <View key={status} style={styles.section}>
              <Text style={styles.heading}>{labels[status]} ({matchingOrders.length})</Text>
              {matchingOrders.map((order) => {
                const isOpen = !!expanded[order.id];
                return (
                  <View key={order.id} style={styles.orderCard}>
                    <TouchableOpacity style={styles.orderHeader} onPress={() => setExpanded((current) => ({ ...current, [order.id]: !isOpen }))}>
                      <Text style={styles.orderId}>{order.id}</Text><Text>{order.itemCount} items</Text><Text>{money(order.total)}</Text><Ionicons name={isOpen ? "caret-up" : "caret-down"} size={20} />
                    </TouchableOpacity>
                    {isOpen && (
                      <View>
                        {order.items.map((item) => (
                          <View key={item.id} style={styles.orderItem}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                            <Text>x{item.quantity}</Text>
                          </View>
                        ))}
                        {order.status === "new" && <TouchableOpacity style={styles.button} onPress={() => updateOrderStatus(order.id, "paid")}><Text style={styles.buttonText}>Pay</Text></TouchableOpacity>}
                        {order.status === "paid" && <TouchableOpacity style={styles.button} onPress={() => updateOrderStatus(order.id, "delivered")}><Text style={styles.buttonText}>Receive</Text></TouchableOpacity>}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#16007a", marginVertical: 12 },
  empty: { textAlign: "center", color: "#666", marginVertical: 20 },
  section: { marginBottom: 14 },
  heading: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  orderCard: { backgroundColor: "#f7f7f7", borderRadius: 10, borderWidth: 1, borderColor: "#ddd", marginVertical: 6, padding: 10 },
  orderHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  orderId: { fontWeight: "bold", flex: 1 },
  orderItem: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8, borderTopWidth: 1, borderTopColor: "#ddd" },
  image: { width: 50, height: 50, resizeMode: "contain", backgroundColor: "#fff", borderRadius: 6 },
  itemTitle: { flex: 1 },
  button: { backgroundColor: "#16007a", padding: 12, borderRadius: 8, alignItems: "center", marginVertical: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
