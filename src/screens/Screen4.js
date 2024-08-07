// src/screens/Screen3.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Screen4 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Screen 4</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default Screen4;
