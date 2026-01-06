import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProductDetails = () => {
  
  const route = useRoute();
  const navigation = useNavigation();

  const { product } = route.params || {};

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
          {product.Image ? (
            <Image
              source={{ uri: product.Image }}
              style={styles.image}
            />
          ) : (
            <Text style={styles.noImage}>No Image</Text>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.Brand}</Text>

          <Text style={styles.description}>{product.Description}</Text>

          <Text style={styles.price}>{product.Price}</Text>

          <Text style={styles.stockLabel}>
            Stock: <Text style={styles.inStock}>Available</Text>
          </Text>

          {/* Add to Cart */}
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate('Cart', {product: product})}
          >
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
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
    flexDirection: 'column',
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
  center: {
    marginTop: 50,
    alignItems: 'center',
  },
  notFound: {
    color: 'red',
    fontSize: 18,
  },
});
