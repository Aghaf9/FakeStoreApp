import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function SignInScreen({ navigation, setUsername }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signIn = () => {
    const nameFromEmail = email.split("@")[0] || "Guest";
    setUsername(nameFromEmail);
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

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
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 25, backgroundColor: "#fff" },
  title: { fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 25 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#16007a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  link: { color: "#0f52ba", textAlign: "center", marginTop: 20 },
});