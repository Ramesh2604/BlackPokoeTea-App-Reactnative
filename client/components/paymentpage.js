import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Button, TextInput ,Image,StyleSheet, TouchableOpacity, Alert,Linking} from 'react-native';

export default function Paymentpage({route}){
    const total = route.params?.total || 0;
    const navigation = useNavigation();
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [nearbyPlace, setNearbyPlace] = useState('');

    const caseONDelivery = () => {
        if (address.trim() === '' || pincode.trim() === '' || state.trim() === '' || nearbyPlace.trim() === '') {
            Alert.alert('Address Required', 'Please fill out all fields in the address form.');
        } else {
            Alert.alert('Payment Processed', "Thank you for your payment!");
            navigation.navigate("Home");
        }
    }

    const upiPayment = () => {
        const upiId = 'dummy@example.com'; // Replace with actual UPI ID
        const amount = total.toFixed(2); // Assuming total is defined in your component
    
        const paymentUrl = `upi://pay?pa=${upiId}&pn=Recipient&am=${amount}&cu=INR&tn=Payment&mc=123456`; // Constructing the UPI payment URL
    
        // You can use Linking to open the UPI payment app
        Linking.openURL(paymentUrl)
            .then(() => {
                Alert.alert('UPI Payment', 'Payment initiated successfully.');
            })
            .catch((error) => {
                Alert.alert('UPI Payment', 'Error initiating payment: ' + error.message);
            });
    }
    

    return (
        <View>
            <Image style={styles.image} source={{uri: 'https://o.remove.bg/downloads/c728f770-ceb9-4b2f-b06b-8aa8137630dc/download__1_-removebg-preview.png'}} ></Image>
            <Text style={styles.head}>Address :</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={text => setAddress(text)}
                placeholder="Enter your address"
            />
            <Text style={styles.head}>Pincode :</Text>
            <TextInput
                style={styles.input}
                value={pincode}
                onChangeText={text => setPincode(text)}
                placeholder="Enter your pincode"
                keyboardType="numeric"
            />
            <Text style={styles.head}>State :</Text>
            <TextInput
                style={styles.input}
                value={state}
                onChangeText={text => setState(text)}
                placeholder="Enter your state"
            />
            <Text style={styles.head}>Near by Place :</Text>
            <TextInput
                style={styles.input}
                value={nearbyPlace}
                onChangeText={text => setNearbyPlace(text)}
                placeholder="Enter your nearby place"
            />
            <Text style={styles.total}>Payable amount: Rs{total.toFixed(2)}</Text>
            <TouchableOpacity onPress={caseONDelivery} style={styles.placeOrderButton}>
                <Text style={styles.ordertext}>CASH ON DELIVERY</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={upiPayment} style={styles.upiButton}>
                <Text style={styles.ordertext}>UPI PAYMENT</Text>
            </TouchableOpacity>

            <TouchableOpacity   onPress={() => { navigation.navigate('CardPaymentpage')}}>
            <LinearGradient colors={["#48F10E", "#078716", "#093203"]}  style={styles.buttonContainer}  >
        <Text  style={styles.buttonText}>CARD PAYMENT </Text>
      </LinearGradient>
            </TouchableOpacity>
            
        </View>
    );
}

const styles=StyleSheet.create({
  buttonContainer: { 
    padding: 15, 
    alignItems: "center", 
    borderRadius: 5 
  },
  total:{
    fontSize:18,
    color:"white",
    fontWeight:"bold",
    borderRadius:10,
    borderWidth:2,
    borderColor:"blue",
    backgroundColor:"blue",
    width:"80%",
    paddingHorizontal:45,
    paddingVertical:5,
    textAlign:"center",
    marginHorizontal:30,
    marginVertical:10
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },
    placeOrderButton:{
        borderWidth:2,
        borderColor:"#f4a460",
        borderRadius:5,
        backgroundColor:"#f4a460",
        width:"100%",
        paddingVertical:7,
        marginBottom:5
    },
    ordertext:{
        fontSize:18,
        fontWeight:"bold",
        textAlign:"center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor:"#f0ffff",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    image: {
      height: 150,
      width: '50%',
      marginTop: 10,
      marginHorizontal:100
    },
    head:{
      fontSize:20,
      fontWeight:"500",
      marginLeft:10,
      marginBottom:5,
      marginTop:2

    },
    upiButton: {
        borderWidth: 2,
        borderColor: "#4caf50",
        borderRadius: 5,
        backgroundColor: "#4caf50",
        width: "100%",
        paddingVertical: 7,
        marginBottom: 5
    },
})
