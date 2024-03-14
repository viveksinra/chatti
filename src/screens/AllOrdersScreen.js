// AllOrdersScreen.js
import React, { useContext, useEffect, useState } from 'react';

import { FlatList, View, StyleSheet, ImageBackground } from 'react-native';
import OrderListItem from '../components/OrderHistoryItem/index';
import { useTranslation } from 'react-i18next';
import ContentContext from '../Context/ContentContext';
// import checkAndUpdateOrderHistory from '../utils/checkAndUpdateOrderHistory';
import GeneralLoading from '../components/General/GeneralLoading';

const image = { uri: ContentContext.orderHisBag };


const orders = [
  {
    product: {
      _id: "absd",
      productName: "Maize (G1 Quality)",
      quality: "High-Quality Grade 1 Maize",
      price: "1850",
      productImage: "https://m.media-amazon.com/images/I/61V1TTqTu6L._AC_UF1000,1000_QL80_.jpg"
    },
    weightInKg: "50",
    mobileNumber: "9846173905",
  }
];

const AllOrdersScreen = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const gods = t('gods');
  // const updateOrderHis = async () => {
  //   const allMsgId = Object.keys(messages);
  //   const localOrderCount = allMsgId.length;
  //   console.log({ localOrderCount });
  //   setLoading(true);

  //   if (localOrderCount <= 0) {
  //     await checkAndUpdateOrderHistory(
  //       messages,
  //       clearMessages,
  //       replaceMessagesInAsyncStorageAndContext
  //     );
  //   }

  //   setLoading(false);
  // };

   // Run the updateOrderHis function once when the component mounts
  // useEffect(() => {
  //   updateOrderHis();
  // }, []);

  if (orders.length === 0) {
    return <><NoOrderHistory />
      <GeneralLoading loading={loading} loadingText={'Updating Order History'} />
    
    </>;
  }

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    // Add more styles as needed
  },
});

export default AllOrdersScreen;
