import { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { StyleSheet } from "react-native";
import CustomButton from "../styles/CustomButton";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const handleSendLink = () => {
        if (email) {
            Alert.alert("Success", "A password reset link has been sent to your email.");
        } else {
            Alert.alert("Error", "Please enter a valid email address.");
        }
    }

    return (
        <View style={styles.backdrop} >
            <View style={styles.container} >
                <Text style={styles.text} > Email </Text>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                >
                </TextInput>   
                <Text style={styles.p1} >กรุณาตรวจสอบอีเมล์ในช่องด้านบน เราจะส่งลิ้งก์ให้ท่านเพื่อดำเนินการในขั้นตอนถัดไป</Text>
                {/* Wait for Google Capcha */}
                <CustomButton title={'ตั้งค่ารหัสผ่านใหม่'} onPress={handleSendLink} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
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
    p1: {
        fontWeight: '500',
        color: 'black',
        marginBottom: 3,
    }
})


export default ForgotPassword;
