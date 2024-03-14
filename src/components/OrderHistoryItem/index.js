// OrderListItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderListItem = ({ order }) => {
  const navigation = useNavigation();
  function handleShowProfile() {
    navigation.navigate('OneOrderScreen');
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleShowProfile}>
      <Image source={{ uri: order.product.productImage }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.productName}>{order.product.productName}</Text>
        <Text>{order.product.quality}</Text>
        <Text>Price: ${order.product.price}</Text>
        <Text>Weight: {order.weightInKg} kg</Text>
        <Text>Mobile Number: {order.mobileNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderListItem;
