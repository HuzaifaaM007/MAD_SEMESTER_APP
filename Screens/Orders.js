import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyOrders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);

  // Load orders from AsyncStorage
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const savedOrders = await AsyncStorage.getItem('orders');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch (err) {
        console.log('Error loading orders:', err);
      }
    };
    
    loadOrders();

    // Refresh orders when screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      loadOrders();
    });

    return unsubscribe;
  }, [navigation]);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return styles.statusCompleted;
      case "pending":
      case "confirmed":
        return styles.statusPending;
      default:
        return styles.statusOther;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Orders</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate('ProductsList')}
          >
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {orders.map((order, index) => (
            <View key={index} style={styles.orderCard}>
              {/* Order Header */}
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderTitle}>Order #{order.order_id}</Text>
                  <Text style={styles.orderDate}>{order.order_date}</Text>
                </View>
                <Text style={[styles.statusBadge, getStatusStyle(order.order_status)]}>
                  {order.order_status.toUpperCase()}
                </Text>
              </View>

              {/* Shipping Info */}
              <View style={styles.shippingBox}>
                <Text style={styles.shippingIcon}>🚚</Text>
                <View style={styles.shippingDetails}>
                  <Text style={styles.shippingMethod}>{order.shipping_method}</Text>
                  <Text style={styles.shippingEstimate}>
                    Arrives in {order.estimated_days} days
                  </Text>
                </View>
              </View>

              {/* Order Items */}
              <View style={styles.itemsSection}>
                <Text style={styles.itemsTitle}>Items ({order.items.length})</Text>
                {order.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.itemRow}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.product_name}</Text>
                      <Text style={styles.itemDetails}>
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </Text>
                    </View>
                    <Text style={styles.itemTotal}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Order Total */}
              <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>${order.total_amount.toFixed(2)}</Text>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                style={styles.viewDetailsBtn}
                onPress={() => navigation.navigate('PlaceOrder', {
                  orderData: order,
                  orderItems: order.items
                })}
              >
                <Text style={styles.viewDetailsBtnText}>View Order Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937'
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: 16
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8
  },

  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24
  },

  shopBtn: {
    backgroundColor: 'green',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8
  },

  shopBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },

  orderCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },

  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4
  },

  orderDate: {
    fontSize: 13,
    color: '#6b7280'
  },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '600'
  },

  statusCompleted: {
    backgroundColor: '#d1fae5',
    color: '#065f46'
  },

  statusPending: {
    backgroundColor: '#dbeafe',
    color: '#1e40af'
  },

  statusOther: {
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  },

  shippingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },

  shippingIcon: {
    fontSize: 24,
    marginRight: 12
  },

  shippingDetails: {
    flex: 1
  },

  shippingMethod: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2
  },

  shippingEstimate: {
    fontSize: 13,
    color: '#6b7280'
  },

  itemsSection: {
    marginBottom: 12
  },

  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },

  itemInfo: {
    flex: 1
  },

  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2
  },

  itemDetails: {
    fontSize: 12,
    color: '#6b7280'
  },

  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937'
  },

  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb'
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937'
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green'
  },

  viewDetailsBtn: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },

  viewDetailsBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600'
  }
});