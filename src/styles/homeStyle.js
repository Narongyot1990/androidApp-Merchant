// src/styles/homeStyles.js
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
    },
    content: {
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    slide_menu: {
        paddingVertical: 10,
        opacity: 0.8
      },
    highlight: {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 5,
        width: 300,
        height: 200,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 10,
    },
    work_list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        backgroundColor: '#f6f6f6',
        marginHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        elevation: 10,
        opacity: 0.8,
    },
    icons: {
        width: '18%',
        marginHorizontal: 5,
        marginVertical: 5,
    },
    icon: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
    text_icon: {
        fontSize: 9,
        fontWeight: '900' ,
        textAlign: 'center',
        textShadowColor: '#ccc',
        textShadowOffset: { width: 1, height: 1 }, // Center the shadow
        textShadowRadius: 10, // Larger blur radius for a "smoke" effect
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0, // Make sure background is behind everything
    },
    banner: {
        position: 'absolute',
        width: 300,
        height: 200,
        borderRadius: 10,
        borderWidth: 1,
        elevation: 10,
    }
})