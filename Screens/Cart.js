import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const selectedProduct = route.params?.product;


  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          console.log("Loaded cart from storage:", savedCart);
          setCartItems(JSON.parse(savedCart));
        }
      } catch (err) {
        console.log('Error loading cart:', err);
      }
    };
    loadCart();
  }, []);
  
//load products from navigation
  useEffect(() => {
    if (selectedProduct) {
      addProductToCart(selectedProduct);
    }
  }, [selectedProduct]);

  // Function to add product to cart
  const addProductToCart = async (product) => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];

      // Check if product already exists
      const existingIndex = currentCart.findIndex(
        item => item.product_id === product['Unnamed: 0']
      );

      if (existingIndex >= 0) {
        // If exists, increase quantity
        currentCart[existingIndex].quantity += 1;
        currentCart[existingIndex].subtotal = 
          currentCart[existingIndex].product_price * currentCart[existingIndex].quantity;
      } else {
        // If new, add to cart
        const newItem = {
          product_id: product['Unnamed: 0'] || Math.random(),
          product_name: product.Brand,
          product_price: parseFloat(
            product.Price.replace(/[^0-9.]/g, '')
          ) || 0,
          image_URL: product.Image,
          quantity: 1,
          stock: 10,
          subtotal: parseFloat(product.Price.replace(/[^0-9.]/g, '')) || 0,
        };
        currentCart.push(newItem);
      }

      // Save updated cart
      await AsyncStorage.setItem('cart', JSON.stringify(currentCart));
      setCartItems(currentCart);
    } catch (err) {
      console.log('Error adding product to cart:', err);
    }
  };

  // Grand Total Calculation
  const grandTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  // Update Quantity
  const updateQuantity = async (id, qty) => {
    if (qty < 1 || isNaN(qty)) return;

    try {
      const updated = cartItems.map(item => {
        if (item.product_id === id) {
          const subtotal = item.product_price * qty;
          return { ...item, quantity: qty, subtotal };
        }
        return item;
      });

      await AsyncStorage.setItem('cart', JSON.stringify(updated));
      setCartItems(updated);
    } catch (err) {
      console.log('Error updating quantity:', err);
    }
  };

  // Remove Item
  const removeItem = async (id) => {
    try {
      const updated = cartItems.filter(item => item.product_id !== id);
      await AsyncStorage.setItem('cart', JSON.stringify(updated));
      setCartItems(updated);
    } catch (err) {
      console.log('Error removing item:', err);
    }
  };

  // Clear Cart
  const clearCart = async () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('cart');
              setCartItems([]);
            } catch (err) {
              console.log('Error clearing cart:', err);
            }
          },
        },
      ]
    );
  };

  // Checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checkout.');
      return;
    }

    Alert.alert(
      'Checkout',
      `Total amount: ${grandTotal.toFixed(2)}\n\nProceed with checkout?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              // Prepare order data
              const shippingCost = 10;
              const orderData = {
                order_id: Math.floor(Math.random() * 100000),
                order_date: new Date().toISOString().split('T')[0],
                order_status: "confirmed",
                total_amount: grandTotal + shippingCost,
                shipping_method: "Standard Delivery",
                estimated_days: 4,
                shipping_cost: shippingCost,
                payment_method: "credit_card",
                transaction_id: `TXN${Math.floor(Math.random() * 1000000000)}`,
                payment_status: "paid",
                user_id: 1
              };

              // Prepare order items
              const orderItems = cartItems.map(item => ({
                product_name: item.product_name,
                price: item.product_price,
                quantity: item.quantity
              }));

              // Clear cart after successful checkout
              await AsyncStorage.removeItem('cart');
              setCartItems([]);
              
              // Navigate to PlaceOrder screen with order data
              navigation.navigate('PlaceOrder', {
                orderData,
                orderItems
              });
            } catch (err) {
              console.log('Error during checkout:', err);
              Alert.alert('Error', 'Something went wrong. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.product_id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {/* Image Container */}
                <View style={styles.imageContainer}>
                  {item.image_URL ? (
                    <Image 
                      source={{ uri: item.image_URL }} 
                      style={styles.image}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.noImage}>No Image</Text>
                  )}
                </View>

                {/* Product Name */}
                <Text style={styles.name} numberOfLines={2}>
                  {item.product_name}
                </Text>

                {/* Price */}
                <Text style={styles.price}>
                  ${item.product_price.toFixed(2)}
                </Text>

                {/* Quantity Controls */}
                <View style={styles.qtyRow}>
                  <Text style={styles.qtyLabel}>Qty:</Text>
                  <View style={styles.qtyControls}>
                    <TouchableOpacity 
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.product_id, item.quantity - 1)}
                    >
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    
                    <TouchableOpacity 
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.product_id, item.quantity + 1)}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Subtotal */}
                <Text style={styles.subtotal}>
                  Subtotal: ${item.subtotal.toFixed(2)}
                </Text>

                {/* Remove Button */}
                <TouchableOpacity 
                  style={styles.removeBtn}
                  onPress={() => removeItem(item.product_id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Summary Section */}
          <View style={styles.summaryCard}>
            <Text style={styles.totalLabel}>Grand Total:</Text>
            <Text style={styles.totalAmount}>${grandTotal.toFixed(2)}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => navigation.navigate('ProductsList')}
            >
              <Text style={styles.continueBtnText}>Continue Shopping</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.checkoutBtn}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutBtnText}>Checkout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearBtn}
              onPress={clearCart}
            >
              <Text style={styles.clearBtnText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate('ProductsList')}
          >
            <Text style={styles.browseBtnText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  
  heading: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 16 
  },

  card: { 
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

  imageContainer: { 
    height: 120, 
    backgroundColor: '#f3f3f3', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12 
  },

  image: { 
    width: '90%', 
    height: '90%' 
  },

  noImage: { 
    color: '#999',
    fontSize: 14
  },

  name: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 8,
    color: '#333'
  },

  price: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'green',
    marginBottom: 12
  },

  qtyRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 12
  },

  qtyLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 12
  },

  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    padding: 4
  },

  qtyBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6
  },

  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  qtyValue: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: 'center'
  },

  subtotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },

  removeBtn: {
    backgroundColor: '#ffebee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },

  removeText: { 
    color: '#d32f2f',
    fontWeight: '600',
    fontSize: 14
  },

  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green'
  },

  buttonContainer: {
    gap: 12,
    marginBottom: 20
  },

  continueBtn: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black'
  },

  continueBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600'
  },

  checkoutBtn: {
    backgroundColor: 'green',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },

  checkoutBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },

  clearBtn: {
    backgroundColor: 'black',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },

  clearBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },

  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1,
    marginTop: -50
  },

  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24
  },

  browseBtn: {
    backgroundColor: 'green',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8
  },

  browseBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});