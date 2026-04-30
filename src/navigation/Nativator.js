import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/Categories";
import ElectronicsScreen from "./src/componenets/ElectronicsScreen";
import JeweleryScreen from "./src/componenets/JeweleryScreen";
import MensClothingScreen from "./src/componenets/MensClothingScreen";
import WomensClothingScreen from "./src/componenets/WomensClothingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Electronics" component={ElectronicsScreen} />
        <Stack.Screen name="Jewelery" component={JeweleryScreen} />
        <Stack.Screen name="MensClothing" component={MensClothingScreen} />
        <Stack.Screen name="WomensClothing" component={WomensClothingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}