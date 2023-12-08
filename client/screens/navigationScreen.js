import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HomeScreen1 from '../components/homeScreen';
import OrderScreen from '../components/orderScreen';
import CartScreen from '../components/cartScreen';
import ProfileScreen from '../components/profileScreen';

const Navigatscreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home',unfocusedIcon: 'home-outline' },
    { key: 'cart', title: 'Cart', focusedIcon: 'truck', unfocusedIcon: 'truck-outline' },
    { key: 'orders', title: 'Orders', focusedIcon: 'car',unfocusedIcon: 'car-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'hail'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen1,
    orders: OrderScreen,
    cart: CartScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Navigatscreen;