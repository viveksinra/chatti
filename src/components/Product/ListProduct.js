import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';

const ListProduct = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => alert('Product details clicked!')}>
      <View style={styles.imageContainer}>
        {/* Product Image */}
        <Image
          source={{ uri: "https://lh3.googleusercontent.com/proxy/AdiWhqUkeZWIA1JWpnWPN9T-DyDVeQ1JUBT0jqUq0Z1f8VV6A16o9C--OttwH-wI1WsquywyIVzk5KmeRUq5gQdEJ07SpRvzT2nM25yB8wHYbwOOAXMkttHXqpwVtBz0d30ToQCwB8Jy0dJpA8DkM1AzpyDnSBMeaooF" }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        {/* Product Information */}
        <Text style={styles.name}>Maize (G1 Quality)</Text>
        <Text style={styles.quality}>Quality: High-Quality Grade 1 Maize</Text>
        <Text style={styles.price}>Price: ₹1710</Text>
            {/* Add to Cart Button */}
            <Button title="Add" onPress={() => alert('Product added!')} />
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
