import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newAge, setNewAge] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userJSON = await AsyncStorage.getItem('userData');
        const user = JSON.parse(userJSON);
        setUserData(user);
        setNewUsername(user?.username || '');
        setNewMobile(user?.mobile || '');
        setNewAge(user?.age || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    // Validate the new data if needed
    // For example, check if mobile and age are valid numbers

    // Update the user data
    const updatedUserData = { ...userData, username: newUsername, mobile: newMobile, age: newAge };
    setUserData(updatedUserData);

    // Save the updated data to AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    // Disable editing mode
    setEditing(false);
  };

  const navigation = useNavigation(); // Initialize navigation

  const handleLogout = async () => {
    try {
       // Remove user data from AsyncStorage
      navigation.navigate('Welcome'); // Navigate to WelcomeScreen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: userData?.avatar || 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
          />
          {editing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={newUsername}
                onChangeText={setNewUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile"
                keyboardType="numeric"
                value={newMobile}
                onChangeText={setNewMobile}
              />
              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={newAge}
                onChangeText={setNewAge}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
            <Text style={styles.text}>Username :-</Text>
              <Text style={styles.name}>{userData?.username || 'Username Not Available'}</Text>
              <Text style={styles.text}>Email :-</Text>
              <Text style={styles.userInfo}>{userData?.email || 'Email Not Available'}</Text>
              <Text style={styles.text}>Mobile No :-</Text>
              <Text style={styles.userInfo}>{userData?.mobile || 'Mobile Not Available'}</Text>
              <Text style={styles.text}>Age :-</Text>
              <Text style={styles.userInfo}>{userData?.age || 'Age Not Available'}</Text>
              
              <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout ?</Text>
          </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    color:"grey",
    marginTop:10,
    textAlign:"center"
  },
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 20,
    marginTop:150
  },
  name: {
    fontSize: 28,
    color: '#000000',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 18,
    color: '#778899',
    fontWeight: '800',
  },
  body: {
    backgroundColor: '#778899',
    
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginRight:20
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
    marginLeft:-25,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 30,
    borderWidth: 2,
    backgroundColor: '#ffdead',
    marginBottom: 10,
  },

  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#f4a460',
    backgroundColor: '#f4a460',
    marginBottom:2
  },

  editButtonText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },

  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#008000',
    backgroundColor: '#008000',
  },

  saveButtonText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 17,
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#FF0000',
    backgroundColor: '#FF0000',
    marginBottom:50
  },

  logoutButtonText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
})
