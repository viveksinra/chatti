import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const OneOrderScreen = () => {
  const order = {
    product: {
      _id: "absd",
      productName: "Maize (G1 Quality)",
      quality: "High-Quality Grade 1 Maize",
      price: "1850",
      productImage: "https://m.media-amazon.com/images/I/61V1TTqTu6L._AC_UF1000,1000_QL80_.jpg"
    },
    weightInKg: "50",
    mobileNumber: "9846173905"
  };
  const pricePerKg = order.product.price / 100;
  const totalAmount = (pricePerKg * parseFloat(order.weightInKg)) || 0;
  const calculationText = order.weightInKg ? `₹${pricePerKg.toFixed(2)} per kg x ${order.weightInKg} kg` : '';
  return (
    <>
    <View style={styles.container}>
      <Image source={{ uri: order.product.productImage }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.productName}>{order.product.productName}</Text>
        <Text>{order.product.quality}</Text>
        <Text>Price: ${order.product.price}</Text>
        <Text>Weight: {order.weightInKg} kg</Text>
        <Text>Mobile Number: {order.mobileNumber}</Text>
      </View>
    </View>
    <View style={styles.totalContainer}>
    <Text style={styles.calculation}>{calculationText}</Text>
      <Text style={styles.total}>: ₹{totalAmount.toFixed(2)}</Text>
      </View></>
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
    calculation: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
      },
      total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2ecc71',
      },
      totalContainer:{
        flexDirection:'row',
        alignItems: 'flex-start',
        marginLeft:20,
        marginBottom: 20,
      },
  });

export default OneOrderScreen;
