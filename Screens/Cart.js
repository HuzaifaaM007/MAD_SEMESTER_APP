import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

const Cart = () => {

  // Simulated session login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cart Data (Replace with API)
  const [cartItems, setCartItems] = useState([
    {
      product_id: 1,
      product_name: "Camera",
      product_price: 120,
      image_URL: "https://via.placeholder.com/150",
      quantity: 2,
      stock: 5,
      subtotal: 240,
    },
    {
      product_id: 2,
      product_name: "Headphones",
      product_price: 80,
      image_URL: "https://via.placeholder.com/150",
      quantity: 1,
      stock: 3,
      subtotal: 80,
    },
    {
      product_id: 3,
      product_name: "Camera",
      product_price: 120,
      image_URL: "https://via.placeholder.com/150",
      quantity: 2,
      stock: 5,
      subtotal: 240,
    },
    {
      product_id: 4,
      product_name: "Headphones",
      product_price: 80,
      image_URL: "https://via.placeholder.com/150",
      quantity: 1,
      stock: 3,
      subtotal: 80,
    },
    {
      product_id: 5,
      product_name: "Camera",
      product_price: 120,
      image_URL: "https://via.placeholder.com/150",
      quantity: 2,
      stock: 5,
      subtotal: 240,
    },
    {
      product_id: 6,
      product_name: "Headphones",
      product_price: 80,
      image_URL: "https://via.placeholder.com/150",
      quantity: 1,
      stock: 3,
      subtotal: 80,
    },
  ]);

  // Grand Total Calculation
  const grandTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  // Update Quantity
  const updateQuantity = (id, qty) => {
    if (qty < 1 || isNaN(qty)) return;

    const updated = cartItems.map(item => {
      if (item.product_id === id) {
        const subtotal = item.product_price * qty;
        return { ...item, quantity: qty, subtotal };
      }
      return item;
    });

    setCartItems(updated);
  };

  // Remove Item
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.product_id !== id));
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Shopping Cart</Text>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>

                {/* Product Row */}
                <View style={styles.row}>
                  <Image
                    source={{ uri: item.image_URL }}
                    style={styles.image}
                  />
                  <Text style={styles.name}>{item.product_name}</Text>
                </View>

                {/* Price */}
                <Text style={styles.text}>Price: ${item.product_price}</Text>

                {/* Quantity */}
                <View style={styles.qtyRow}>
                  <Text style={styles.text}>Quantity:</Text>
                  <TextInput
                    value={String(item.quantity)}
                    onChangeText={(value) => updateQuantity(item.product_id, parseInt(value))}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                </View>

                {/* Total */}
                <Text style={styles.text}>Total: ${item.subtotal}</Text>

                {/* Remove */}
                <TouchableOpacity onPress={() => removeItem(item.product_id)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>

              </View>
            )}
          />

          {/* Grand Total */}
          <Text style={styles.total}>Grand Total: ${grandTotal}</Text>

          {/* Buttons */}
          <View style={styles.btnRow}>

            {/* continue shopping */}
            <TouchableOpacity style={styles.btnLight}>
              <Text>Continue Shopping</Text>
            </TouchableOpacity>

            {isLoggedIn ? (
              <>
                {/* checkout */}
                <TouchableOpacity style={styles.btnDark}>
                  <Text style={styles.btnDarkText}>Checkout</Text>
                </TouchableOpacity>

                {/* clear cart */}
                <TouchableOpacity
                  style={styles.btnLight}
                  onPress={() => setCartItems([])}
                >
                  <Text>Clear Cart</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* redirect to login */}
                <TouchableOpacity style={styles.btnDark}>
                  <Text style={styles.btnDarkText}>Checkout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnLight}
                  onPress={() => setCartItems([])}
                >
                  <Text>Clear Cart</Text>
                </TouchableOpacity>
              </>
            )}

          </View>

        </>
      ) : (
        <>
        <View style={styles.noProducts}>
          <Text style={styles.text}>Your cart is empty.</Text>
          <TouchableOpacity style={styles.btnDark}>
            <Text style={styles.btnDarkText}>Browse Products</Text>
          </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    fontSize: 16,
    marginLeft: 10
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  text: {
    marginVertical: 10
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    width: 60,
    marginLeft: 10,
    textAlign: "center",
    padding: 5,
    borderRadius: 5
  },
  remove: {
    color: "red",
    marginTop: 10
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap:10
  },
  btnLight: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    borderColor:"black",
    borderWidth:2

  },
  btnDark: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 10
  },
  btnDarkText: {
    color: "white"
  },
  noProducts:{
    alignItems:"center",
    justifyContent:"center",
    marginTop:"40%"
  }
});
