// src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to your profile!</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Back to Home" onPress={() => navigation.navigate('Signin')} />
    </View>
  );
};

export default ProfileScreen;
