// src/screens/HomeScreen.js
import React from 'react';
import { View, Button, Text } from 'react-native';
import styles from '../styles/homeStyle';
import CustomButton from '../styles/CustomButton';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Signup"
        onPress={() => navigation.navigate('Signup')}
      />
      <CustomButton
        title="Go to Signin"
        onPress={() => navigation.navigate('Signin')}
      />
    </View>
  );
};

export default HomeScreen;
