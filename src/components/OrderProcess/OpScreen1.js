import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const OpScreen1 = ({ product }) => {
  const [weight, setWeight] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const pricePerKg = product.price / 100;
  const totalAmount = (pricePerKg * parseFloat(weight)) || 0;
  const calculationText = weight ? `₹${pricePerKg.toFixed(2)} per kg x ${weight} kg` : '';

  return (
    <>
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
      </View>
     
    </View>
    <View style={styles.inputContainer}>
      <View style={styles.labelInputContainer}>
        <Text style={styles.textLabel}>Weight in kg:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setWeight}
          value={weight}
          placeholder="Enter weight in kg"
          keyboardType="numeric"
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>
      {weight && <View style={styles.totalContainer}>
      <Text style={styles.calculation}>{calculationText}</Text>
        <Text style={styles.total}>: ₹{totalAmount.toFixed(2)}</Text>
        </View>}
      <View style={styles.labelInputContainer}>
        <Text style={styles.textLabel}>Mobile Number:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setMobileNumber}
          value={mobileNumber}
          placeholder="Enter Mobile Number"
          keyboardType="numeric"
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </View>
    
    </View>
    
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  
  label: {
    fontSize: 16,
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
  button: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 10,
  
  },
    labelInputContainer:{
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '65%',
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

    marginBottom: 20,
  },
});

export default OpScreen1;
