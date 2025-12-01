import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

const PlaceOrder = () => {

  // Example data (you will replace this with API response)
  const order = [
    {
      order_id: 12345,
      order_date: "2025-01-15",
      order_status: "confirmed",
      total_amount: 350.50,
      shipping_method: "Standard Delivery",
      estimated_days: 4,
      shipping_cost: 10,
      payment_method: "credit_card",
      transaction_id: "TXN987654321",
      payment_status: "paid",
      user_id: 7
    }
  ];

  const order_items = [
    { product_name: "Camera", price: 120, quantity: 2 },
    { product_name: "Tripod Stand", price: 60, quantity: 1 },
    { product_name: "Camera Bag", price: 50.5, quantity: 1 }
  ];

  const orderData = order[0];

  return (
    <ScrollView style={styles.container}>

      {/* Success Message */}
      <View style={styles.successBox}>
        <Text style={styles.successTitle}>Order Placed Successfully!</Text>
        <Text style={styles.successText}>Thank you for your purchase.</Text>
      </View>

      {/* Order Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Details</Text>
        <Text>Order ID: #{orderData.order_id}</Text>
        <Text>Order Date: {orderData.order_date}</Text>
        <Text>
          Order Status:
          <Text style={styles.badgeBlue}> {orderData.order_status}</Text>
        </Text>
        <Text>Total Amount: ${orderData.total_amount.toFixed(2)}</Text>
      </View>

      {/* Shipping Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shipping Information</Text>
        <Text>Shipping Method: {orderData.shipping_method}</Text>
        <Text>Estimated Delivery: {orderData.estimated_days} days</Text>
        <Text>Shipping Cost: ${orderData.shipping_cost.toFixed(2)}</Text>
      </View>

      {/* Payment Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Information</Text>
        <Text>Payment Method: {orderData.payment_method.toUpperCase()}</Text>
        <Text>Transaction ID: {orderData.transaction_id ?? "N/A"}</Text>
        <Text>
          Payment Status:
          <Text style={styles.badgeGreen}> {orderData.payment_status}</Text>
        </Text>
      </View>

      {/* Ordered Products */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Products Ordered</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.col1}>Product</Text>
          <Text style={styles.col2}>Price</Text>
          <Text style={styles.col2}>Qty</Text>
          <Text style={styles.col2}>Subtotal</Text>
        </View>

        <FlatList
          data={order_items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const subtotal = item.price * item.quantity;
            return (
              <View style={styles.tableRow}>
                <Text style={styles.col1}>{item.product_name}</Text>
                <Text style={styles.col2}>${item.price.toFixed(2)}</Text>
                <Text style={styles.col2}>{item.quantity}</Text>
                <Text style={styles.col2}>${subtotal.toFixed(2)}</Text>
              </View>
            );
          }}
        />
      </View>

      {/* Back to Orders */}
      <View style={styles.center}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>View My Orders</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  successBox: {
    backgroundColor: "#D1FAE5",
    borderWidth: 1,
    borderColor: "#6EE7B7",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  successTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#065F46"
  },
  successText: {
    color: "#065F46",
    marginTop: 5
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  badgeBlue: {
    backgroundColor: "#DBEAFE",
    color: "#1E40AF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5
  },
  badgeGreen: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 10
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB"
  },
  col1: {
    flex: 2
  },
  col2: {
    flex: 1
  },
  center: {
    alignItems: "center",
    marginVertical: 20
  },
  btn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10
  },
  btnText: {
    color: "white",
    fontSize: 16
  }
});
