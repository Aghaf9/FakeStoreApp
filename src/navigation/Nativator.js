import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/Categories";
import ElectronicsScreen from "./src/components/ElectronicsScreen";
import JeweleryScreen from "./src/components/JeweleryScreen";
import MensClothingScreen from "./src/components/MensClothingScreen";
import WomensClothingScreen from "./src/components/WomensClothingScreen";
import CartScreen from "./src/screens/CartScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ProfileScreen from "./src/screens/ProfileScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
<Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Electronics" component={ElectronicsScreen} />
  <Stack.Screen name="Jewelery" component={JeweleryScreen} />
  <Stack.Screen name="MensClothing" component={MensClothingScreen} />
  <Stack.Screen name="WomensClothing" component={WomensClothingScreen} />
  <Stack.Screen name="Cart" component={CartScreen} />
</Stack.Navigator>

  );
}
