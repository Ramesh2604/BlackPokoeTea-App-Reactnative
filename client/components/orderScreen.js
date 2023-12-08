import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://192.168.176.150:5000/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    // Fetch orders initially
    fetchOrders();

    // Set up auto-refresh every 60 seconds (adjust as needed)
    const interval = setInterval(fetchOrders, 6000); // Changed to 60 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Successfulled Order List</Text>
        {orders.map((order, index) => (
          <View style={styles.orderContainer} key={index}>
            <Text style={styles.orderId}>Order ID: {order._id}</Text>
            <Text>Total: Rs.{order.total}</Text>
            <Text>Date & Time:{order.orderDateTime}</Text>
            {order.items.map((item, i) => (
              <View style={styles.itemContainer} key={i}>
                <Image source={{ uri: item.url }} style={styles.image} />
                <Text>{item.title}</Text>
                <Text>Price: Rs.{item.price}</Text>
                <Text>Name: {item.name}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DCDCDC', // Light gray background
    paddingBottom: 300,
  },
  image: {
    height: 200,
    width: '100%',
    
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"green"
  },
  orderContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#faebd7', // White background for order boxes
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemContainer: {
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default OrderScreen;
