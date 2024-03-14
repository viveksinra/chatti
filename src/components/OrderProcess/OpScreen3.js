import React, { useState } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const Label = ({ text }) => {
  return <Text style={styles.label}>{text}</Text>;
};

const PaymentDetailsScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: '',
    accountHolderName: '',
    ifscCode: '',
  });

  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
    setAccountDetails({ // Clear account details on method change
      accountNumber: '',
      accountHolderName: '',
      ifscCode: '',
    });
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
            {accountDetails.accountNumber && <Label text="Account Number" />}
            <TextInput
              style={styles.input}
              onChangeText={text => setAccountDetails({ ...accountDetails, accountNumber: text })}
              value={accountDetails.accountNumber}
              placeholder="Enter Account Number"
            />
            {accountDetails.accountHolderName && <Label text="Account Holder Name" />}
            <TextInput
              style={styles.input}
              onChangeText={text => setAccountDetails({ ...accountDetails, accountHolderName: text })}
              value={accountDetails.accountHolderName}
              placeholder="Enter Account Holder Name"
            />
            {accountDetails.ifscCode && <Label text="IFSC Code" />}
            <TextInput
              style={styles.input}
              onChangeText={text => setAccountDetails({ ...accountDetails, ifscCode: text })}
              value={accountDetails.ifscCode}
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
        <TouchableOpacity style={selectedPaymentMethod === 'cash' ? styles.radioButtonSelected : styles.radioButton} onPress={() => handlePaymentMethodSelection('cash')}>
          <Text style={styles.radioText}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedPaymentMethod === 'upi' ? styles.radioButtonSelected : styles.radioButton} onPress={() => handlePaymentMethodSelection('upi')}>
          <Text style={styles.radioText}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedPaymentMethod === 'account' ? styles.radioButtonSelected : styles.radioButton} onPress={() => handlePaymentMethodSelection('account')}>
          <Text style={styles.radioText}>Bank Account</Text>
        </TouchableOpacity>
      </View>

      {selectedPaymentMethod && renderInputFields(selectedPaymentMethod)}

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
