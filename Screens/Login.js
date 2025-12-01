import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";

const LoginScreen1 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle your login logic here
    // Example: navigation.navigate("ProductList")
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        {/* Email */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Links */}
        <Text style={styles.linkText}>
          Don’t remember password?{" "}
          <Text style={styles.link}>Forgot password</Text>
        </Text>

        <Text style={styles.linkText}>
          Don’t have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation?.navigate?.("Signup")}
          >
            Register
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen1;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#2b2b2b",
    color: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  linkText: {
    textAlign: "center",
    color: "#ccc",
    fontSize: 14,
    marginTop: 16,
  },
  link: {
    color: "#aaa",
    textDecorationLine: "underline",
  },
});
