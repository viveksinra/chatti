import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,Animated,ScrollView,  ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import Corn from '../components/Corn';

import ContentContext from '../Context/ContentContext';
const image = { uri: ContentContext.mainBg };
import { useNavigation } from '@react-navigation/native';
import TermPopup from '../authentication/authComponent/MobileLogin/TermPopup';
import ListProduct from '../components/Product/ListProduct';


const HomeScreens = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
 const [allProduct, setAllProduct] = useState([
  {_id:"absd",productName:"Maize (G1 Quality)", quality:"High-Quality Grade 1 Maize",price:"1850",productImage:"https://m.media-amazon.com/images/I/61V1TTqTu6L._AC_UF1000,1000_QL80_.jpg"},
  {_id:"bsd",productName:"Maize (G2 Quality)", quality:"Quality Grade 2 Maize",price:"1800",productImage:"https://seed2plant.in/cdn/shop/products/maizeseeds.jpg?v=1604034397"},
  {_id:"sd",productName:"Maize (G3 Quality)", quality:"Quality Grade 3 Maize",price:"1710",productImage:"https://5.imimg.com/data5/MU/QR/MY-12687905/best-quality-yellow-maize.jpg"},
 ])

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
