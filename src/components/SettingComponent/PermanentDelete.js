import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, Text, ToastAndroid, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { useTranslation } from 'react-i18next';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../context/appContext';
import axios from 'axios';
import { startUrl } from '../../Context/ContentContext';

const PermanentDelete = ({ mobileNumber }) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState();
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();
  const { setIsSignedIn } = useContext(AppContext);

  const sendOTP = async () => {
    console.log("otp  sent to " + mobileNumber)
    try {
      const response = await axios.post(`${startUrl}/chattiApi/allCommon/userAuth/sendOtp`, {
        mobileNo: mobileNumber,
      });
      // Handle the response, e.g., show a message to the user
      console.log(response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error(error);
    }
  };
  const DeleteAccountApi = async () => {

    try {
      let url = `${startUrl}/chattiApi/allCommon/deleteProfile/withOtp`;
      // Retrieve the token from SecureStore
      let token = await SecureStore.getItemAsync('authToken');
      // Set the Authorization header for the request
      const response = await axios.post(
        url,
        { mobileNumber, otp},
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

  const showDialog = () => {
    sendOTP()
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleConfirm = async() => {
    console.log("here deletee api")

    setOtp(otp);
    setDialogVisible(false);
    DeleteAccountApi()
    await SecureStore.deleteItemAsync('authToken');
      setIsSignedIn(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Warning",
      "This action is very dangerous and will permanently delete your account. Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: showDialog
        }
      ]
    );
  };

  return (
    <View  style={styles.buttonView}>
      <Text style={styles.buttonText}>Very dangerous, Non Reversible </Text>
      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <View style={styles.buttonContent}>
          <View style={styles.buttonIconContainer}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </View>
          <Text style={styles.buttonText}>Permanent Delete Account</Text>
        </View>
      </TouchableOpacity>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Enter OTP</Dialog.Title>
        <Dialog.Description>
          An OTP has been sent to your mobile number. Please enter it here.
        </Dialog.Description>
        <Dialog.Input onChangeText={setOtp} keyboardType="numeric"/>
        <Dialog.Button label="Cancel" onPress={handleCancel} color="green" />
  <Dialog.Button label="Delete Account" onPress={handleConfirm} color="red" />
      </Dialog.Container>
    </View>
  );
};

export default PermanentDelete;

const styles = {
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "red",
    marginTop:"2%"
  },
  buttonView: {

    marginTop:"10%"
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIconContainer: {
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'red',
  },
};
