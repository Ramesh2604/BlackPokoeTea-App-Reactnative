import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Button, 
  TextInput 
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const navigation = useNavigation();

  const handleQuantityChange = (itemId, quantity) => {
    setItemQuantities(prevState => ({
      ...prevState,
      [itemId]: quantity
    }));
  }

  const handleBuyNow = () => {
    const currentDate = new Date(); // Get the current date and time
  const formattedDate = currentDate.toLocaleString();
    const cartItemData = cartItems.map((item) => ({
      title: item.title,
      price: item.price,
      name: item.name,
      url: item.url,
      quantity: itemQuantities[item._id] || 1, // Default quantity is 1
    }));

    const totalValue = cartItemData.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace(/[^\d.]/g, ''));
      return total + (price * item.quantity);
    }, 0);

    const orderData = {
      items: cartItemData,
      total: totalValue,
      orderDateTime: formattedDate,
    };

    axios.post('http://192.168.176.150:5000/order', orderData)

      .then((response) => {
        navigation.navigate('Payment',{ total: totalValue});
        console.log("Order success", orderData);
      })
      .catch((error) => {
        console.log('Error', 'Failed order');
      });
  };

  const fetchCartItems = () => {
    axios.get('http://192.168.176.150:5000/cartitem')
      .then((response) => {
        if (Array.isArray(response.data)) {
          const itemsWithValidPrice = response.data.map((item) => ({
            ...item,
            price: typeof item.price === 'string' ? item.price : String(item.price),
          }));
          setCartItems(itemsWithValidPrice);
        } else {
          console.error('No cart items found in the response.');
        }
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  };

  const removeItemFromCart = (itemId) => {
    axios.delete(`http://192.168.176.150:5000/cartitem/${itemId}`)
      .then(() => {
        fetchCartItems();
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };

  useEffect(() => {
    fetchCartItems();

    const pollingInterval = setInterval(() => {
      fetchCartItems();
    }, 5000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Cart Items</Text>
      {cartItems.length === 0 ? (
        <Text>No items in the cart.</Text>
      ) : (
        cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image source={{ uri: item.url }} style={styles.itemImage} />

            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}>Price: {parseFloat(item.price)} Rs</Text>
              <Text style={styles.text}>Quantity:</Text>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                value={itemQuantities[item._id] ? itemQuantities[item._id].toString() : '0'}
                onChangeText={(text) => handleQuantityChange(item._id, parseInt(text))}
              />
            </View>

            <TouchableOpacity
              onPress={() => removeItemFromCart(item._id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>
          Rs{cartItems.reduce((total, item) => {
            const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace(/[^\d.]/g, ''));
            return total + (price * (itemQuantities[item._id] || 0));
          }, 0).toFixed(2)}
        </Text>
      </View>
      
      <TouchableOpacity onPress={handleBuyNow} style={styles.buyNowButton}>
        <Text style={styles.buyNowButtonText}>BUY NOW</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DCDCDC'
  },
  text:{
    fontSize:15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#f4a460"
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "green"
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
    marginTop:80,
    marginRight:10
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "green"
  },
  buyNowButton: {
    marginTop: 16,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#f4a460",
    backgroundColor: "#f4a460",
    textAlign: "center",
    width: "95%",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingVertical: 8
  },
  buyNowButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 8,
    width:"70%",
    paddingVertical:4,
    marginLeft:20
  },
});

export default CartScreen;
