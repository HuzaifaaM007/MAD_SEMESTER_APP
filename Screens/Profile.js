import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const UserProfile = ({ user }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>

      <View style={styles.card}>
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Personal Information</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{user.name}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{user.phone ?? "N/A"}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{user.address ?? "N/A"}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

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
  section: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoItem: {
    width: "48%",
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
});
