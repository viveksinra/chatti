import React, { useState } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const Label = ({ text }) => {
  return <Text style={styles.textLabel}>{text}</Text>;
};

const OpScreen3 = ({selectedPaymentMethod, setSelectedPaymentMethod, upiId, setUpiId, accountNumber, setAccountNumber, accountHolderName, setAccountHolderName, ifsc, setIfsc}) => {
  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
    setUpiId('');
    setAccountNumber('');
    setAccountHolderName('');
    setIfsc('');
  };


  const renderInputFields = (newPaymentMethod) => {
    switch (newPaymentMethod) {
      case 'upi':
        return (
          <View style={styles.inputContainer}>
             <Label text="Enter UPI ID" />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setUpiId(text)}
              value={upiId}
              placeholder="Enter UPI ID"
            />
          </View>
        );
      case 'account':
        return (
          <View style={styles.inputContainer}>
            <Label text="Account Number" />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setAccountNumber(text)}
              value={accountNumber}
              placeholder="Enter Account Number"
            />
            <Label text="Account Holder Name" />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setAccountHolderName(text)}
              value={accountHolderName}
              placeholder="Enter Account Holder Name"
            />
            <Label text="IFSC Code" />
            <TextInput
              style={styles.textInput}
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
    paddingTop: 10,
    width:"98%"
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
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"green"
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom:10
  },

});

export default OpScreen3;
