// src/styles/SignupStyle.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    backdrop: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ccc'
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
        marginBottom: 25,
    },
    linkText: {
        fontSize: 16,
        color: '#007bff',
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: '#ccc',
        textShadowOffset: { width: 1, height: 1 }, // Center the shadow
        textShadowRadius: 10, // Larger blur radius for a "smoke" effect
    },
})
