import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRef } from "react";
import {
  selectUserLocationBooked,
  selectViewBookings,
} from "../../redux/navSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import tw from "twrnc";
import { db } from "../../../config";
import { get, ref, set } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";

const ViewUserBookingDetails = () => {
  const bookingData = useSelector(selectViewBookings);
  const mapRef = useRef(null);
  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";
  const navigation = useNavigation();
  const userLocation = useSelector(selectUserLocationBooked);
  const driverCoordinates = bookingData.DriverData.coordinates;
  const DriverPostID = `${bookingData.DriverData.driverProfile.UID}${bookingData.DriverData.driverProfile.postID}`;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={[
          tw`shadow-md`,
          {
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
            height:"90%",
       
            
          },
        ]}
      >
       
        <View>
          <MapView
            showsMyLocationButton={true}
            showsUserLocation={true}
            ref={mapRef}
            style={{
              flex: 1,
              paddingVertical:"50%",
              
              zIndex: -2,
            
            }}
            region={{
              latitude: driverCoordinates.origin.latitude,
              longitude: driverCoordinates.origin.longitude,
              latitudeDelta: 0.21,
              longitudeDelta: 0.21,
            }}
          >
            <Marker
              style={{ width: 200, height: 200 }}
              coordinate={{
                latitude: driverCoordinates.origin.latitude,
                longitude: driverCoordinates.origin.longitude,
              }}
              title="Origin"
              description={driverCoordinates.origin.location}
              identifier="origin"
              pinColor="green"
            ></Marker>
            <Marker
              style={{ width: 200, height: 200 }}
              coordinate={{
                latitude: driverCoordinates.destination.latitude,
                longitude: driverCoordinates.destination.longitude,
              }}
              title="destination"
              description={driverCoordinates.destination.location}
              identifier="destination"
              pinColor="red"
            ></Marker>
            <Marker
              style={{ width: 200, height: 200 }}
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="User Pickup"
              identifier="User Pickup"
              pinColor="blue"
            ></Marker>
            <MapViewDirections
              origin={{
                latitude: driverCoordinates.origin.latitude,
                longitude: driverCoordinates.origin.longitude,
              }}
              destination={{
                latitude: driverCoordinates.destination.latitude,
                longitude: driverCoordinates.destination.longitude,
              }}
              identifier="destination"
              apikey={API_KEY}
              strokeWidth={2}
              strokeColor="red"
            />
            <MapViewDirections
              origin={{
                latitude: driverCoordinates.origin.latitude,
                longitude: driverCoordinates.origin.longitude,
              }}
              destination={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              identifier="destination"
              apikey={API_KEY}
              strokeWidth={5}
              strokeColor="blue"
              timePrecision="now"
              optimizeWaypoints={true}
              onReady={(result) => {
                // const distance = result.distance || 0;

                // const distanceInKilometers = distance / 1000;
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    top: 30,
                    right: 10,
                    bottom: 0,
                    left: 10,
                  },
                });
              }}
            />
          </MapView>
        </View>
        <View style={{ height:"20%", width:"100%", alignSelf: "center", marginTop: 20 }}>
          <Text style={styles.txtinfo1}>
            PICK UP: 
            <Text style={{color:"black"}}> {userLocation.rideInfo.description}</Text>
            </Text>
          <Text style={styles.txtinfo} >
            DISTANCE:
             <Text style={{color:"black" }}> {`${userLocation.rideInfo.distance} Kilometers`}</Text>
          </Text>
          <Text style={styles.txtinfo} >
            No. of PASSENGER:
            <Text style={{color:"black"}}> {`${userLocation.rideInfo.passengerCount} `}</Text>
          </Text>
        </View>
        <View
          style={{
            width:"100%",
            height:"15%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems:"center",
            alignSelf: "center",
            marginTop:5,
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{color:"red", fontSize:14, fontWeight:600,}}>DECLINE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              const availSeat =
                bookingData.DriverData.Schedule.seatAvailable -
                bookingData.DriverData.Schedule.occupiedSeat;

              if (availSeat >= userLocation.rideInfo.passengerCount) {
                const studentIsAcceptedRef = ref(
                  db,
                  `POSTED_RIDES/${DriverPostID}/Request/${userLocation.userInfo.userID}/status/isAccepted`
                );
                set(studentIsAcceptedRef, true);

                const sumOfPassengerSeatOccupied =
                  parseInt(bookingData.DriverData.Schedule.occupiedSeat) +
                  parseInt(userLocation.rideInfo.passengerCount);

                const addOccupiedSeat = ref(
                  db,
                  `POSTED_RIDES/${DriverPostID}/Schedule/occupiedSeat`
                );
                set(addOccupiedSeat, sumOfPassengerSeatOccupied);

                navigation.replace("DriverHomePage");
              } else {
                alert("error: beyond Maximum Passenger Reached");
                navigation.replace("ViewBooking");
              }
            }}
          >
            <Text style={{color:"green", fontSize:14, fontWeight:600,}}>ACCEPT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewUserBookingDetails;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"auto",
paddingHorizontal:15,
    shadowColor: "gray",
    shadowOffset: {
        width: 0,
        height: 2,
                  },
    shadowOpacity: 0.11,
    shadowRadius: 3.84,
    elevation: 3
  },
  txtinfo: {
    height:"20%",
    fontSize:13,
    fontWeight:'bold',
    marginTop:5,
    color:"green"
  },
  txtinfo1: {
    height:"45%",
    fontSize:13,
    fontWeight:'bold',
    marginTop:5,
    color:"green"
  },
});
