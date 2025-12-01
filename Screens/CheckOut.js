import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Checkout = ({ cart, shippingMethods, paymentMethods, userId }) => {
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Calculate totals
  const totals = useMemo(() => {
    let subtotal = 0;
    let totalQty = 0;

    cart.forEach((item) => {
      subtotal += item.product_price * item.quantity;
      totalQty += item.quantity;
    });

    let shippingCost = selectedShipping
      ? selectedShipping.cost * totalQty
      : 0;

    return {
      subtotal,
      totalQty,
      shippingCost,
      total: subtotal + shippingCost,
    };
  }, [cart, selectedShipping]);

  const placeOrder = () => {
    if (!selectedShipping || !selectedPayment) {
      alert("Please select shipping and payment methods");
      return;
    }

    // You can integrate API call here

    console.log("Order placed", {
      cart,
      shipping: selectedShipping,
      payment: selectedPayment,
      totals,
      userId,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Checkout</Text>

      {/* Cart Items */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Cart</Text>

        {cart.length === 0 ? (
          <Text style={styles.empty}>Your cart is empty.</Text>
        ) : (
          <View>
            {cart.map((item, index) => {
              const subtotal = item.product_price * item.quantity;

              return (
                <View key={index} style={styles.row}>
                  <Text style={styles.cell}>{item.product_name}</Text>
                  <Text style={styles.cell}>
                    ${item.product_price.toFixed(2)}
                  </Text>
                  <Text style={styles.cell}>{item.quantity}</Text>
                  <Text style={styles.cell}>${subtotal.toFixed(2)}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* Shipping Method */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Shipping Method</Text>

        {shippingMethods.map((method, i) => (
          <TouchableOpacity
            key={i}
            style={styles.radioRow}
            onPress={() => setSelectedShipping(method)}
          >
            <View
              style={[
                styles.radio,
                selectedShipping?.name === method.name && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioLabel}>
              {method.name} (${method.cost.toFixed(2)} per product,{" "}
              {method.estimated_days} days)
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment Method */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Method</Text>

        {paymentMethods.map((pm, i) => (
          <TouchableOpacity
            key={i}
            style={styles.radioRow}
            onPress={() => setSelectedPayment(pm)}
          >
            <View
              style={[
                styles.radio,
                selectedPayment?.method === pm.method && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioLabel}>{pm.method.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Order Summary */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <Text style={styles.summaryLine}>
          Subtotal:
          <Text style={styles.float}>${totals.subtotal.toFixed(2)}</Text>
        </Text>

        <Text style={styles.summaryLine}>
          Shipping:
          <Text style={styles.float}>${totals.shippingCost.toFixed(2)}</Text>
        </Text>

        <Text style={styles.totalLine}>
          Total:
          <Text style={styles.float}>${totals.total.toFixed(2)}</Text>
        </Text>

        <TouchableOpacity style={styles.orderBtn} onPress={placeOrder}>
          <Text style={styles.orderBtnText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  empty: {
    textAlign: "center",
    color: "gray",
    paddingVertical: 10,
  },

  // Cart table row
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
  },
  cell: {
    width: "25%",
  },

  // Radio buttons
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: "black",
  },
  radioLabel: {
    fontSize: 14,
  },

  summaryLine: {
    fontSize: 15,
    marginBottom: 6,
    color: "#444",
  },

  totalLine: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },

  float: {
    position: "absolute",
    right: 0,
  },

  orderBtn: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
  },

  orderBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
