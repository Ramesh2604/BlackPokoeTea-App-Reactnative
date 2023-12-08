import React from 'react';
import { Text, View ,ScrollView, StyleSheet,ImageBackground,Image,Alert,TouchableOpacity} from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';

import { SliderBox } from "react-native-image-slider-box";


function HomeScreen1() {
  //search input codes
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  
  const showTeaCollections = () => {
    const teaCollections = collections.filter(collection => collection.title.toLowerCase().includes('tea'));
    console.log(teaCollections)
    axios.post("http://192.168.176.150:5000/teaCollection",teaCollections)
  };

  this.state={
    images:[
        "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1507133750040-4a8f57021571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1610632380989-680fe40816c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1522992319-0365e5f11656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"

    ]
}

  const collections = [
    {
 
      title: 'Black Coffee',
      price: 10.00,
      quantity:1,
      name:"Black coffee is the companion that keeps me focused and eager to conquer the world.",
      url: 'https://media.istockphoto.com/id/157528129/photo/mug-on-plate-filled-with-coffee-surrounded-by-coffee-beans.webp?b=1&s=170667a&w=0&k=20&c=6K7HLoSqH9i-uP4ngjLe2jSwTpNSNRn3JBeUsZ006JI=',
    },
    {
 
      title: 'Green Tea',
      price: 15.00,
      quantity:1,
      name:"The fragrance of green tea is like a breath of fresh air for your spirit.",
      url: 'https://media.istockphoto.com/id/597657478/photo/like-tea.jpg?s=612x612&w=0&k=20&c=PgfvY_uI6B1K3FYV_wNen0hC32JVk6Mhm0yKIrFn6tI=',
    },
    {
    
      title: 'Masala Tea',
      price: 20.00,
      quantity:1,
      name:"Tea is the elixir of life, bringing tranquility to my weary soul.",
      url: 'https://recipes.wellcurve.in/wp-content/uploads/2022/03/Masala-Tea.jpg',
    },
    {
   
      title: 'Tea',
      price: 10.00,
      quantity:1,
      name:"Tea, the gentle potion that warms my heart and calms my mind.",
      url: 'https://t4.ftcdn.net/jpg/04/00/52/13/360_F_400521390_uWn8KdMCXK9V5Gkp3dVGOAyKsqQok03V.jpg',
    },
    {
  
      title: 'Cold Coffee',
      price: 50.00,
      quantity:1,
      name:"Iced coffee is always a good idea.",
      url: 'https://img.freepik.com/free-photo/glass-foamy-cold-coffee-with-whipped-cream-chocolate-wooden-plate_114579-90914.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697155200&semt=ais',
    },
    {
      title: 'Hot Chocolate',
      price: 60.00,
      quantity:1,
      name:"Winter evenings were made for hot chocolate.",
      url: 'https://media.istockphoto.com/id/615905680/photo/hot-chocolate.jpg?s=612x612&w=0&k=20&c=-8vu3ZZwfe_qFsQiamHfeu9r8TROWgzF0Dn--qrylKg=',
    },
    {
      title:"Ginger Lime Tea",
      price:50.00,
      name:"I got my tea. I got everything with me.",
      url:'https://images.unsplash.com/photo-1519110756001-72f90e894646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdpbmdlciUyMHRlYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      title:"Rose Tea",
      price:100.00,
      name:"Tea gives me joy in life.",
      url:"https://images.unsplash.com/photo-1622480915766-902aec51de8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9zZSUyMHRlYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      title:"Cardamom Tea",
      price:80.00,
      name:"I can’t be friends with people who don’t drink tea.",
      url:"https://media.istockphoto.com/id/1287066793/photo/tea-or-chai-tea-on-wooden-board-with-spices-cozy-hot-drink.jpg?s=612x612&w=0&k=20&c=kjU3nkgDORKThD6qvgw6mMkmYZToZSUJMDyoTgwIcLk="
    }



  ];

  
  const addToCart = (collection) => {
    axios.post('http://192.168.176.150:5000/additem', collection)
      .then((response) => {
        Alert.alert('Success', 'Item added  successfully');
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to add item ');
      });
  };
 
  const filteredCollections = collections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
    return (
      <ScrollView>
        
        
        <Image style={styles.image} source={{uri: 'https://o.remove.bg/downloads/96489f46-10b4-487f-b4cc-8f2cf468c28c/download__3_-removebg-preview.png'}} ></Image>
        <Text style={styles.header}>at your service 7/24 hours</Text>
        
        
      
      
      <View style={{ backgroundColor: "#f5f5dc" }}>
        <Text style={styles.head}>Collections</Text>
        <View style={styles.collect}>
        <TouchableOpacity style={styles.collectionbutton} onPress={showTeaCollections}>
          <Text style={styles.collectText}>TEA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.collectionbutton}>
          <Text style={styles.collectText}>COFFEE</Text>
        </TouchableOpacity>
        </View>
        


        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.search}
        />


        <SliderBox
          images={this.state.images}
          autoplay
          circleLoop
          dotColor={"blue"}
          inactiveDotColor="grey"
          ImageComponentStyle={{width:"100%",height:250}}
        />

        <View style={styles.collectionRow}>
          {filteredCollections.map((collection, index) => (
            <View
              key={index}
              style={[
                styles.collectionContainer,
                index % 2 === 0 && styles.doubleWidth,
              ]}
            >
              <View style={styles.detailsContainer}>
                <Image source={{ uri: collection.url }} style={styles.collectionImage} />
                <Text style={styles.collectionTitle}>{collection.title}</Text>
                <Text style={styles.collectionPrice}>Rs : {collection.price}</Text>
                <Text style={styles.collectionName}>"{collection.name}"</Text>
                <TouchableOpacity
                  onPress={() => addToCart(collection)}
                  style={[styles.button, styles.addToCartButton]}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
      </ScrollView>
    );
  }

const styles=StyleSheet.create({
  collect:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginHorizontal:10,
    marginTop:10
  },
  collectionbutton:{
    borderRadius:8,
    borderColor:"#f4a460",
    backgroundColor:"#f4a460",
    borderWidth:2,
    width:"48%",
    paddingVertical:5
  },
  collectText:{
    // color:"white",
    textAlign:"center",
    fontWeight:"bold",
    fontSize:18
  },
  header:{
    marginTop:10,
    marginBottom:20,
    color:"darkgray",
    fontSize:12,
    marginLeft:130
  },
  Background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '100%',
    alignItems: 'center',
  },
  
  
  image: {
    height: 200,
    width: '65%',
    marginTop: 100,
    marginLeft:70
    
  },
  search:{
    marginHorizontal: 30,
    marginTop:20,
    textAlign:"center",
    height:50,
    borderRadius:10,
    marginBottom:20
  },
  head:{
    marginTop:2,
    fontSize:18,
    textAlign:"center",
    color:"black",
    fontFamily:"Roboto",
    fontWeight:"700" ,
    //textShadowColor: 'rgba(0, 0, 0, 0.75)', // Color of the shadow
    //textShadowOffset: { width: 2, height: 2 }, // Shadow offset (x, y)
    //textShadowRadius: 12,
  },
 
  collectionContainer: {
    
    flexDirection: 'row', 
    justifyContent: 'space-between', // Align items to the start (top)
    marginBottom: 16,
    backgroundColor: '#F5F5F5', // Light gray background color
    borderRadius: 8,
    borderColor: "#f4a460",
    borderWidth: 2,
    marginTop: 20,
    marginHorizontal: 18,
    width: "90%",
    
  },
  doubleWidth: {
    flex: 1, // Takes up twice as much space as other items
  },
  collectionImage: {
    width: "100%",
    height: 230,
    resizeMode: 'cover',
    borderRadius: 8,
    
  },
  detailsContainer: {
    flex: 1,
    textAlign:"center",
  },
  
  collectionTitle: {
    marginTop:10,
    fontSize: 20,
    fontWeight: '900',
    textAlign:"center"
  },
  collectionPrice: {
    marginTop: 4,
    fontSize: 16,
    color: 'green',
    textAlign:"center"
  },
  collectionName:{
    justifyContent:"center",
    paddingHorizontal:30,
    color:"grey",
    fontSize:15,
    marginTop:10,
    marginBottom:20
    
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:20,
    marginBottom:5
  },
  
  addToCartButton: {
    backgroundColor: '#f4a460', // Blue background for add to cart
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:15
  },
  
})

  export default HomeScreen1