import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Image, ScrollView, Modal, StyleSheet, Alert } from "react-native";
import SwipeableMenuItem from "../components/SwipeableMenuItem";
import initialMenuData from "../data/initialMenuData"


const AddMenuButton = ({ isVisible, onClose, onAdd }) => {
    const [menu, setMenu] = useState('');
    const [price, setPrice] = useState('');
    const [status] = useState('Available'); // Set default status to 'Available'
    const [category, setCategory] = useState(''); // Category input
    const [image, setImage] = useState(require('../assets/icons/banner_05.png')); // Default image

    const handleAdd = () => {
        if (menu && price && category) {
            onAdd({ menu, price, status, category, image }); // Include image in the data
            setMenu('');
            setPrice('');
            setCategory(''); // Reset category
            setImage(require('../assets/icons/banner_05.png')); // Reset image
            onClose();
        } else {
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Add New Menu Item</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Menu"
                        value={menu}
                        onChangeText={setMenu}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        value={price}
                        keyboardType="numeric" // Ensure numeric input for price
                        onChangeText={setPrice}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Category"
                        value={category}
                        onChangeText={setCategory}
                    />
                    <Text>Status: {status}</Text>
                    <Image source={image} style={styles.image} />
                    <Button title="Add" onPress={handleAdd} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const EditMenuModal = ({ isVisible, item, onClose, onSave }) => {
    const [menu, setMenu] = useState(item?.menu || '');
    const [price, setPrice] = useState(item?.price || '');
    const [status, setStatus] = useState(item?.status || '');

    // Update state when item prop changes
    useEffect(() => {
        setMenu(item?.menu || '');
        setPrice(item?.price || '');
        setStatus(item?.status || '');
    }, [item]);

    const handleSave = () => {
        onSave({ ...item, menu, price, status });
        onClose();
    };

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Edit Menu Item</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Menu"
                        value={menu}
                        onChangeText={setMenu}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        value={price}
                        keyboardType="numeric" // Ensure numeric input for price
                        onChangeText={setPrice}
                    />
                    <View style={styles.statusContainer}>
                        <Text>Status: {status}</Text>
                    </View>
                    <Button title="Save" onPress={handleSave}  />
                    <Button title="Cancel" onPress={onClose}  />
                </View>
            </View>
        </Modal>
    );
};

// CreateMenuScreen
const CreateMenuScreen = () => {
    const [menuData, setMenuData] = useState(initialMenuData);
    const [filterOutOfStock, setFilterOutOfStock] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddMenuVisible, setIsAddMenuVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    
    const handleToggle = (id, newStatus) => {
        setMenuData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
    };

    const handleAddMenu = (newItem) => {
        // เพิ่มรายการใหม่ไปที่ menuData
        setMenuData(prevData => {
            // ตรวจสอบหมวดหมู่ของรายการใหม่
            const newCategory = newItem.category;
            const updatedData = [...prevData, { id: (prevData.length + 1).toString(), ...newItem }];
    
            // อัปเดต visibleCategories ให้แสดงหมวดหมู่ใหม่
            setVisibleCategories(prevState => ({
                ...prevState,
                [newCategory]: true
            }));
            return updatedData;
        });
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsEditModalVisible(true);
    };

    const handleSave = (updatedItem) => {
        setMenuData(prevData =>
            prevData.map(item =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    const handleDelete = (id, menu) => {
        Alert.alert(
          "Are you sure?",
          "Do you really want to remove : " + menu,
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => setMenuData(prevData => prevData.filter(item => item.id !== id)) }
          ]
        );
    };

    const handleCategoryToggle = (category) => {
        setVisibleCategories(prevState => ({
            ...prevState,
            [category]: !prevState[category] // สลับสถานะการแสดง
        }));
    };

    const renderCategoryItems = (items) => {
        return items.map(item => (
            <SwipeableMenuItem
                key={item.id}
                image={item.image}
                menu={item.menu}
                price={item.price}
                status={item.status}
                onEdit={() => handleEdit(item)}
                onToggle={(newStatus) => handleToggle(item.id, newStatus)}
                onDelete={() => handleDelete(item.id, item.menu)}
            />
        ));
    };
      
    const filteredMenuData = menuData.filter(item => {
        const matchesStatus = filterOutOfStock ? item.status === 'Out of Stock' : true;
        const matchesSearch = item.menu.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const outOfStockCount = menuData.filter(item => item.status === 'Out of Stock').length;

    const groupedMenuData = filteredMenuData.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    const [visibleCategories, setVisibleCategories] = useState(
        Object.keys(groupedMenuData).reduce((acc, category) => {
            acc[category] = true; // หมวดหมู่ทั้งหมดเริ่มต้นที่แสดง
            return acc;
        }, {})
    );

    return (
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity style={styles.optionsActive}>
                    <Text style={styles.textOptionsActive}>เมนู</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionsInactive}>
                    <Text style={styles.textOptionsInactive}>ตัวเลือกเสริม</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.category}>
                <TextInput 
                    style={styles.categoryTextInput} 
                    placeholder="ค้นหา" 
                    value={searchQuery} // Bind search query to TextInput
                    onChangeText={text => setSearchQuery(text)} // Update search query on input change
                />
                <TouchableOpacity
                    style={styles.categoryTouchableOpacity}
                    onPress={() => setFilterOutOfStock(!filterOutOfStock)}
                >
                    <Text style={styles.categoryTouchableOpacityText}>
                        Out of stock ({outOfStockCount})
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.menu}>
                {Object.keys(groupedMenuData).map(category => {
                    const isVisible = visibleCategories[category]; // ตรวจสอบสถานะการแสดง
                    return (
                        <View key={category}>
                            <TouchableOpacity onPress={() => handleCategoryToggle(category)}>
                                <Text style={styles.categoryHeader}>{category}</Text>
                            </TouchableOpacity>
                            {isVisible && (
                                <View>
                                    {renderCategoryItems(groupedMenuData[category])}
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
            
            <TouchableOpacity
                style={styles.addMenuButton}
                onPress={() => setIsAddMenuVisible(true)}
            >  
            <Image style={styles.addMenuButton_image} source={require('../assets/icons/add_02_green.png')} />
            </TouchableOpacity>
            
            <AddMenuButton
                isVisible={isAddMenuVisible}
                onClose={() => setIsAddMenuVisible(false)}
                onAdd={handleAddMenu}
            />
            <EditMenuModal
                isVisible={isEditModalVisible}
                item={selectedItem}
                onClose={() => setIsEditModalVisible(false)}
                onSave={handleSave}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optionsInactive: {
        width: '50%',
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    optionsActive: {
        width: '50%',
        borderBottomWidth: 2,
        borderColor: '#0B3F2D'
    },
    textOptionsInactive: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        paddingVertical: 10
    },
    textOptionsActive: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 10,
        color: '#0B3F2D',
    },
    category: {
        padding: 10,
    },
    menu: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    categoryTextInput: {
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        marginVertical: 5,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        textAlign: 'center',
    },
    categoryTouchableOpacity: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 50,
        alignSelf: 'flex-start',
        marginVertical: 5,
        marginLeft: 10,
        backgroundColor: 'black'
    },
    categoryTouchableOpacityText: {
        fontSize: 10,
        color: '#ffffff',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    menuImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 10,
        elevation: 5,
    },
    menuDetails: {
        flex: 1,
    },
    menuTextHeader: {
        fontSize: 12,
        fontWeight: '600',
        color: 'black'
    },
    menuTextDetail: {
        fontSize: 12,
        fontWeight: '600',
    },
    menuStatusAvailable: {
        fontSize: 10,
        color: 'green',
    },
    menuStatusOutOfStock: {
        fontSize: 10,
        color: 'red',
    },
    toggleSwitch: {
        position: 'absolute',
        right: 0,
        marginTop: 7,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    statusContainer: {
        marginVertical: 10,
        alignSelf: 'center'
    },
    addMenuButton: {
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 50,
        bottom: 5,
        backgroundColor: '#ffffff'
    },
    addMenuButton_image: {
        width: 70,
        height: 70
    },
    categoryHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 5,
    },
    selectImageText: {
        color: 'blue',
        marginVertical: 10,
    },
});

export default CreateMenuScreen;