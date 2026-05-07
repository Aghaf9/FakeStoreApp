import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function CartScreen({
  cart = [],
  increaseQuantity = () => {},
  decreaseQuantity = () => {},
  username = "Guest",
  email = "",
  navigation,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    navigation.navigate("Checkout", {
      username,
      email,
      orderId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>

                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => decreaseQuantity(item.id)}
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => increaseQuantity(item.id)}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.checkoutButton} onPress={checkout}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  empty: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#0f52ba",
    marginTop: 5,
    fontWeight: "bold",
  },
  quantityRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  qtyButton: {
    backgroundColor: "#0f52ba",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
    marginRight: 10,
  },
  qtyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  checkoutButton: {
    backgroundColor: "#16007a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});