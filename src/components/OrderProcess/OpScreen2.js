import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const Label = ({ text }) => {
  return <Text style={styles.textLabel}>{text}</Text>;
};

const OpScreen2 = ({location, setLocation,address, setAddress,flat, setFlat}) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(true);

  const mapRef = useRef(null);

  // useEffect(() => {
  //   getLocation();
  // }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setPermissionGranted(false);
      return;
    }

    setPermissionGranted(true);
    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);
    setAddress(address[0]);
    setLocation(location.coords);
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const onMapPress = async (e) => {
    let location = e.nativeEvent.coordinate;
    let address = await Location.reverseGeocodeAsync(location);
    setAddress(address[0]);
    setLocation(location);
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {permissionGranted ? (
          <>
            {/* <MapView ref={mapRef} style={styles.map} onPress={onMapPress}>
              {location && <Marker coordinate={location} />}
            </MapView>
            <View style={styles.buttonContainer}>
              <Button icon={<MaterialIcons name="my-location" size={24} color="white" />} title=" Get Current Location" onPress={getLocation} color="#841584" />
            </View> */}
        <Text style={styles.address}>Enter the Pickup Address (not Required)</Text>

            <View style={styles.inputContainer}>

          <Label text="Flat / House No. / Floor / Building" />
              <TextInput style={[styles.input, styles.addressInput]} placeholder="Flat / House No. / Floor / Building" value={flat} onChangeText={text => setFlat(text)} />
            <Label text="Street Address" />             
              <TextInput style={[styles.input, styles.addressInput]} placeholder="Street Address" value={address.formattedAddress} onChangeText={text => setAddress({ ...address, formattedAddress: text })} />
             <Label text="District" />            
              <TextInput style={[styles.input, styles.addressInput]} placeholder="District" value={address.city} onChangeText={text => setAddress({ ...address, city: text })} />
             <Label text="State" />             
              <TextInput style={styles.input} placeholder="State" value={address.region} onChangeText={text => setAddress({ ...address, region: text })} />
               <Label text="Pincode" />
             <TextInput style={styles.input} placeholder="Pincode" value={address.postalCode} onChangeText={text => setAddress({ ...address, postalCode: text })} />
            </View>
            {location && <Text style={styles.coordinates}>Lat: {location.latitude.toFixed(3)}, Long: {location.longitude.toFixed(3)}</Text>}
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width:"98%"
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
  map: {
    width: Dimensions.get('window').width - 32,
    height: 300, // Adjust this value as needed
  },
  buttonContainer: {
    marginVertical: 10,
  },
  inputContainer: {
    padding: 46,
    width: '120%',
    paddingTop: 5,

  },
  input: {
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
  },
  addressInput: {
    maxWidth: 300,
  },
  coordinates: {
    padding: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default OpScreen2;
