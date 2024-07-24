// src/styles/CustomButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        marginVertical: 5,
        padding: 12,
        borderRadius: 5,
        elevation: 5
        },
    text: {
        color: '#ffffff',
        fontSize: 12
    },
});

export default CustomButton;