import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const ListProduct = ({product}) => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  function sendToOrderProcess() {
    navigation.navigate('OrderProcessScreen', { product: product });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={() => sendToOrderProcess()}>
      <View style={styles.imageContainer}>
        {/* Product Image */}
        <Image
          source={{ uri: product.productImage }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        {/* Product Information */}
        <Text style={styles.name}>{ (t('LanguageCode') === "en-IN" )? product.productName : product.productNameHindi}</Text>
        <Text style={styles.quality}>{t('product.one')} { (t('LanguageCode') === "en-IN" )? product.quality : product.qualityHindi}</Text>
        <Text style={styles.price}>{t('product.two')}{product.price}</Text>
            {/* Add to Cart Button */}
            <Pressable style={styles.addButton} onPress={() => sendToOrderProcess()}>
      <Text style={styles.buttonText}>{t('product.three')}</Text>
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
    borderRadius: 8,
    marginTop:'20px'
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
