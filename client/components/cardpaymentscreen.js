import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, TextInput ,Image,StyleSheet, TouchableOpacity,Alert, ScrollView} from 'react-native';
 

export default function CardPaymentPage() {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const navigation = useNavigation();
    const handlePayment=()=>{
      Alert.alert('payment Processed',"Thank you for your payment!")
      navigation.navigate("Home")
    }
    


    return (
      <ScrollView>
      <View>
        <Image style={styles.image} source={{uri:"https://media.istockphoto.com/id/531236924/photo/group-of-credit-cards-on-computer-keyboard.jpg?s=612x612&w=0&k=20&c=5iAuEH7ipVgVDI9TkgzTC8Xx0roMhvDlT79UzRiSzcE="}} ></Image>
        <Text style={styles.para}>We accept all major credit cards</Text>

        <Text style={styles.head}>Card Name:</Text>
        <TextInput style={styles.input}
          placeholder="Enter card name"
          onChangeText={(text) => setCardName(text)}
          value={cardName}
        />

        <Text style={styles.head}>Card Number:</Text>
        <TextInput  style={styles.input}
          placeholder="4242 4242 4242 4242"
          onChangeText={(text) => setCardNumber(text)}
          value={cardNumber}
        />
  
        <Text style={styles.head}>Expiry (MM/YY):</Text>
        <TextInput style={styles.input}
          placeholder="12/23"
          onChangeText={(text) => setExpiry(text)}
          value={expiry}
        />
  
        <Text style={styles.head}>CVC:</Text>
        <TextInput style={styles.input}
          placeholder="123"
          onChangeText={(text) => setCvc(text)}
          value={cvc}
        />
        <TouchableOpacity style={styles.paynowbutton} onPress={handlePayment} >
          <Text style={styles.buttontext}>PAY NOW</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }

  const styles=StyleSheet.create({
    image:{
        height:200,
        width:"100%"
    },
    para:{
      textAlign:"center",
      fontSize:14,
      color:"grey"
    },
    input:{
      textAlign:"center",
      fontSize:18,
      borderBottomWidth:1.5,
      borderBottomColor:"darkgrey",
      width:"90%",
      marginLeft:20,
      paddingBottom:10,
      marginBottom:10
    },
    head:{
      fontSize:20,
      marginTop:20,
      color:"#f4a460",
      fontWeight:"800",
      marginBottom:10,
      marginLeft:10
    },
    paynowbutton:{
      borderWidth:2,
      borderColor:"#f4a460",
      borderRadius:10,
      backgroundColor:"#f4a460",
      paddingVertical:8,
      width:"90%",
      marginHorizontal:15,
      marginTop:20
    },
    buttontext:{
      textAlign:"center",
      fontSize:18,
      fontWeight:"700",
      fontFamily:"Roboto"
    }
  })
  