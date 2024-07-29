import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Screen2 from '../screens/Screen2';
import OrderScreen from '../screens/OrderScreen';
import Screen4 from '../screens/Screen4';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => (
  <View style={styles.tabBar}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label = options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : route.name;
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      // เลือกภาพไอคอนที่เหมาะสมตามชื่อของหน้าจอ
      let iconSource;
      if (route.name === 'Home') {
        iconSource = isFocused ? require('../assets/icons/home_01_black.png') : require('../assets/icons/home_01_gray.png');
      } else if (route.name === 'Screen2') {
        iconSource = isFocused ? require('../assets/icons/question_01_black.png') : require('../assets/icons/question_01_gray.png');
      } else if (route.name === 'Order') {
        iconSource = isFocused ? require('../assets/icons/order_03.png') : require('../assets/icons/order_03.png');
      } else if (route.name === 'Screen4') {
        iconSource = isFocused ? require('../assets/icons/question_01_black.png') : require('../assets/icons/question_01_gray.png');
      } else if (route.name === 'Profile') {
        iconSource = isFocused ? require('../assets/icons/profile_01_black.png') : require('../assets/icons/profile_01_gray.png');
      }

      // เพิ่มขนาดสำหรับปุ่ม CreateOrder
      const tabItemStyle = route.name === 'Order' ? styles.tabItemLarge : styles.tabItem;
      const iconStyle = route.name ==='Order' ? styles.iconLarge : styles.icon;

      return (
        <TouchableOpacity
          key={index}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={label}
          onPress={onPress}
          style={tabItemStyle}
        >
          <Image source={iconSource} style={iconStyle} />
          <Text style={{ fontSize:10, color: isFocused ? 'black' : '#8e8e8e', marginTop: 4 }}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
      sceneContainerStyle={containerStyle.container} // ใช้ containerStyle ที่กำหนด
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Screen2" component={Screen2} />
      <Tab.Screen name='Order' component={OrderScreen} />
      <Tab.Screen name="Screen4" component={Screen4} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 55,
    borderWidth: 0.2,
    borderColor: '#ccc',
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabItemLarge: {
    flex: 1,  // ทำให้ปุ่มใหญ่กว่าปุ่มอื่น ๆ
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  icon: {
    width: 26,
    height: 26,
  },
  iconLarge: {
    position: 'absolute',
    bottom: 20,
    width: 55,
    height: 55,
  },
});

const containerStyle = StyleSheet.create({
  container: {
    //none 
  },
});

export default TabNavigator;
