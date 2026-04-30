import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";

export default function ProductListScreen({ category, title, addToCart, navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching category:", category);

    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.log("ERROR:", error);
        setProducts([]);
      })
  .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (!products || products.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No products found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>

      <FlatList
        data={products}
          keyExtractor={(item, index) => 
            item.id ? item.id.toString() : index.toString()
          }        
          renderItem={({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />

    <View style={styles.info}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <Text
        style={styles.cartButton}
        onPress={() => addToCart && addToCart(item)}
      >
        Add to Cart
      </Text>
    </View>
  </View>
)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cartButton: {
  marginTop: 8,
  backgroundColor: "#0f52ba",
  color: "#fff",
  padding: 8,
  textAlign: "center",
  borderRadius: 5,
  fontWeight: "bold",
},
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
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
    width: 90,
    height: 90,
    resizeMode: "contain",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#0f52ba",
    marginVertical: 5,
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "#555",
  },
});