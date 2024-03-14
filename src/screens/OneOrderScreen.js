import React from 'react';
import { View, Text, Image } from 'react-native';

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

  return (
    <View>
      <Image source={{ uri: order.product.productImage }} style={{ width: 100, height: 100 }} />
      <Text>Product Name: {order.product.productName}</Text>
      <Text>Quality: {order.product.quality}</Text>
      <Text>Price per Kg.: ₹{order.product.price}</Text>
      <Text>Total Weight Ordered : {order.weightInKg} Kg</Text>
      <Text>Contact Number : {order.mobileNumber}</Text>
    </View>
  );
};

export default OneOrderScreen;
