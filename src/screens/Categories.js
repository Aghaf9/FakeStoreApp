import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import CustomButton from "../components/CustomButton";

const HomeScreen = ({ navigation, route }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (route.params?.updatedTodos) {
            setTodos(route.params.updatedTodos);
        }
    }, [route.params?.updatedTodos]);
    
    const ShowTodo = ({ item }) => {
        return (
          <View style={styles.todoItem}>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
          </View>
        );
    };
    return (
        <View style = {styles.container}>
            <View style={styles.headerBox}>
                <Text style = {styles.title}>Categories</Text>
            </View>

            <View style = {styles.buttonContainer}>
                    <CustomButton
                        label="Electronics"
                        onPress={() => navigation.navigate("Electronics", { todos })}
                    />
                    <CustomButton
                        label="Jewelery"
                        onPress={() => navigation.navigate("Jewelery", { todos })}
                    />
                    <CustomButton
                        label="Mens Clothing"
                        onPress={() => navigation.navigate("MensClothing", { todos })}
                    />
                    <CustomButton
                        label="Womens Clothing"
                        onPress={() => navigation.navigate("WomensClothing", { todos })}
                    />
                    <CustomButton
                        label="Cart"
                        onPress={() => navigation.navigate("Cart", { todos })}
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aeaeae",
    justifyContent: "center",  
    alignItems: "center",     
},
button: {
  backgroundColor: "#001431",
  paddingVertical: 16,
  borderRadius: 6,
  marginVertical: 10,
},

headerBox: {
    position: "absolute",
    top: 80,
    width: "80%",
    backgroundColor: "#16007a",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
},

title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
},

buttonContainer: {
    width: "80%",
    backgroundColor: "#16007a",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 12,
    padding: 20,
    alignItems: "stretch",
  },
});
export default HomeScreen;