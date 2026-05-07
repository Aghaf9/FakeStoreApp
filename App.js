import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/Categories";
import ElectronicsScreen from "./src/components/ElectronicsScreen";
import JeweleryScreen from "./src/components/JeweleryScreen";
import MensClothingScreen from "./src/components/MensClothingScreen";
import WomensClothingScreen from "./src/components/WomensClothingScreen";
import CartScreen from "./src/components/CartScreen";


const Stack = createNativeStackNavigator();

export default function App() {
    const [cartItems, setCartItems] = React.useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

  return (
    <NavigationContainer>
        
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={HomeScreen} />
        
        <Stack.Screen name="Electronics">
            {(props) => <ElectronicsScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>    
        
        <Stack.Screen name="Jewelery">
          {(props) => <JeweleryScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>

        <Stack.Screen name="MensClothing">
          {(props) => <MensClothingScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>

        <Stack.Screen name="WomensClothing">
          {(props) => <WomensClothingScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>

        <Stack.Screen name="Cart">
          {(props) => <CartScreen {...props} cartItems={cartItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
