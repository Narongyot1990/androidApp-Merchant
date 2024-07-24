// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signup } from '../apiService';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const data = await signup(email, password);
      setMessage('Signup successful!');
      navigation.navigate('Profile');
    } catch (error) {
      setMessage('Signup failed.');
    }
  };

  const navigateToSignin = () => {
    navigation.navigate('Signin');
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
      {message && <Text>{message}</Text>}
      <Button title='Already have an account ? Sign In' onPress={navigateToSignin} />
    </View>
  );
};

export default SignupScreen;
