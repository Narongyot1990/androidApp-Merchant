// src/styles/DropdownStyle.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    elevation: 1,
  },
  modalBody: {
    paddingHorizontal: 8,
  },
  closeButton: {
    position: 'absolute',
    left: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBox: {
    elevation: 1,
    borderRadius: 2,
    marginVertical: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  itemContainer: {
    borderBottomWidth: 0.2,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
