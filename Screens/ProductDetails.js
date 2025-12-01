import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

const ProductDetails = ({ productid }) => {
  const product = 
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation feature.",
      price: 49.99,
      published: 1,
      image: "https://images.unsplash.com/photo-1580894908361-967195033f48",
      stock: 10,
    };
  
  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image
              source={{ uri: product.image }}
              style={styles.image}
            />
          ) : (
            <Text style={styles.noImage}>No Image</Text>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.name}</Text>

          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          <Text style={styles.stockLabel}>
            Stock:{' '}
            {product.stock > 0 ? (
              <Text style={styles.inStock}>{product.stock} available</Text>
            ) : (
              <Text style={styles.outOfStock}>Out of stock</Text>
            )}
          </Text>

          <Text style={styles.date}>
            Added on: {product.created_at}
          </Text>

          
            // Customer Add to Cart
           { product.stock > 0 ? (
              <TouchableOpacity style={[styles.cartBtn]} onPress={() => navigation.navigate('Cart')}>
                <Text style={styles.cartText}>Add to Cart</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity disabled style={[styles.disabledBtn]}>
                <Text style={styles.disabledText}>Out of Stock</Text>
              </TouchableOpacity>
            )}
          

        </View>

      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  noImage: {
    color: '#999',
  },
  detailsContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    color: '#555',
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  stockLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  inStock: {
    color: 'green',
  },
  outOfStock: {
    color: 'red',
  },
  date: {
    color: '#777',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  edit: { backgroundColor: 'green' },
  unpublish: { backgroundColor: 'orange' },
  delete: { backgroundColor: 'red' },

  cartBtn: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  cartText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  disabledBtn: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 8,
  },
  disabledText: {
    color: 'white',
    textAlign: 'center',
  },

  center: {
    marginTop: 50,
    alignItems: 'center',
  },
  notFound: {
    color: 'red',
    fontSize: 18,
  },
});
