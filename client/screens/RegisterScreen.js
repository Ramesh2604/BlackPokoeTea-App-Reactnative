// RegisterScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState } from 'react';
import { View, TextInput, Text,StyleSheet,ImageBackground ,Image, Alert} from 'react-native';
import axios from "axios";
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email,setEmail]=useState('');
  const  [mobile, setMobile]=useState('');
  const [age,setAge]=useState('');

  const handleRegister = async () => {
    if (!username || !email || !password || !mobile || !age) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    const mobileRegex = /^[0-9]+$/;
  if (!mobileRegex.test(mobile)) {
    Alert.alert('Error', 'Mobile number must contain only numbers');
    return;
  }
    try {
      // Check if the email is already registered
      const checkResponse = await axios.post('http://192.168.176.150:5000/check-email', {
        email,
      });
  
      if (checkResponse.data.isRegistered) {
        Alert.alert('Error', 'Email is already registered');
        return; // Stop registration if email is already registered
      }
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Invalid email format');
        return;
      }
  
      const ageRegex = /^[0-9]+$/;
  if (!ageRegex.test(age)) {
    Alert.alert('Error', 'Age must contain only numbers');
    return;
  }
  const ageValue = parseInt(age, 10);

  if (ageValue < 0) {
    Alert.alert('Error', 'Age cannot be a negative value');
    return;
  }

if (ageValue < 18 || ageValue > 100) {
  Alert.alert('Error', 'Age must be between 18 and 100');
  return;
}
      // Validate password
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        Alert.alert('Error', 'Password must be at least 8 characters long and include a number, a special character, and a letter');
        return;
      }
  
      // Validate mobile number length
      if (mobile.length !== 10) {
        Alert.alert('Error', 'Mobile number must be 10 digits long');
        return;
      }
  
      // Proceed with registration if all validations pass
      const response = await axios.post('http://192.168.176.150:5000/register', {
        email,
        password,
        mobile,
        username,
        age
      });
  
      if (response.data.success) {
        Alert.alert('Success', 'Registration successful');
        await AsyncStorage.setItem('userData', JSON.stringify({ username, age, mobile, email }));
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Registration failed');
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground 
        source={{uri:"https://w0.peakpx.com/wallpaper/811/448/HD-wallpaper-tea-7-autumn-coffee-elements-forever-holding-love-love-forever-men-shop-time.jpg"}}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Text style={styles.head}>Create Your Account</Text>
          <View style={styles.div}>
          
      <TextInput
      style={styles.inputname}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
      style={styles.inputemail}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
      style={styles.inputpass}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      
      <TextInput
      style={styles.inputconpass}
        placeholder="mobile number"
        value={mobile}
        keyboardType="numeric"
        onChangeText={text => setMobile(text)}
      />
      <TextInput
  style={styles.inputconpass}
  placeholder="age"
  keyboardType="numeric"
  value={age}
  onChangeText={text => setAge(text)}
/>
      <Text style={styles.regButton} onPress={handleRegister}>Register</Text>
      </View>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '105%',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)', // Adjust the last value for opacity (0.5 is 50% opacity)
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    fontSize:30,
    color:"white",
    marginBottom:10
  },
  div:{
    borderWidth:2,
    marginHorizontal:30,
    borderRadius:30,
    borderColor:'#f4a460',
    backgroundColor:'#ffdead',
    paddingHorizontal:1,
    paddingVertical:10,

  },
  
  regButton: {
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
    fontSize: 17,
    marginHorizontal: 80,
    marginVertical:10,
    borderWidth:2,
    borderColor:'#f4a460',
    backgroundColor:'#f4a460'
  },
  inputname:{
    paddingVertical: 10,
    textAlign:"center",
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 30,
    marginTop:20,
    marginBottom:6,
    borderWidth:2,
    borderColor:'#f4a460',
    backgroundColor:'white'

  },
  inputemail:{
    paddingVertical: 10,
    textAlign:"center",
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 30,
    marginBottom:6,
    borderWidth:2,
    backgroundColor:'white',
    borderColor:'#f4a460',

  },
  inputpass:{
    paddingVertical: 10,
    textAlign:"center",
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 30,
    marginBottom:6,
    borderWidth:2,
    borderColor:'#f4a460',
    backgroundColor:'white'

  },
  inputconpass:{
    paddingVertical: 10,
    
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 30,
    marginBottom:6,
    borderWidth:2,
    borderColor:'#f4a460',
    backgroundColor:'white',
    textAlign:"center"

  },
})
export default RegisterScreen;
