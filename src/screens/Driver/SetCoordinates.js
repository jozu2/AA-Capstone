import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";

const SetCoordinates = () => {
  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [centerLocation, setCenterLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const onRegionChange = (region) => {
    setCenterLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        ref={mapRef}
        style={{
          flex: 1,
          zIndex: -2,
        }}
        region={{
          latitude: 15.0794,
          longitude: 120.62,
          latitudeDelta: 0.45,
          longitudeDelta: 0.45,
        }}
        onRegionChange={onRegionChange}
      >
        {/* <MapViewDirections
          origin={{
            latitude: cardData.coordinates.origin.latitude,
            longitude: cardData.coordinates.origin.longitude,
          }}
          destination={{
            latitude: cardData.coordinates.destination.latitude,
            longitude: cardData.coordinates.destination.longitude,
          }}
          identifier="destination"
          apikey={API_KEY}
          strokeWidth={2}
          strokeColor="red"
          timePrecision="now"
          optimizeWaypoints={true}
          onReady={(result) => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                top: 100,
                right: 10,
                bottom: 0,
                left: 10,
              },
            });
          }}
        /> */}
      </MapView>
    </View>
  );
};

export default SetCoordinates;

const styles = StyleSheet.create({});
