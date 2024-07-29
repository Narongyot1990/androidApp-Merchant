// src/screens/HomeScreen.js
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import styles from '../styles/homeStyle';

// Define your icons data
const iconsData = [
  {
    id: 1,
    image: require('../assets/icons/receipt_01_color.png'),
    text: 'คำสั่งซื้อ',
    onPress: () => {} // Add navigation or other actions here
  },
  {
    id: 2,
    image: require('../assets/icons/menu_03_color.png'),
    text: 'เมนู',
    onPress: (navigation) => navigation.navigate('เมนู')
  },
  {
    id: 3,
    image: require('../assets/icons/feedback_01_color.png'),
    text: 'Feedback',
    onPress: () => {}
  },
  {
    id: 4,
    image: require('../assets/icons/shop_01_color.png'),
    text: 'ร้าน',
    onPress: () => {}
  },
  {
    id: 5,
    image: require('../assets/icons/sale_01_color.png'),
    text: 'เพิ่มยอดขาย',
    onPress: () => {}
  },
  {
    id: 6,
    image: require('../assets/icons/data_01_color.png'),
    text: 'ข้อมูลเชิงลึก',
    onPress: () => {}
  },
  {
    id: 7,
    image: require('../assets/icons/staff_01_color.png'),
    text: 'พนักงาน',
    onPress: () => {}
  },
  {
    id: 8,
    image: require('../assets/icons/other_01_color.png'),
    text: 'อื่นๆ',
    onPress: () => {}
  },
];

// Define your banner data
const bannersData = [
  {
    id: 1,
    image: require('../assets/icons/banner_01.png'),
    onPress: () => {} // Add navigation or other actions here
  },
  {
    id: 2,
    image: require('../assets/icons/banner_02.png'),
    onPress: () => {}
  },
  {
    id: 3,
    image: require('../assets/icons/banner_03.png'),
    onPress: () => {}
  },
  {
    id: 4,
    image: require('../assets/icons/banner_04.png'),
    onPress: () => {}
  },
];

const HomeScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    startScrollAnimation();

    return () => {
      if (animation) animation.stop();
    };
  }, []);

  const startScrollAnimation = () => {
    const newAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: 500, // จำนวนพิกเซลที่ต้องการให้เลื่อนไป
          duration: 12000, // ระยะเวลาในการเลื่อน
          useNativeDriver: true,
        }),
        Animated.timing(scrollX, {
          toValue: 0, // กลับไปที่จุดเริ่มต้น
          duration: 12000,
          useNativeDriver: true,
        }),
      ]),
    );
    newAnimation.start();
    setAnimation(newAnimation);
  };

  const handleTouchStart = () => {
    if (animation) animation.stop();
  };

  const handleTouchEnd = () => {
    return;
    //startScrollAnimation();
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/icons/bg_01_color.png')} style={styles.background}
      />
      {/*  Slidable Menu */}
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.slide_menu}
        style={styles.scrollView}
        contentOffset={{ x: scrollX }} // ใช้ animated value
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {bannersData.map(banner => (
          <View key={banner.id} style={styles.highlight}>
            <Image source={banner.image} style={styles.banner} />
            <TouchableOpacity onPress={banner.onPress}>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.work_list}>
        {iconsData.map(icon => (
          <TouchableOpacity 
            key={icon.id} 
            style={styles.icons} 
            onPress={() => icon.onPress(navigation)}
          >
            <Image source={icon.image} style={styles.icon} />
            <Text style={styles.text_icon}>{icon.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

// ./gradlew clean
// ./gradlew assembleRelease
// adb -s VB52239920290 install android/app/build/outputs/apk/release/app-release.apk