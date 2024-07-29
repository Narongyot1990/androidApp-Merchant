// src/screens/CreateOrder.js
//<Image style={styles.menuImage} source={require=(item.image)} />
// src/screens/CreateOrder.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Modal, TextInput, Button } from 'react-native';
import initialMenuData from '../data/initialMenuData';
const comment = { image: require('../assets/icons/comment_02.png') }

// Component สำหรับการเพิ่มความคิดเห็น
const AddComment = ({ commentData, onAddComment, onEditComment, onDeleteComment }) => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [commentText, setCommentText] = useState(commentData || '');

  const handleAddComment = () => {
    onAddComment(commentText);
    setCommentText('');
    setAddModalVisible(false);
  };

  const handleEditComment = () => {
    onEditComment(commentText);
    setAddModalVisible(false);
  };

  return (
    <View style={styles.comment_box}>
      {!commentData ? (
        <TouchableOpacity onPress={() => setAddModalVisible(true)}>
          <Image source={comment.image} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity onPress={() => setViewModalVisible(true)}>
            <Text>Read More</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteComment()}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your comment"
              value={commentText}
              onChangeText={setCommentText}
            />
            {!commentData ? (
              <Button title="Add Comment" onPress={handleAddComment} />
            ) : (
              <Button title="Save Comment" onPress={handleEditComment} />
            )}
            <Button title="Cancel" onPress={() => setAddModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isViewModalVisible && !!commentData}
        onRequestClose={() => setViewModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{commentData}</Text>
            <Button title="Close" onPress={() => setViewModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Component สำหรับการเพิ่มคำสั่ง
const AddOrder = ({ isAddOrder, qty, onAdd, onRemove, commentData, onAddComment, onEditComment, onDeleteComment }) => {
  return (
    <View style={styles.addOrderContainer}>
      {qty === 0 && (
        <TouchableOpacity onPress={onAdd}>
          <Text style={styles.addOrderText}>+</Text>
        </TouchableOpacity>
      )}
      {isAddOrder && qty > 0 && (
        <View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={onRemove}>
              <Text style={styles.addOrderText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.addOrderText_qty}> {qty} </Text>
            <TouchableOpacity onPress={onAdd}>
              <Text style={styles.addOrderText}>+</Text>
            </TouchableOpacity>
          </View>
          <AddComment 
            commentData={commentData}
            onAddComment={onAddComment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          />
        </View>
      )}
    </View>
  );
};

// Component ที่ใช้แสดงข้อมูลแต่ละรายการ
const RenderItem = ({ item }) => {
  const [isAddOrder, setIsAddOrder] = useState(false);
  const [qty, setQty] = useState(0);
  const [comment, setComment] = useState('');

  const handleAdd = () => {
    setIsAddOrder(true);
    setQty(qty + 1);
  };

  const handleRemove = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  const handleAddComment = (commentText) => {
    setComment(commentText);
  };

  const handleEditComment = (commentText) => {
    setComment(commentText);
  };

  const handleDeleteComment = () => {
    setComment('');
  };

  return (
    <View style={styles.itemContainer}>
      <Image style={styles.menuImage} source={require=(item.image)} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.menu}</Text>
        <Text style={styles.itemText}>{item.price}</Text>
        <Text style={styles.itemText}>{item.status}</Text>
      </View>
      <AddOrder 
        isAddOrder={isAddOrder}
        qty={qty}
        onAdd={handleAdd}
        onRemove={handleRemove}
        commentData={comment}
        onAddComment={handleAddComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />
    </View>
  );
};

// Component สำหรับแสดงหมวดหมู่และรายการ
const CategorySection = ({ category, items }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList 
        data={items}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const CreateOrder = () => {
  // จัดกลุ่มข้อมูลตามหมวดหมู่
  const categories = initialMenuData.reduce((acc, item) => {
    // หากหมวดหมู่ยังไม่อยู่ใน accumulator ให้สร้างใหม่
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    // เพิ่มรายการในหมวดหมู่ที่ตรงกัน
    acc[item.category].push(item);
    return acc;
  }, {});

  // เปลี่ยน categories จาก object เป็น array เพื่อการแสดงผล
  const categoryList = Object.keys(categories).map(category => ({
    category,
    items: categories[category],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={categoryList}
          renderItem={({ item }) => (
            <CategorySection category={item.category} items={item.items} />
          )}
          keyExtractor={item => item.category}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    // wait for somethings
  },
  categoryContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 10
  },
  addOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOrderText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#333',
  },
  addOrderText_qty: {
    fontSize: 22,
    color: 'red',
    fontWeight: '600',
  },
  comment_box: {
    alignSelf: 'center',
    justifyContent:'space-around',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    padding: 5,
  },
});

export default CreateOrder;