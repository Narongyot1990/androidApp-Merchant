import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Modal, Pressable, TextInput } from "react-native";

const Order = [
    {
        id: 1,
        image: require('../assets/icons/receipt_01_color.png'),
        text: 'รับ Order',
        tasks: [
            {
                id: 1,
                image: require('../assets/icons/receipt_01_color.png'),
                text: 'สร้างใหม่',
                onPress: (navigation) => navigation.navigate('Create Order')
            },
            {
                id: 2,
                image: require('../assets/icons/receipt_01_color.png'),
                text: 'สั่งเพิ่ม',
                onPress: () => {}
            },
            {
                id: 3,
                image: require('../assets/icons/receipt_01_color.png'),
                text: 'เช็คบิล',
                onPress: () => {}
            },
            {
                id: 4,
                image: require('../assets/icons/receipt_01_color.png'),
                text: 'ยกเลิก',
                onPress: () => {}
            },
        ]
    },
    {
        id: 2,
        image: require('../assets/icons/shop_01_color.png'),
        text: 'จองโต๊ะ',
        tasks: [
            {
                id: 1,
                image: require('../assets/icons/shop_01_color.png'),
                text: 'จองโต๊ะใหม่',
                onPress: () => {}
            }
        ]
    },
];

const CurrentOrder = [
    {
        id: 1,
        table_number: '7',
    },
    {
        id: 2,
        table_number: '1',
    },
    {
        id: 3,
        table_number: '8',
    },
    {
        id: 4,
        table_number: '8',
    },
    {
        id: 5,
        table_number: '8',
    },
    {
        id: 6,
        table_number: '8',
    },
    {
        id: 7,
        table_number: '8',
    },
    {
        id: 8,
        table_number: '8',
    },
    {
        id: 9,
        table_number: '8',
    },
    {
        id: 10,
        table_number: '8',
    },
    {
        id: 11,
        table_number: '8',
    },
    {
        id: 12,
        table_number: '8',
    },
    {
        id: 13,
        table_number: '8',
    },
    {
        id: 14,
        table_number: '8',
    },

    
];

const OrderTab = ({ text, image, onPress }) => (
    <TouchableOpacity style={styles.orderTab} onPress={onPress}>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
);

const OrderModal = ({ visible, onClose, text, image, tasks, onTaskPress }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                <Image source={image} style={styles.modalImage} />
                <Text style={styles.modalText}>{text}</Text>
                {tasks && tasks.map(task => (
                    <TouchableOpacity
                        key={task.id}
                        style={styles.taskButton}
                        onPress={() => onTaskPress(task)}
                    >
                        <Image source={task.image} style={styles.taskImage} />
                        <Text style={styles.taskText}>{task.text}</Text>
                    </TouchableOpacity>
                ))}
                <Pressable style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
);
 
const TaskDetailModal = ({ visible, onClose, onConfirm, showCurrentOrder, tableNumber, setTableNumber, note, setNote }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                {showCurrentOrder ? (
                    <FlatList style={{ height: '50%' }}
                        data={CurrentOrder}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text>{`Table Number: ${item.table_number}`}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="หมายเลขโต๊ะ"
                            value={tableNumber}
                            onChangeText={setTableNumber}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="หมายเหตุ"
                            value={note}
                            onChangeText={setNote}
                            multiline
                        />
                    </>
                )}

                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                        onConfirm();
                        onClose();
                    }}
                >
                    <Text style={styles.confirmButtonText}>ยืนยัน</Text>
                </TouchableOpacity>

                <Pressable style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>ปิด</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
);

const OrderScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tableNumber, setTableNumber] = useState('');
    const [note, setNote] = useState('');
    const [showCurrentOrder, setShowCurrentOrder] = useState(false);

    const handlePress = (item) => {
        setSelectedOrder(item);
        setModalVisible(true);
    };

    const handleTaskPress = (task) => {
        setSelectedTask(task);
        setShowCurrentOrder(['สั่งเพิ่ม', 'เช็คบิล', 'ยกเลิก'].includes(task.text));
        setTaskModalVisible(true);
    };

    const handleConfirm = () => {
        if (selectedTask && selectedTask.onPress) {
            selectedTask.onPress(navigation);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={Order}
                renderItem={({ item }) => (
                    <OrderTab
                        text={item.text}
                        image={item.image}
                        onPress={() => handlePress(item)}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />

            {selectedOrder && (
                <OrderModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    text={selectedOrder.text}
                    image={selectedOrder.image}
                    tasks={selectedOrder.tasks}
                    onTaskPress={handleTaskPress}
                />
            )}

            {selectedTask && (
                <TaskDetailModal
                    visible={taskModalVisible}
                    onClose={() => setTaskModalVisible(false)}
                    onConfirm={handleConfirm}
                    showCurrentOrder={showCurrentOrder}
                    tableNumber={tableNumber}
                    setTableNumber={setTableNumber}
                    note={note}
                    setNote={setNote}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    orderTab: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalImage: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    taskButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
    },
    taskImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    taskText: {
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 10,
    },
    confirmButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default OrderScreen;
