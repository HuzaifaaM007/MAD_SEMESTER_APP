import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductsList = ({ userId }) => {

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation feature.",
      price: 49.99,
      published: 1,
      image: "https://images.unsplash.com/photo-1580894908361-967195033f48",
      stock: 10,
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Fitness tracking smart watch with heart rate and sleep monitor.",
      price: 79.99,
      published: 1,
      image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
      stock: 0, // out of stock
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Portable speaker with deep bass and HD sound quality.",
      price: 29.99,
      published: 1,
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      stock: 14,
    },
    {
      id: 4,
      name: "Gaming Mouse",
      description: "RGB gaming mouse with fast response and ergonomic design.",
      price: 24.49,
      published: 1,
      image: "https://images.unsplash.com/photo-1584270354949-1e15d5e1c8e2",
      stock: 5,
    },
    {
      id: 5,
      name: "Laptop Backpack",
      description: "Waterproof backpack with padded compartments for laptop and accessories.",
      price: 34.99,
      published: 1,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      stock: 7,
    },
    {
      id: 6,
      name: "USB-C Fast Charger",
      description: "25W fast charging adapter for Android and iOS devices.",
      price: 12.99,
      published: 1,
      image: "https://images.unsplash.com/photo-1602080858428-57174f95f262",
      stock: 20,
    },
  ]

  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    if (item.published !== 1) return null;

    return (
      <View style={styles.card}>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.noImage}>No Image</Text>
          )}
        </View>

        {/* Product Name */}
        <Text style={styles.name}>{item.name}</Text>

        {/* Short Description */}
        <Text style={styles.description}>
          {item.description.substring(0, 60)}...
        </Text>

        {/* Price & View */}
        <View style={styles.row}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>

          <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('ProductDetails')}>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>

        {item.stock > 0 ? (
          <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.outOfStock}>Out of Stock</Text>
        )}
      </View>
    );
  };

  if (!products || products.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noProducts}>No products available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Products</Text>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // grid
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  // Grid
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // Card
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    minHeight: 260,
    shadowColor: '#000',
    elevation: 3,
  },

  // Image block
  imageContainer: {
    height: 120,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '90%',
    height: '90%',
  },
  noImage: {
    color: '#999',
  },

  // Name & Description
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },

  // Price & View Button
  row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  viewBtn: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  viewText: {
    color: 'white',
    fontSize: 12,
  },

  // Cart Button
  cartBtn: {
    marginTop: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
  },
  cartText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },

  outOfStock: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
    fontWeight: '600',
  },

  noProducts: {
    fontSize: 16,
    color: '#555',
  },
  center: {
    alignItems: 'center',
    marginTop: 20,
  },
});
