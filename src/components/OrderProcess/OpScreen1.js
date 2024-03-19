import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
const Label = ({ text }) => {
  return <Text style={styles.textLabel}>{text}</Text>;
};
const OpScreen1 = ({ product,weight, setWeight,mobileNumber, setMobileNumber }) => {


  const pricePerKg = product.price / 100;
  const totalAmount = (pricePerKg * parseFloat(weight)) || 0;
  const calculationText = weight ? `₹${pricePerKg.toFixed(2)} per kg x ${weight} kg` : '';

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.productImage }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.productName}</Text>
        {/* <Text style={styles.quality}>Quality: {product.quality}</Text> */}
        <Text style={styles.price}>Price: ₹{product.price}/Quintal ₹{pricePerKg.toFixed(2)}/kg</Text>
        {/* <Text style={styles.price}>Price per Kg: </Text> */}
        {weight && <View style={styles.totalContainer}>
      <Text style={styles.calculation}>{calculationText}</Text>
        <Text style={styles.total}>: ₹{totalAmount.toFixed(2)}</Text>
        </View>}
      </View>
     
    </View>
    <View style={styles.inputContainer}>
    <Label text="Mobile Number* (required)" />
        <TextInput
          style={styles.textInput}
          onChangeText={setMobileNumber}
          value={mobileNumber}
          placeholder="Enter Mobile Number"
          keyboardType="numeric"
          returnKeyType="done"
          blurOnSubmit={true}
        />
        <Label text="Weight in kg" />
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
    
   </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width:'98%'
  },

  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
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
    color: 'green',
    marginBottom: 5,
  },
  
  input: {
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '120%',
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
    padding: 36,
    width: '120%',
    paddingTop:5,
    paddingLeft:10,
    paddingRight:80
  },
    labelInputContainer:{
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
    width: '100%',
    marginBottom:10
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

    marginBottom: 1,
  },
});

export default OpScreen1;
