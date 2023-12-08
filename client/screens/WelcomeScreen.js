import { StatusBar } from 'expo-status-bar';
import { useCallback ,useState} from "react";
import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



import { StyleSheet, Text, View, Image, ImageBackground,TextInput,Alert, ScrollView} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.176.150:5000/login', {
        email,
        password,
      });

      if (response.data.message === 'Login successful') {
        Alert.alert('Success', 'Login successful');

        if (response.data.user) {
          await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
          navigation.navigate('Home');
        } else {
          console.warn('User data is missing in the response');
          // Handle missing user data case appropriately
        }
      } else {
        Alert.alert('Error', 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed');
    }
  
  };
  
  const handleRegister = () => {
    navigation.navigate('Register');
  };
 
 
  return (
    
    <View style={styles.container} >
      
      <ImageBackground 
        source={{uri:"https://w0.peakpx.com/wallpaper/811/448/HD-wallpaper-tea-7-autumn-coffee-elements-forever-holding-love-love-forever-men-shop-time.jpg"}}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Image style={styles.image} source={{uri: 'https://o.remove.bg/downloads/c728f770-ceb9-4b2f-b06b-8aa8137630dc/download__1_-removebg-preview.png'}} ></Image>
          <View style={styles.link}>
            
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
          <Text style={styles.loginButton} onPress={handleLogin}>Log in</Text>
          <Text style={styles.signup}>Not a member yet? <Text style={styles.button} onPress={handleRegister}>Signup</Text></Text>
          <StatusBar style="auto" />
         
          </View>
         
        </View>
        
      </ImageBackground>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7fffd4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: '80%',
    marginTop: 300,
  },
  input:{
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign:"center",
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 30,
    borderWidth:2,
    backgroundColor:'#ffdead'

  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '105%',
    alignItems: 'center',
  }
  ,
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)', // Adjust the last value for opacity (0.5 is 50% opacity)
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 130,
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 50,
    marginVertical:10,
    borderWidth:2,
    borderColor:'#f4a460',
    backgroundColor:'#f4a460'
  },
  signup: {
    marginTop: 1,
    color: 'white',
    marginLeft:120,
  },
  button: {
    textDecorationLine: 'underline',
    fontWeight:'bold',
    color: 'white',
  },
  link:{
    marginBottom:100,
    marginTop:150
  }
});
