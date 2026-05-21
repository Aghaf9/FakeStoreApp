import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

export default function ProductsStack({ app }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: "Products" }} />
      <Stack.Screen name="ProductList" component={ProductListScreen} options={({ route }) => ({ title: route.params.title })} />
      <Stack.Screen name="ProductDetail" options={{ title: "Product Detail" }}>
        {(props) => <ProductDetailScreen {...props} app={app} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
