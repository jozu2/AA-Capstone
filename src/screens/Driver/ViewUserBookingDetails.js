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
  const [filteredLength, setFilteredLength] = useState(null);
  const [filteredBookingData, setFilteredBookingData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(db, `POSTED_RIDES/${DriverPostID}/Request`);
        const snapshot = await get(dbRef);
        const requestData = snapshot.val();
        const requests = Object.keys(requestData).map((key) => ({
          id: key,
          ...requestData[key],
        }));

        const filteredRequests = requests.filter((request) => {
          return request.status.isAccepted;
        });

        setFilteredLength(filteredRequests.length);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);
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
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>DECLINE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (
                filteredLength <= bookingData.DriverData.Schedule.seatAvailable
              ) {
                const studentIsAcceptedRef = ref(
                  db,
                  `POSTED_RIDES/${DriverPostID}/Request/${userLocation.userInfo.userID}/status/isAccepted`
                );
                set(studentIsAcceptedRef, true);
                navigation.replace("ViewBooking");
              } else {
                alert("No Seat Available to Accept the User.");
                navigation.replace("ViewBooking");
              }
            }}
          >
            <Text>ACCEPT</Text>
          </TouchableOpacity>
        </View>
        <View>
          <MapView
            showsMyLocationButton={true}
            showsUserLocation={true}
            ref={mapRef}
            style={{
              flex: 1,
              paddingVertical: 245,
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
        <View style={{ alignSelf: "center", marginTop: 10 }}>
          <Text>PICK UP: {userLocation.rideInfo.description}</Text>
          <Text>
            DISTANCE: {`${userLocation.rideInfo.distance} Kilometers`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ViewUserBookingDetails;

const styles = StyleSheet.create({
  btn: {
    width: 170,
    height: 65,
    backgroundColor: "#fff",
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: "center",
    borderBottomColor: "#2e2e2e",
    borderLeftColor: "#2e2e2e",
    alignItems: "center",
    borderTopWidth: 0,
    borderRightColor: "#b3b3b3",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
