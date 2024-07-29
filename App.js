// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './src/navigation/TabNavigator';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import PolicyComponent from './src/components/PolicyComponent';
import ForgotPassword from './src/components/ForgotPassword';
import CreateMenuScreen from './src/screens/CreateMenuScreen';
import CreateOrderScreen from './src/screens/CreateOrderScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator">
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="PolicyComponent" component={PolicyComponent} />
        <Stack.Screen name="เมนู" component={CreateMenuScreen} />
        <Stack.Screen name="Create Order" component={CreateOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
