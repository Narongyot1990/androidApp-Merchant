// src/components/SwipeableMenuItem.js
import React, { useState } from 'react';
import { View, Text,TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import ToggleButton from '../components/ToggleButton';

const SwipeableMenuItem = ({ image, menu, price, status, onDelete, onEdit, onToggle }) => {
    const [isEnabled, setIsEnabled] = useState(status === 'Available');

    const handleToggle = () => {
        setIsEnabled(prev => {
            const newStatus = prev ? 'Out of Stock' : 'Available';
            onToggle(newStatus);
            return !prev;
        });
    };

    const renderRightActions = () => (
        <RectButton style={styles.deleteButton} onPress={onDelete}>
            <Image style={styles.delete_image} source={require('../assets/icons/remove_01_red.png')} />
        </RectButton>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity style={styles.container} onLongPress={onEdit}>
                <Image source={image} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.menuText}>{menu}</Text>
                    <Text style={styles.priceText}>{price}</Text>
                    <Text style={isEnabled ? styles.statusText_true : styles.statusText_false }>{status}</Text>
                    <View style={styles.toggleSwitch}>
                        <ToggleButton 
                            isEnabled={isEnabled}
                            toggleSwitch={handleToggle}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 14,
    color: 'gray',
  },
  statusText_true: {
    fontSize: 12,
    color: 'green',
  },
  statusText_false: {
    fontSize: 12,
    color: 'red',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  delete_image: {
    width: 60,
    height: 60,
},
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleSwitch: {
    position: 'absolute',
    right: 0,
    marginTop: 7,
},
});

export default SwipeableMenuItem;
