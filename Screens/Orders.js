import React from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";

const MyOrders = ({ orders, orderItems }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return styles.statusCompleted;
      case "Pending":
        return styles.statusPending;
      default:
        return styles.statusOther;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Orders</Text>

      {orders.length === 0 ? (
        <Text style={styles.empty}>You have not placed any orders yet.</Text>
      ) : (
        orders.map((order) => (
          <View key={order.order_id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderTitle}>Order #{order.order_id}</Text>
              <Text style={[styles.statusBadge, getStatusStyle(order.order_status)]}>
                {order.order_status}
              </Text>
            </View>

            <Text style={styles.orderDate}>Date: {order.order_date}</Text>
            <Text style={styles.orderTotal}>Total: ${order.total_amount.toFixed(2)}</Text>

            {/* Order Items */}
            {orderItems[order.order_id] && orderItems[order.order_id].length > 0 ? (
              <View style={styles.itemsTable}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={[styles.tableCell, styles.cellFlex2]}>Product</Text>
                  <Text style={styles.tableCell}>Qty</Text>
                  <Text style={styles.tableCell}>Price</Text>
                  <Text style={styles.tableCell}>Subtotal</Text>
                </View>

                {orderItems[order.order_id].map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.cellFlex2]}>{item.product_name}</Text>
                    <Text style={styles.tableCell}>{item.quantity}</Text>
                    <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
                    <Text style={styles.tableCell}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.noItems}>No items found in this order.</Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  empty: {
    textAlign: "center",
    color: "gray",
    paddingVertical: 20,
  },
  orderCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },
  statusCompleted: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  statusPending: {
    backgroundColor: "#fef3c7",
    color: "#78350f",
  },
  statusOther: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  orderDate: {
    color: "#6b7280",
    fontSize: 13,
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 12,
  },
  itemsTable: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
    color: "#374151",
  },
  cellFlex2: {
    flex: 2,
  },
  noItems: {
    color: "#6b7280",
    fontStyle: "italic",
    marginTop: 8,
  },
});
