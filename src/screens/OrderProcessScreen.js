import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import OpScreen1 from '../components/OrderProcess/OpScreen1';
import OpScreen2 from '../components/OrderProcess/OpScreen2';
import OpScreen3 from '../components/OrderProcess/OpScreen3';
import PaymentDetailsScreen from '../components/OrderProcess/OpScreen3';

const OrderProcessScreen = ({ route }) => {
  const { product } = route.params;
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    // Handle submission of form data
    alert('Form submitted successfully!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <OpScreen1  product={product}/>
        );
      case 2:
        return (
          <OpScreen2  product={product}/>

        );
      case 3:
        return (
          <PaymentDetailsScreen />
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
