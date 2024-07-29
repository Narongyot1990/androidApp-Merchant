// src/components/StatusToggleButton.js
import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const StatusToggleButton = ({ isEnabled, toggleSwitch }) => {
    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f8f8f8' : '#f4f3f4'}
                //ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 50,
    },
});

export default StatusToggleButton;
