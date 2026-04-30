// src/components/CustomButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
const CustomButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <AntDesign name="dollar" size={24} color="#ffffff" />
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(28, 57, 114)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 7,
  },
  buttonContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 8,    
},
});

export default CustomButton;