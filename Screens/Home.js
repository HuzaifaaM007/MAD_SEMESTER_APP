import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchData from '../utils/Api';
import { useEffect, useState } from 'react';

// Dummy user data
const dummyUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street, Apartment 4B, New York, NY 10001"
};

const ProductsList = () => {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        // Take first 20 products only
        setMobiles(data.slice(0, 20));
      } catch (err) {
        console.log("Error fetching mobiles:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>

        {/* Image */}
        <View style={styles.imageContainer}>
          {item.Image ? (
            <Image
              source={{ uri: item.Image }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.noImage}>No Image</Text>
          )}
        </View>

        {/* Brand */}
        <Text style={styles.name} numberOfLines={2}>
          {item.Brand || "Unknown Brand"}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {item.Description || "No description available"}
        </Text>

        {/* Price & View Button */}
        <View style={styles.row}>
          <Text style={styles.price}>
            {item.Price || "N/A"}
          </Text>

          <TouchableOpacity
            style={styles.viewBtn}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Button */}
        <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart', { product: item })}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>

      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (!mobiles || mobiles.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noProducts}>No products available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Our Products</Text>
        
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.ordersBtn}
            onPress={() => navigation.navigate('MyOrders')}
          >
            <Text style={styles.ordersIcon}>📦</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.profileBtn}
            onPress={() => navigation.navigate('UserProfile', { user: dummyUser })}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={mobiles}
        renderItem={renderItem}
        keyExtractor={(item) => item['Unnamed: 0'].toString()} // use Unnamed: 0 as unique key
        numColumns={2} // grid
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },

  heading: { 
    fontSize: 22, 
    fontWeight: 'bold'
  },

  headerButtons: {
    flexDirection: 'row',
    gap: 12
  },

  ordersBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },

  ordersIcon: {
    fontSize: 22
  },

  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },

  profileIcon: {
    fontSize: 24
  },

  gridRow: { justifyContent: 'space-between', marginBottom: 16 },

  card: { backgroundColor: 'white', borderRadius: 10, padding: 12, width: '48%', minHeight: 260, shadowColor: '#000', elevation: 3 },

  imageContainer: { height: 120, backgroundColor: '#f3f3f3', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  image: { width: '90%', height: '90%' },
  noImage: { color: '#999' },

  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  description: { fontSize: 12, color: '#666', flex: 1 },

  row: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: 'bold', color: 'green' },
  viewBtn: { backgroundColor: 'black', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
  viewText: { color: 'white', fontSize: 12 },

  cartBtn: { marginTop: 10, backgroundColor: 'green', paddingVertical: 10, borderRadius: 5 },
  cartText: { color: 'white', textAlign: 'center', fontWeight: '600' },

  noProducts: { fontSize: 16, color: '#555' },
  center: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});