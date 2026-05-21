import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/Categories";
import ProductListScreen from "../components/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

export default function ProductsStack({ app }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: "Products" }}
      />

      <Stack.Screen
        name="ProductList"
        options={({ route }) => ({
          title: route.params?.title || "Products",
        })}
      >
        {(props) => (
          <ProductListScreen
            {...props}
            category={props.route.params?.category}
            title={props.route.params?.title}
            addToCart={app.addToCart}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="ProductDetail" options={{ title: "Product Detail" }}>
        {(props) => <ProductDetailScreen {...props} app={app} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}