import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Cart from './Screens/Cart';
import ProductsList from './Screens/Home';
import Checkout from './Screens/CheckOut';
import ProductDetails from './Screens/ProductDetails';
import MyOrders from './Screens/Orders';
import UserProfile from './Screens/Profile';
import PlaceOrder from './Screens/PlaceOrder';
import AccountSettings from './Screens/Settings';
import StackNavigation from './Navigation/StackNavigation';

export default function App() {

  const dummyProducts = [
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
  ];

  const dummyProduct = 
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation feature.",
      price: 49.99,
      published: 1,
      image: "https://images.unsplash.com/photo-1580894908361-967195033f48",
      stock: 10,
    };
  
  const dummyCart = [
    {
      product_id: 1,
      product_name: "Wireless Headphones",
      product_price: 49.99,
      quantity: 2,
    },
    {
      product_id: 2,
      product_name: "Smart Watch",
      product_price: 79.99,
      quantity: 1,
    },
    {
      product_id: 3,
      product_name: "Bluetooth Speaker",
      product_price: 29.99,
      quantity: 3,
    },
  ];

  const dummyShippingMethods = [
    {
      name: "Standard Shipping",
      cost: 3.99,
      estimated_days: 5,
    },
    {
      name: "Express Shipping",
      cost: 7.99,
      estimated_days: 2,
    },
    {
      name: "Overnight Shipping",
      cost: 12.99,
      estimated_days: 1,
    },
  ];
  const dummyPaymentMethods = [
    {
      method: "cod", // Cash on Delivery
    },
    {
      method: "card",
    },
    {
      method: "paypal",
    },
  ];

  const dummyUserId = 101;
   

  return (

    <StackNavigation/>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
