import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceOrder = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { orderData, orderItems } = route.params || {};

  const order = orderData 
  // || {
  //   order_id: Math.floor(Math.random() * 100000),
  //   order_date: new Date().toISOString().split('T')[0],
  //   order_status: "confirmed",
  //   total_amount: 350.50,
  //   shipping_method: "Standard Delivery",
  //   estimated_days: 4,
  //   shipping_cost: 10,
  //   payment_method: "credit_card",
  //   transaction_id: `TXN${Math.floor(Math.random() * 1000000000)}`,
  //   payment_status: "paid",
  //   user_id: 7
  // };

  const items = orderItems
  //  || [
  //   { product_name: "Camera", price: 120, quantity: 2 },
  //   { product_name: "Tripod Stand", price: 60, quantity: 1 },
  //   { product_name: "Camera Bag", price: 50.5, quantity: 1 }
  // ];

  useEffect(() => {
    const saveOrder = async () => {
      try {

        if (orderData && orderItems) {
          const savedOrders = await AsyncStorage.getItem('orders');
          let ordersArray = savedOrders ? JSON.parse(savedOrders) : [];
          
          // Add the new order with items included
          const newOrder = {
            ...order,
            items: items
          };
          
          ordersArray.unshift(newOrder); 
          
          await AsyncStorage.setItem('orders', JSON.stringify(ordersArray));
          console.log('Order saved successfully');
        }
      } catch (err) {
        console.log('Error saving order:', err);
      }
    };

    saveOrder();
  }, []);

  return (
    <ScrollView style={styles.container}>

      {/* Success Message */}
      <View style={styles.successBox}>
        <Text style={styles.successIcon}>✓</Text>
        <Text style={styles.successTitle}>Order Placed Successfully!</Text>
        <Text style={styles.successText}>Thank you for your purchase.</Text>
        <Text style={styles.orderNumber}>Order #{order.order_id}</Text>
      </View>

      {/* Order Summary Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Summary</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Order Date:</Text>
          <Text style={styles.value}>{order.order_date}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{order.order_status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>
            ${(order.total_amount - order.shipping_cost).toFixed(2)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Shipping:</Text>
          <Text style={styles.value}>${order.shipping_cost.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>${order.total_amount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Shipping Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shipping Details</Text>
        
        <View style={styles.shippingInfo}>
          <Text style={styles.shippingIcon}>📦</Text>
          <View style={styles.shippingDetails}>
            <Text style={styles.shippingMethod}>{order.shipping_method}</Text>
            <Text style={styles.shippingEstimate}>
              Estimated delivery in {order.estimated_days} days
            </Text>
          </View>
        </View>
      </View>

      {/* Payment Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>
            {order.payment_method.replace('_', ' ').toUpperCase()}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.valueSmall}>{order.transaction_id ?? "N/A"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Payment Status:</Text>
          <View style={styles.paidBadge}>
            <Text style={styles.paidText}>{order.payment_status.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* Ordered Products */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Items</Text>

        {items.map((item, index) => {
          const subtotal = item.price * item.quantity;
          return (
            <View key={index} style={styles.productItem}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.product_name}</Text>
                <Text style={styles.productDetails}>
                  ${item.price.toFixed(2)} × {item.quantity}
                </Text>
              </View>
              <Text style={styles.productTotal}>${subtotal.toFixed(2)}</Text>
            </View>
          );
        })}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('ProductsList')}
        >
          <Text style={styles.primaryBtnText}>Continue Shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('MyOrders')}
        >
          <Text style={styles.secondaryBtnText}>View My Orders</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },

  successBox: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e'
  },

  successIcon: {
    fontSize: 48,
    color: '#22c55e',
    marginBottom: 12
  },

  successTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1f2937',
    marginBottom: 8
  },

  successText: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 12
  },

  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6
  },

  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937'
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },

  label: {
    fontSize: 14,
    color: '#6b7280'
  },

  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937'
  },

  valueSmall: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937'
  },

  statusBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6
  },

  statusText: {
    color: '#1e40af',
    fontSize: 12,
    fontWeight: '600'
  },

  paidBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6
  },

  paidText: {
    color: '#065f46',
    fontSize: 12,
    fontWeight: '600'
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937'
  },

  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e'
  },

  shippingInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  shippingIcon: {
    fontSize: 32,
    marginRight: 16
  },

  shippingDetails: {
    flex: 1
  },

  shippingMethod: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4
  },

  shippingEstimate: {
    fontSize: 14,
    color: '#6b7280'
  },

  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },

  productInfo: {
    flex: 1
  },

  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4
  },

  productDetails: {
    fontSize: 13,
    color: '#6b7280'
  },

  productTotal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937'
  },

  buttonContainer: {
    gap: 12,
    marginBottom: 20
  },

  primaryBtn: {
    backgroundColor: 'green',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },

  primaryBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },

  secondaryBtn: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black'
  },

  secondaryBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600'
  }
});