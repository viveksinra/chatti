import React, { useState } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const Label = ({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
};

const PaymentDetailsScreen = ({selectedPaymentMethod, setSelectedPaymentMethod, upiId, setUpiId, accountNumber, setAccountNumber, accountHolderName, setAccountHolderName, ifsc, setIfsc}) => {
  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
    setUpiId('');
    setAccountNumber('');
    setAccountHolderName('');
    setIfsc('');
  };

  const handlePayment = () => {
    // Implement payment logic based on selected method
    console.log('Payment initiated:', selectedPaymentMethod);
  };

  const renderInputFields = (paymentMethod) => {
    switch (paymentMethod) {
      case 'upi':
        return (
          <View style={styles.inputContainer}>
            {upiId && <Label text="Enter UPI ID" />}
            <TextInput
              style={styles.input}
              onChangeText={text => setUpiId(text)}
              value={upiId}
              placeholder="Enter UPI ID"
            />
          </View>
        );
      case 'account':
        return (
          <View style={styles.inputContainer}>
            {accountNumber && <Label text="Account Number" />}
            <TextInput
              style={styles.input}
              onChangeText={text => setAccountNumber(text)}
              value={accountNumber}
              placeholder="Enter Account Number"
            />
            {accountHolderName && <Label text="Account Holder Name" />}
            <TextInput
              style={styles.input}
              onChangeText={text => setAccountHolderName(text)}
              value={accountHolderName}
              placeholder="Enter Account Holder Name"
            />
            {ifsc && <Label text="IFSC Code" />}
            <TextInput
              style={styles.input}
              onChangeText={text => setIfsc(text )}
              value={ifsc}
              placeholder="Enter IFSC Code"
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method:</Text>
      <View style={styles.radioButtonContainer}>
        <TouchableOpacity style={selectedPaymentMethod.id === 'cash' ? styles.radioButtonSelected : styles.radioButton} onPress={() => handlePaymentMethodSelection({label:"Cash",id:"cash"})}>
          <Text style={styles.radioText}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedPaymentMethod.id === 'upi' ? styles.radioButtonSelected : styles.radioButton} onPress={() => handlePaymentMethodSelection({label:"Upi",id:"upi"})}>
          <Text style={styles.radioText}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedPaymentMethod.id === 'account' ? styles.radioButtonSelected : styles.radioButton} onPress={() => handlePaymentMethodSelection({label:"Account",id:"account"})}>
          <Text style={styles.radioText}>Bank Account</Text>
        </TouchableOpacity>
      </View>

      {selectedPaymentMethod && renderInputFields(selectedPaymentMethod.id)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  radioButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  radioButtonSelected: {
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  radioText: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20, // Add horizontal padding for consistent spacing
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8, // Adjust vertical padding for better appearance
    marginBottom: 10,
    flexGrow: 1, // Allow the input field to expand to fill the available space
  },
});

export default PaymentDetailsScreen;
