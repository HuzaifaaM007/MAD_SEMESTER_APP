import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStaticNavigation } from '@react-navigation/native'
// import { ProductsList } from '../Screens/Home'
import ProductDetails from '../Screens/ProductDetails'
import Cart from '../Screens/Cart'
import Checkout from '../Screens/CheckOut'
import Login from '../Screens/Login'
import MyOrders from '../Screens/Orders'
import PlaceOrder from '../Screens/PlaceOrder'
import UserProfile from '../Screens/Profile'
import AccountSettings from '../Screens/Settings'
import SignUp from '../Screens/SignUp'
import ProductsList from '../Screens/Home'


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

const RootStack = createNativeStackNavigator({
    initialRouteName: 'ProductsList',
    screens: {
        ProductsList:{
            screen:ProductsList,
            // initialParams:
            options: {
                title:'My-Ecommerce'
            }
        },
        // ProductsList: ProductsList,
        ProductDetails: ProductDetails,
        Cart: Cart,
        Checkout: Checkout,
        Login: Login,
        MyOrders: MyOrders,
        PlaceOrder: PlaceOrder,
        UserProfile: UserProfile,
        AccountSettings: AccountSettings,
        SignUp: SignUp
    }
})
console.log("RootStack =", RootStack);

const Navigation = createStaticNavigation(RootStack);


const StackNavigation = () => {
    return (
        <Navigation />
    )
}

export default StackNavigation

const styles = StyleSheet.create({})