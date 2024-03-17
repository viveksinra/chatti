import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,Animated,ScrollView,  ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import Corn from '../components/Corn';

import ContentContext, { startUrl } from '../Context/ContentContext';
const image = { uri: ContentContext.mainBg };
import { useNavigation } from '@react-navigation/native';
import TermPopup from '../authentication/authComponent/MobileLogin/TermPopup';
import ListProduct from '../components/Product/ListProduct';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const HomeScreens = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
 const [allProduct, setAllProduct] = useState([
  {_id:"absd",productName:"Test (Server Error)", quality:"High-Quality Grade 1 Maize",price:"9950",productImage:"https://static.doofinder.com/main-files/uploads/2019/09/error-500-doofinder.jpg"},
  {_id:"bsd",productName:"Test (Server Error)", quality:"Quality Grade 2 Maize",price:"9600",productImage:"https://static.doofinder.com/main-files/uploads/2019/09/error-500-doofinder.jpg"},
  {_id:"sd",productName:"Test (Server Error)", quality:"Quality Grade 3 Maize",price:"9510",productImage:"https://static.doofinder.com/main-files/uploads/2019/09/error-500-doofinder.jpg"},
 ])

 const getProduct = async () => {
  const url = `${startUrl}/chattiApi/allCommon/product/getProductForPublic`;

  // Retrieve the authorization token from SecureStore
  const token = await SecureStore.getItemAsync('authToken');

  try {
    // Make an API call to get the chat count from the server
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    if (response.data.variant === "success") {
      const responseData = response.data; // Assuming products is the array you want
      setAllProduct(responseData.data);
    } else {
      alert("Failed to Connect to server, check your internet connection");
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
    alert("Failed to fetch product data");
  }
};

useEffect(() => {
  getProduct();
}, []);


  return (
<ScrollView>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ImageBackground source={image} style={styles.image}>
    <Corn />
   

    <Text style={styles.headerText}>
    {t('secMain.one')}
        <Text style={{ color: '#34d399', fontWeight: 'bold' }}>
    {t('secMain.two')}
          </Text>
    {t('secMain.three')}
         </Text>
{allProduct.map(product => (
  <ListProduct key={product._id} product={product}/>
))}



<TermPopup /> 

  </ImageBackground>
</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerText: {
    color: '#00BFFF',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});

export default HomeScreens;
