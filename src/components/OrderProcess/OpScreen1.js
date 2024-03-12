import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';

const OpScreen1 = ({ product }) => {
  const [weight, setWeight] = useState('');
  const pricePerKg = product.price / 100;
  const totalAmount = (pricePerKg * parseFloat(weight)) || 0;
  const calculationText = weight ? `₹${pricePerKg.toFixed(2)} per kg x ${weight} kg` : '';

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.productImage }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.productName}</Text>
        <Text style={styles.quality}>Quality: {product.quality}</Text>
        <Text style={styles.price}>Price per Quintal: ₹{product.price}</Text>
        <Text style={styles.price}>Price per Kg: ₹{pricePerKg.toFixed(2)}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Enter weight in kg"
          keyboardType="numeric"
          returnKeyType="done"
          blurOnSubmit={true}
        />
        <Text style={styles.calculation}>{calculationText}</Text>
        <Text style={styles.total}>Total Amount: ₹{totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quality: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
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
});

export default OpScreen1;
