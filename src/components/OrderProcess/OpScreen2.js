import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const OpScreen2 = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState({});
  const [flat, setFlat] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

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
        <MapView ref={mapRef} style={styles.map} onPress={onMapPress}>
          {location && <Marker coordinate={location} />}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button icon={<MaterialIcons name="my-location" size={24} color="white" />} title=" Get Current Location" onPress={getLocation} color="#841584" />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={[styles.input, styles.addressInput]} placeholder="Flat / House No. / Floor / Building" value={flat} onChangeText={text => setFlat(text)} />
          <TextInput style={[styles.input, styles.addressInput]} placeholder="Street Address" value={address.formattedAddress} onChangeText={text => setAddress({ ...address, formattedAddress: text })} />
          <TextInput style={[styles.input, styles.addressInput]} placeholder="District" value={address.city} onChangeText={text => setAddress({ ...address, city: text })} />
          <TextInput style={styles.input} placeholder="State" value={address.region} onChangeText={text => setAddress({ ...address, region: text })} />
          <TextInput style={styles.input} placeholder="Pincode" value={address.postalCode} onChangeText={text => setAddress({ ...address, postalCode: text })} />
        </View>
        {location && <Text style={styles.coordinates}>Lat: {location.latitude.toFixed(3)}, Long: {location.longitude.toFixed(3)}</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width - 32,
    height: 300, // Adjust this value as needed
  },
  buttonContainer: {
    marginVertical: 10,
  },
  inputContainer: {
    padding: 16,
    width: '100%',
    alignItems: 'center',
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
});

export default OpScreen2;
