// src/components/CountrySearch.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import styles from '../styles/SigninStyle';
import countries from '../data/countries';

const CountrySearch = ({ visible, onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filterCountries = countries.filter(country =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.flatList_data}
      onPress={() => {
        onSelect(item.value);
        setSearchQuery('');
        onClose();
      }}
    >
      <Text> {item.label} </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent={false} animationType='slide'>
      <View style={styles.modalContainer}>
        <View style={styles.modalHead}>
          <TouchableOpacity style={styles.close_btn} onPress={onClose}>
            <Text style={styles.close_text}>X</Text>
          </TouchableOpacity>
          <Text style={styles.Text}>Country/Region</Text>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.search_box}>
            <TextInput
              style={styles.search_input}
              placeholder='Input country'
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <FlatList
            style={styles.flatList_data}
            data={filterCountries}
            renderItem={renderCountryItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CountrySearch;
