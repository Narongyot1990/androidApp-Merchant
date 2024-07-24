// src/components/SearchableDropdown.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import dropdownStyles from '../styles/DropdownStyle';

const SearchableDropdown = ({ data, onSelect, placeholder, visible, onClose, title }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={dropdownStyles.itemContainer}
      onPress={() => {
        onSelect(item.value);
        setSearchQuery('');
        onClose();
      }}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent={false} animationType='slide'>
      <View style={dropdownStyles.modalContainer}>
        <View style={dropdownStyles.modalHeader}>
          <TouchableOpacity style={dropdownStyles.closeButton} onPress={onClose}>
            <Text style={dropdownStyles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={dropdownStyles.title}>{title}</Text>
        </View>
        <View style={dropdownStyles.modalBody}>
          <View style={dropdownStyles.searchBox}>
            <TextInput
              style={dropdownStyles.searchInput}
              placeholder={placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SearchableDropdown;
