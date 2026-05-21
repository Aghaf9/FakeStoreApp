import React, { useMemo, useState } from "react";
import { Alert } from "react-native";
import AppTabs from "./AppTabs";
import { USERS_KEY, CURRENT_USER_KEY, userDataKey, readJson, writeJson, removeCurrentUser } from "../storage/storage";

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [initialTab, setInitialTab] = useState("Account");

  const persistData = async (nextCart, nextOrders, currentUser = user) => {
    if (!currentUser) return;
    await writeJson(userDataKey(currentUser.email), { cart: nextCart, orders: nextOrders });
  };

  const login = async (loggedUser, savedData, targetTab = "Products") => {
    setUser(loggedUser);
    setCart(savedData.cart || []);
    setOrders(savedData.orders || []);
    setInitialTab(targetTab);
    await writeJson(CURRENT_USER_KEY, loggedUser.email);
  };

  const signOut = async () => {
    setUser(null);
    setCart([]);
    setOrders([]);
    setInitialTab("Account");
    await removeCurrentUser();
    Alert.alert("Signed Out", "Cart, order, and tab badges have been cleared.");
  };

  const addToCart = async (product) => {
    const nextCart = cart.some((item) => item.id === product.id)
      ? cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }];
    setCart(nextCart);
    await persistData(nextCart, orders);
    Alert.alert("Added", "Product added to the shopping cart.");
  };

  const increaseQuantity = async (productId) => {
    const nextCart = cart.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
    setCart(nextCart);
    await persistData(nextCart, orders);
  };

  const decreaseQuantity = async (productId) => {
    const nextCart = cart.map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0);
    setCart(nextCart);
    await persistData(nextCart, orders);
  };

  const checkout = async () => {
    if (cart.length === 0) {
      Alert.alert("Empty Cart", "Add products before checking out.");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const order = { id: `ORD-${Date.now()}`, status: "new", items: cart, total, itemCount, createdAt: new Date().toISOString() };

    try {
      await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id || 1, date: new Date().toISOString().slice(0, 10), products: cart.map((item) => ({ productId: item.id, quantity: item.quantity })) }),
      });
      const nextOrders = [order, ...orders];
      setOrders(nextOrders);
      setCart([]);
      await persistData([], nextOrders);
      Alert.alert("Order Created", "Checkout complete. The cart has been cleared.");
    } catch (error) {
      Alert.alert("Checkout Error", "Could not create order.");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch("https://fakestoreapi.com/carts/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const nextOrders = orders.map((order) => order.id === orderId ? { ...order, status } : order);
      setOrders(nextOrders);
      await persistData(cart, nextOrders);
      Alert.alert("Updated", `Order marked as ${status}.`);
    } catch (error) {
      Alert.alert("Update Error", "Could not update order status.");
    }
  };

  const updateProfile = async (newName, newPassword) => {
    if (!newName.trim()) {
      Alert.alert("Validation Error", "Name cannot be empty.");
      return;
    }
    try {
      await fetch("https://fakestoreapi.com/users/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, password: newPassword }),
      });
      const users = await readJson(USERS_KEY, []);
      const nextUser = { ...user, name: newName.trim(), password: newPassword || user.password };
      const nextUsers = users.map((savedUser) => savedUser.email === user.email ? nextUser : savedUser);
      await writeJson(USERS_KEY, nextUsers);
      setUser(nextUser);
      Alert.alert("Profile Updated", "Your profile was updated successfully.");
    } catch (error) {
      Alert.alert("Update Error", "Could not update profile.");
    }
  };

  const app = useMemo(() => ({ user, cart, orders, login, signOut, addToCart, increaseQuantity, decreaseQuantity, checkout, updateOrderStatus, updateProfile }), [user, cart, orders]);
  return <AppTabs loggedIn={!!user} app={app} initialRouteName={initialTab} />;
}

