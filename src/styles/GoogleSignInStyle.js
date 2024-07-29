// src/styles/GoogleLoginStyle.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4285F4',
  },
  buttonText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: '400',
  },
  image: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
    borderWidth: 1,
    elevation: 5,
  },
});