import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import OpScreen1 from '../components/OrderProcess/OpScreen1';
import OpScreen2 from '../components/OrderProcess/OpScreen2';
import OpScreen3 from '../components/OrderProcess/OpScreen3';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { startUrl } from '../Context/ContentContext';
import { useNavigation } from '@react-navigation/native';


const OrderProcessScreen = ({ route }) => {
  const { product } = route.params;
  const [currentStep, setCurrentStep] = useState(1);
// order step 1 == order details
  const [weight, setWeight] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
// order step 2 == address
const [location, setLocation] = useState(null);
const [address, setAddress] = useState({});
const [flat, setFlat] = useState("");
// Order step 3 == Payment method selection
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({label:"",id:""});
const [upiId, setUpiId] = useState('');
const [accountNumber, setAccountNumber] = useState('');
const [accountHolderName, setAccountHolderName] = useState('');
const [ifsc, setIfsc] = useState('');
const navigation = useNavigation();


  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const SaveOrderFunction = async () => {
    try {
      let url = `${startUrl}/chattiApi/allCommon/order/saveOrder`;
      // Retrieve the token from SecureStore
      let token = await SecureStore.getItemAsync('authToken');
      // Set the Authorization header for the request
      const response = await axios.post(
        url,
        {product,weight, mobileNumber, location, address, flat, selectedPaymentMethod,  upiId, setUpiId, accountNumber,  accountHolderName,  ifsc,  },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      let myRes = response.data;
      if (myRes.variant === 'success') {
        ToastAndroid.show(myRes.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('some error occurred ', ToastAndroid.SHORT);
      console.log('Some error occurred while sending or setting the message' + error);
    }
  };
  const handleFinish = async() => {
    // Handle submission of form data
    await SaveOrderFunction()
    alert('Ordered successfully!');
    navigation.navigate('AllOrdersScreen');

  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <OpScreen1  
          product={product}
          weight={weight}
          setWeight={setWeight}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          />
        );
      case 2:
        return (
          <OpScreen2  
          product={product}
          location={location}
          setLocation={setLocation}
          address={address}
          setAddress={setAddress}
          flat={flat}
          setFlat={setFlat}
          />

        );
      case 3:
        return (
          <OpScreen3
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          upiId={upiId}
          setUpiId={setUpiId}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          accountHolderName={accountHolderName}
          setAccountHolderName={setAccountHolderName}
          ifsc={ifsc}
          setIfsc={setIfsc}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepperContainer}>
        <TouchableOpacity onPress={() => setCurrentStep(1)}>
          <Text style={[styles.stepText, currentStep === 1 && styles.activeStepText]}>1</Text>
          <Text style={[styles.stepLabel, currentStep === 1 && styles.activeStepLabel]}>Order Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentStep(2)}>
          <Text style={[styles.stepText, currentStep === 2 && styles.activeStepText]}>2</Text>
          <Text style={[styles.stepLabel, currentStep === 2 && styles.activeStepLabel]}>Address Selector</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentStep(3)}>
          <Text style={[styles.stepText, currentStep === 3 && styles.activeStepText]}>3</Text>
          <Text style={[styles.stepLabel, currentStep === 3 && styles.activeStepLabel]}>Payment Details</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderStepContent()}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
       
            <TouchableOpacity style={currentStep === 1 ? styles.disabledButton : styles.button}  
            disabled={currentStep === 1} 
            onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          
          {currentStep !== 3 ? (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleFinish}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  activeStepText: {
    color: 'yellowgreen',
  },
  stepLabel: {
    fontSize: 12,
    color: 'gray',
  },
  activeStepLabel: {
    color: 'yellowgreen',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'yellowgreen',
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'yellow',
  },
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderProcessScreen;
