import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const PolicyComponent = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxChange = (newValue) => {
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <CheckBox
        value={isChecked}
        onValueChange={handleCheckBoxChange}
        tintColors={{ true: '#FF6347', false: '#ccc' }}
      />
      <Text style={styles.text}>
        I agree to receive updates and promotions of our services read more in the{' '}
        <TouchableOpacity onPress={() => {/* Handle policy link click */}}>
          <Text style={styles.linkText}>Terms and Conditions</Text>
        </TouchableOpacity>
        {' '}and{' '}
        <TouchableOpacity onPress={() => {/* Handle policy link click */}}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: '#333',
  },
  linkText: {
    color: '#FF6347',
    textDecorationLine: 'underline',
  },
});

export default PolicyComponent;
