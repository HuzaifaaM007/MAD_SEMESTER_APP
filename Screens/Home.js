import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchData from '../utils/Api';
import { useEffect, useState } from 'react';

const ProductsList = ({ userId }) => {

  const [mobiles, setMobiles] = useState  ([]);
  const [loading, setLoading] = useState(true);

  useEffect( ()=>{
    const loadData = async () => {
      try {
        const data = await fetchData();
        setMobiles(data);
      } catch (err) {
        console.log("Error fetching mobiles:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []
  )

  const products = [
     {
    Brand: 'SAMSUNG Galaxy F14 5G (B.A.E. Purple, 128 GB)',
    Description: '6 GB RAM | 128 GB ROM | Expandable Upto 1 TB16.76 cm (6.6 inch) Full HD+ Display50MP + 2MP | 13MP Front Camera6000 mAh BatteryExynos 1330, Octa Core Processor1 Year Manufacturer Warranty for Device and 6 Months Manufacturer Warranty for In-Box Accessories',
    Image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/k/2/x/-original-imagtyxg7mdjhfqm.jpeg?q=70',      
    Price: '₹12,490',
    Tag: 'Mobile, Electronics',
    'Unnamed: 0': 10
  },
  ]

  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    if (item.published !== 1) return null;

    return (
      <View style={styles.card}>

        {/* Product Image */}
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

        {/* Product Name */}
        <Text style={styles.name}>{item.Brand}</Text>

        {/* Short Description */}
        <Text style={styles.Description}>
          {item.Description.substring(0, 60)}...
        </Text>

        {/* Price & View */}
        <View style={styles.row}>
          <Text style={styles.price}>${item.Price.toFixed(2)}</Text>

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
        data={mobiles}
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
