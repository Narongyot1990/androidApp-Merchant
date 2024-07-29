// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { signup } from '../apiService';
import CustomButton from '../styles/CustomButton';
import styles from '../styles/SignupStyle'
import PolicyComponent from '../components/PolicyComponent'

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    if (!isPolicyAccepted) {
      setMessage('You must agree to the policies to sign up.');
      return;
    }
    
    try {
      const data = await signup(email, password, phone);
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
    <View style={styles.backdrop}>
      <View style={styles.container} >
        <Text style={styles.text} >Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
        />
        <Text style={styles.text} >Mobile number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="
          
          
          
          
          
          
      ฃล,,,,,
      
      
      bile number"
          value={phone}
          onChangeText={setPhone}
          keyboardType='phone-pad'
        />
        <Text style={styles.text} >Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.text} >Confirm Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/*HELP ME ADD POLICY COMPONENT HERE*/}
        <PolicyComponent onChange={setIsPolicyAccepted} />

        <CustomButton title="Signup" onPress={handleSignup} />
        <TouchableOpacity onPress={() => {navigation.navigate('Signin')}}>
          <Text style={styles.linkText}>Already have an account ? Sign In</Text>
        </TouchableOpacity>

        {message && <Text>{message}</Text>}
      </View>
    </View>
  );
};

export default SignupScreen;
