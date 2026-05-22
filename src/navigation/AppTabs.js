import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProductsStack from "./ProductsStack";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthScreen from "../screens/AuthScreen";
import LockedTabScreen from "../screens/LockedTabScreen";
import { getCartCount, getNewOrderCount } from "../utils/helpers";

const Tab = createBottomTabNavigator();

export default function AppTabs({ loggedIn, app, initialRouteName }) {
  const cartCount = getCartCount(app.cart);
  const newOrderCount = getNewOrderCount(app.orders);

  return (
    <Tab.Navigator
  key={loggedIn ? "logged-in" : "logged-out"}
  initialRouteName={loggedIn ? "Products" : "Account"}
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ color, size }) => {
      const icons = {
        Products: "storefront",
        "My Cart": "cart",
        "My Orders": "receipt",
        Profile: "person",
        Account: "person",
      };
      return <Ionicons name={icons[route.name]} size={size} color={color} />;
    },
  })}
>
      <Tab.Screen name="Products" options={{ tabBarBadge: loggedIn && cartCount > 0 ? cartCount : undefined }}>
        {(props) => loggedIn ? <ProductsStack {...props} app={app} /> : <LockedTabScreen />}
      </Tab.Screen>
      <Tab.Screen name="My Cart" options={{ tabBarBadge: loggedIn && cartCount > 0 ? cartCount : undefined }}>
        {(props) => loggedIn ? <CartScreen {...props} app={app} /> : <LockedTabScreen />}
      </Tab.Screen>
      <Tab.Screen name="My Orders" options={{ tabBarBadge: loggedIn && newOrderCount > 0 ? newOrderCount : undefined }}>
        {(props) => loggedIn ? <OrdersScreen {...props} app={app} /> : <LockedTabScreen />}
      </Tab.Screen>
      {loggedIn ? (
        <Tab.Screen name="Profile">{(props) => <ProfileScreen {...props} app={app} />}</Tab.Screen>
      ) : (
        <Tab.Screen name="Account">{(props) => <AuthScreen {...props} onLogin={app.login} />}</Tab.Screen>
      )}
    </Tab.Navigator>
  );
}
