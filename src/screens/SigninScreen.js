// src/screens/SigninScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { signin } from '../apiService';
import styles from '../styles/SigninStyle';
import CustomButton from '../styles/CustomButton';
import SearchableDropdown from '../components/SearchableDropdown';
import countries from '../data/countries';
import GoogleLoginButton from '../components/GoogleSignInButton';


const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [useEmail, setUseEmail] = useState(true);
  const [country, setCountry] = useState('+66');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSignin = async () => {
    try {
      const data = await signin(email, password);
      setMessage('Signin successful!');
      navigation.navigate('Profile');
    } catch (error) {
      setMessage('Signin failed.');
    }
  };

  const handleGoogleLoginSuccess = (userInfo) => {
    console.log('Google Login Success:', userInfo);
    navigation.navigate('Profile');
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google Login Failure:', error);
    setMessage('Google Sign-In failed.');
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={ useEmail ? styles.activeToggle : styles.inactiveToggle} 
            onPress={() => setUseEmail(true)}
          >
            <Text style={!useEmail ? styles.text : styles.linkText} >Email</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={ !useEmail ? styles.activeToggle : styles.inactiveToggle} 
            onPress={() => setUseEmail(false)}
          >
            <Text style={useEmail ? styles.text : styles.linkText} >Phone</Text>
          </TouchableOpacity>
        </View>
        {useEmail ? (
          <View style={styles.byEmail}>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
            />
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.textInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <CustomButton title="Login" onPress={handleSignin} />
            <View style={styles.spaceBetween}>
              <TouchableOpacity>
                <Text style={styles.linkText}>Create new account</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            {message && <Text>{message}</Text>}          
          </View>
        ) : (
          <View>
            <View style={styles.byPhone}>
              <Text style={styles.text}>Phone number</Text>
              <View style={styles.dropDownContainer}>
                <TouchableOpacity 
                  style={styles.dropDownPickerLeft}
                  onPress={() => setIsDropdownVisible(true)}
                >
                  <Text style={styles.dropdownText}>{country}</Text>
                </TouchableOpacity>
                <TextInput style={styles.dropDownPickerRight}
                  placeholder="Mobile phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType='phone-pad'
                />
              </View>
              <Text style={styles.text}>Password</Text>
              <TextInput style={styles.textInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <CustomButton title="Login" onPress={handleSignin} />
              <View style={styles.spaceBetween}>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Create new account</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              {message && <Text>{message}</Text>}          
            </View>
          </View>
        )}
        <SearchableDropdown
          data={countries}
          visible={isDropdownVisible}
          onSelect={setCountry}
          onClose={() => setIsDropdownVisible(false)}
          placeholder="Search for a country"
          title="Country/Region"
        />
        <GoogleLoginButton 
        onLoginSuccess={handleGoogleLoginSuccess}
        onLoginFailure={handleGoogleLoginFailure}
        />
      </View>
    </View>
  );
};

export default SigninScreen;