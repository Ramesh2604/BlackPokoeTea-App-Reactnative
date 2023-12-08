import * as React from 'react';
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View,Text,StyleSheet, TextInput } from 'react-native';
const App=()=>{
    const [isLoaded] = useFonts({
        "mrt-mid": require("./assets/josefin-sans/JosefinSans-Regular.ttf"),
        "mrt-bold": require("./assets/montserrat/Montserrat-ExtraBoldItalic.otf"),
        "mrt-xbold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
        "mrt-":require("./assets/Lobster/Lobster_1.3.otf")
      });
    
      const handleOnLayout = useCallback(async () => {
        if (isLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [isLoaded]);
    
      if (!isLoaded) {
        return null;
      }
    return(
        <View style={styles.container}>
            <Text style={styles.head}>Black Pokie Tea</Text>
            <TextInput style={styles.email} placeholder='email'></TextInput>
            <TextInput style={styles.password} placeholder='password'></TextInput>
            <Text style={styles.login}>Login</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#7fffd4',
    
    },
    head:{
        marginLeft:50,
        marginTop:100,
        color:"black",
        fontSize:40,
        fontFamily:"mrt-mid",
        fontWeight:"900"
    },
    email:{
        borderWidth:1,
        paddingLeft:20,
        borderColor:"black",
        borderRadius:20,
        marginLeft:20,
        marginRight:20,
        marginTop:50,
        paddingTop:13,
        paddingBottom:13,
        paddingRight:20,
        fontSize:18,
        color:"gray",
        
    },
    password:{
        borderWidth:1,
        paddingLeft:20,
        borderColor:"black",
        borderRadius:20,
        marginLeft:20,
        marginRight:20,
        marginTop:30,
        paddingTop:13,
        paddingBottom:13,
        paddingRight:20,
        fontSize:18,
        color:"gray",
    },
    login:{
        backgroundColor:"black",
        color:"white",
        marginTop:50,
        fontSize:18,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:150,
        paddingRight:150,
        marginLeft:20,
        marginRight:20
    }
})
export default App