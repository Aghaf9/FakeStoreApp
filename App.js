import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/Categories";
import ElectronicsScreen from "./src/components/ElectronicsScreen";
import JeweleryScreen from "./src/components/JeweleryScreen";
import MensClothingScreen from "./src/components/MensClothingScreen";
import WomensClothingScreen from "./src/components/WomensClothingScreen";
import CartScreen from "./src/components/CartScreen";

import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [cartItems, setCartItems] = React.useState([]);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn">
          {(props) => (
            <SignInScreen
              {...props}
              setUsername={setUsername}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="SignUp">
          {(props) => (
            <SignUpScreen
              {...props}
              setUsername={setUsername}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          )}
        </Stack.Screen>

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
          {(props) => (
            <CartScreen
              {...props}
              cart={cartItems}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              username={username}
              email={email}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Checkout" component={CheckoutScreen} />

        <Stack.Screen name="Profile">
          {(props) => (
            <ProfileScreen
              {...props}
              username={username}
              email={email}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}