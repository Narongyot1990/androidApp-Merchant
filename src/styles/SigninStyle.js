// src/styles/SigninStyle.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0D0D0D'
  },
  container: {
    flex: 1,
    width: '95%',
    marginVertical: 10,
    backgroundColor: 'rgba(248, 248, 248, 1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5,
    padding: 10,
  },
  byEmail: {},
  byPhone: {},
  text: {
    fontWeight: '500',
    color: '#333',
    marginBottom: 3,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  linkText: {
    color: '#007bff',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  activeToggle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: '#007bff',
  },
  inactiveToggle: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.2,
  },
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownPickerLeft: {
    height: 40,
    width: '20%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'center'
  },
  dropDownPickerRight: {
    height: 40,
    width: '78%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownText: {
    fontWeight: '500',
    color: 'black'
  },
});
