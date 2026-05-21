import React, { useEffect, useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ app }) {
  const { user, updateProfile, signOut } = app;
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");

  useEffect(() => { setName(user?.name || ""); }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.profileCard}>
        <Ionicons name="person-circle" size={88} color="#16007a" />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setModalOpen(true)}><Text style={styles.buttonText}>Update</Text></TouchableOpacity>
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}><Text style={styles.buttonText}>Sign Out</Text></TouchableOpacity>

      <Modal visible={modalOpen} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Update Profile</Text>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="New Password" value={password} onChangeText={setPassword} secureTextEntry />
            <View style={styles.row}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalOpen(false)}><Text style={styles.cancelButtonText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={async () => { await updateProfile(name, password); setPassword(""); setModalOpen(false); }}><Text style={styles.buttonText}>Confirm</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 18 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#16007a", marginVertical: 18 },
  profileCard: { alignItems: "center", padding: 20, borderRadius: 12, backgroundColor: "#f4f2ff", marginVertical: 20 },
  name: { fontSize: 22, fontWeight: "bold" },
  email: { color: "#666", marginTop: 5 },
  button: { backgroundColor: "#16007a", padding: 15, borderRadius: 8, alignItems: "center", marginVertical: 8 },
  signOutButton: { backgroundColor: "#b00020", padding: 15, borderRadius: 8, alignItems: "center", marginVertical: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 20 },
  modalCard: { backgroundColor: "#fff", borderRadius: 14, padding: 18 },
  modalTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#999", borderRadius: 8, padding: 12, marginBottom: 15 },
  row: { flexDirection: "row", gap: 10 },
  cancelButton: { flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "#16007a", padding: 14, borderRadius: 8, alignItems: "center" },
  confirmButton: { flex: 1, backgroundColor: "#16007a", padding: 14, borderRadius: 8, alignItems: "center" },
  cancelButtonText: { color: "#16007a", fontWeight: "bold" },
});
