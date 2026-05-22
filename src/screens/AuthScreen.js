import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { USERS_KEY, userDataKey, readJson, writeJson } from "../storage/storage";

export default function AuthScreen({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clear = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const validate = () => {
    if (isSignUp && name.trim().length < 2) {
      Alert.alert("Validation Error", "Please enter a valid name.");
      return false;
    }

    if (!email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return false;
    }

    if (password.length < 4) {
      Alert.alert("Validation Error", "Password must be at least 4 characters.");
      return false;
    }

    return true;
  };

  const signUp = async () => {
    if (!validate()) return;

    try {
      const users = await readJson(USERS_KEY, []);

      const exists = users.some(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (exists) {
        Alert.alert("Sign Up Error", "A user with this email already exists.");
        return;
      }

      try {
        await fetch("https://fakestoreapi.com/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            username: email.trim().split("@")[0],
            password,
            name: {
              firstname: name.trim(),
              lastname: "",
            },
          }),
        });
      } catch (apiError) {
        console.log("Fake Store API signup failed, continuing locally.");
      }

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        password,
      };

      await writeJson(USERS_KEY, [...users, newUser]);
      await writeJson(userDataKey(newUser.email), {
        cart: [],
        orders: [],
      });

      onLogin(newUser, { cart: [], orders: [] }, "Products");
      Alert.alert("Success", "Registration complete. You are now logged in.");
    } catch (error) {
      console.log("Local signup error:", error);
      Alert.alert("Error", "Could not register user locally.");
    }
  };

  const signIn = async () => {
    if (!validate()) return;

    try {
      const users = await readJson(USERS_KEY, []);

      const user = users.find(
        (savedUser) =>
          savedUser.email.toLowerCase() === email.trim().toLowerCase() &&
          savedUser.password === password
      );

      if (!user) {
        Alert.alert("Sign In Error", "Email or password is incorrect.");
        return;
      }

      const savedData = await readJson(userDataKey(user.email), {
        cart: [],
        orders: [],
      });

      Alert.alert("Signed In", "Products, cart, orders, and profile are now available.");
      onLogin(user, savedData, "Products");
    } catch (error) {
      console.log("Signin error:", error);
      Alert.alert("Error", "Could not sign in.");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {isSignUp
            ? "Sign up a new user"
            : "Sign in with your email and password"}
        </Text>

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.row}>
          <TouchableOpacity style={styles.clearButton} onPress={clear}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={isSignUp ? signUp : signIn}
          >
            <Text style={styles.buttonText}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            setIsSignUp(!isSignUp);
            clear();
          }}
        >
          <Text style={styles.link}>
            {isSignUp
              ? "Already have an account? Sign in"
              : "New user? Create an account"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#16007a",
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#16007a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#16007a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  clearButtonText: {
    color: "#16007a",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#0f52ba",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
});