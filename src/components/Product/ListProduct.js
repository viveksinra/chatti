import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Pressable } from 'react-native';

const ListProduct = ({product}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => alert('Product details clicked!')}>
      <View style={styles.imageContainer}>
        {/* Product Image */}
        <Image
          source={{ uri: product.productImage }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        {/* Product Information */}
        <Text style={styles.name}>{product.productName}</Text>
        <Text style={styles.quality}>Quality: {product.quality}</Text>
        <Text style={styles.price}>Price: ₹{product.price}</Text>
            {/* Add to Cart Button */}
            <Pressable style={styles.addButton} onPress={() => alert('Product added!')}>
      <Text style={styles.buttonText}>Add</Text>
    </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'green',
    borderRadius: 8
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
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
  },
});

export default ListProduct;
