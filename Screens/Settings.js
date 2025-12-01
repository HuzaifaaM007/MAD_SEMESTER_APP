import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";

const AccountSettings = ({ user, codes, message, error }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [address, setAddress] = useState(user.address ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = () => {
    // Call API to update profile
    Alert.alert("Profile Updated", `Name: ${name}\nEmail: ${email}`);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    // Call API to reset password
    Alert.alert("Password Changed");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => Alert.alert("Account Deleted") }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Messages */}
      {message && <Text style={[styles.alert, styles.success]}>{message}</Text>}
      {error && <Text style={[styles.alert, styles.error]}>{error}</Text>}

      <Text style={styles.heading}>Account Settings</Text>

      <View style={styles.card}>
        {/* Edit Profile */}
        <Text style={styles.sectionHeading}>Edit Profile</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" keyboardType="phone-pad" />
        <TextInput
          style={[styles.input, styles.textarea]}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
          multiline
        />
        <TouchableOpacity style={styles.buttonBlue} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        {/* Security Codes */}
        <Text style={styles.sectionHeading}>Security Codes</Text>
        {codes && codes.length > 0 ? (
          <View style={styles.codesGrid}>
            {codes.map((code, index) => (
              <Text key={index} style={styles.codeItem}>
                {code.security_code}
              </Text>
            ))}
            <TouchableOpacity style={styles.buttonBlue} onPress={() => Alert.alert("Update Codes")}>
              <Text style={styles.buttonText}>Update Codes</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.buttonBlue} onPress={() => Alert.alert("Generate Security Codes")}>
            <Text style={styles.buttonText}>Generate Security Codes</Text>
          </TouchableOpacity>
        )}

        {/* Reset Password */}
        <Text style={styles.sectionHeading}>Reset Password</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Current Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm New Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonGreen} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <Text style={[styles.sectionHeading, { color: "red" }]}>Delete Account</Text>
        <TouchableOpacity style={styles.buttonRed} onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonBlue: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonGreen: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonRed: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  alert: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  success: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  error: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
  },
  codesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  codeItem: {
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
    fontWeight: "500",
  },
});
