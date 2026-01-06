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