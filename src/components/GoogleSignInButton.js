// src/components/GoogleLoginButton.js
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import styles from '../styles/GoogleSignInStyle'

const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure }) => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '298956623613-62md0rh45cp637v24ukddfpbqe653hfk.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      console.log('Checking for Play Services...');
      await GoogleSignin.hasPlayServices();
      console.log('Signing in...');
      const userInfo = await GoogleSignin.signIn();
      console.log('Sign-In Successful:', userInfo);
      Alert.alert('Sign-In Successful', `Welcome ${userInfo.user.name}`);
      onLoginSuccess(userInfo);
    } catch (error) {
      console.error('Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened');
      }
      Alert.alert('Sign-In Failed', 'Google Sign-In failed.');
      onLoginFailure(error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={signIn}>
      <Text style={styles.buttonText}>Login with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;