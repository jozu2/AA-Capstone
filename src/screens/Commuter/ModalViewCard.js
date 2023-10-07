import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import {
  selectUserId,
  selectUserProfile,
  selectedCardData,
} from "../../redux/navSlice";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { get, ref, set } from "firebase/database";
import { db } from "../../../config";
const ModalViewCard = () => {
  const cardData = useSelector(selectedCardData);
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";
  const [centerLocation, setCenterLocation] = useState({
    latitude: 15.0794,
    longitude: 120.62,
  });
  const [numberOfPassenger, setNumberOfPassenger] = useState("");
  const [rideInfo, setRideInfo] = useState({
    duration: "",
    distance: "",
    description: "",
  });
  const [isSet, setIsSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const onRegionChange = (region) => {
    if (numberOfPassenger === "") return;
    if (!isSet) {
      setCenterLocation({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const resultDuration = Math.floor(rideInfo.duration);
  const integerPartx = Math.floor(rideInfo.distance);
  const decimalPartx = rideInfo.distance - integerPartx;
  const flooredDecimalPartx = Math.floor(decimalPartx * 10) / 10;
  const resultDistancex = integerPartx + flooredDecimalPartx;
  const originalTime = "06:54 AM";
  const parsedTime = new Date(`2023-10-04 ${originalTime}`);
  parsedTime.setMinutes(parsedTime.getMinutes() + 17);

  const userProfile = useSelector(selectUserProfile);
  const userID = useSelector(selectUserId);
  const userName = `${userProfile?.firstName} ${userProfile?.lastName}`;
  const handleRequestRide = () => {
    if (cardData && userProfile && centerLocation) {
      set(
        ref(
          db,
          `POSTED_RIDES/${cardData.driverProfile.UID}${cardData.driverProfile.postID}/Request/${userID}`
        ),
        {
          latitude: centerLocation.latitude,
          longitude: centerLocation.longitude,
          rideInfo: rideInfo,
          userInfo: {
            userName: userName,
            userID: userID,
          },
          status: {
            isAccepted: false,
            isDOne: false,
          },
        }
      );

      alert("Request Successful");
    } else {
      alert("Incomplete Information");
    }

    if (cardData && userProfile && centerLocation) {
      set(ref(db, `REQUEST_RIDES/${userID}`), {
        latitude: centerLocation.latitude,
        longitude: centerLocation.longitude,
        rideInfo: rideInfo,
        userInfo: {
          userName: userName,
          userID: userID,
        },
        status: {
          isAccepted: false,
          isDOne: false,
        },
      });
    } else {
      alert("Incomplete Information");
    }
    navigation.replace("UserNavHome");
  };
  const [filteredLength, setFilteredLength] = useState(null);

  const DriverPostID = `${cardData.driverProfile.UID}${cardData.driverProfile.postID}`;
  useEffect(() => {
    async function fetchData() {
      try {
        const dbRef = ref(db, `POSTED_RIDES/${DriverPostID}/Request`);
        const snapshot = await get(dbRef);
        const requestData = snapshot.val();
        if (!requestData) return;
        const requests = Object.keys(requestData).map((key) => ({
          id: key,
          ...requestData[key],
        }));

        const filteredRequests = requests.filter((request) => {
          return request.status.isAccepted;
        });
        const seat = cardData.Schedule.seatAvailable;
        const availSeat = seat - filteredRequests.length;
        setFilteredLength(availSeat);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {isSet && (
        <View
          style={{
            flex: 1,
            alignSelf: "center",
            padding: 20,
            top: 30,
            zIndex: 40,
            position: "absolute",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 10,
              borderWidth: 1,
              marginTop: 20,
            }}
          >
            <Text>{`Pickup Location: ${rideInfo.description}`}</Text>
            <Text>{`Estimated Time of Arrival ${resultDuration} minutes`}</Text>
            <Text>{`Distance: ${resultDistancex} km`}</Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={handleRequestRide}
              style={{
                width: 220,
                alignSelf: "center",
                borderRadius: 10,
                marginTop: 10,
                backgroundColor: "#fff",
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  paddingVertical: 15,
                }}
              >
                REQUEST RIDE ALONG
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Pressable
        style={{
          position: "absolute",
          bottom: 25,
          zIndex: 20,
          backgroundColor: "#fff",
          paddingVertical: 20,
          paddingHorizontal: 30,
          alignSelf: "center",
          borderRadius: 10,
          borderWidth: 1,
        }}
        onPress={() => {
          if (numberOfPassenger === "") {
            alert("Please fill up the field");
          }
          if (numberOfPassenger <= filteredLength) {
            setIsSet(true);
          } else {
            alert(`Sorry... current seat Available ${filteredLength}`);
          }
        }}
      >
        <Text style={{ fontSize: 18 }}>
          {isSet ? "Cancel" : "SET PICKUP LOCATION MARK"}
        </Text>
      </Pressable>
      <View style={{ flex: 1 }}>
        {!isSet && (
          <View>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              Passenger Count
            </Text>
            <TextInput
              placeholder={"No. of Available Seat"}
              value={numberOfPassenger}
              style={{
                width: "100%",
                color: "green",
                borderRadius: 7,
                textAlign: "center",
                fontSize: 17,
                borderWidth: 1,
                borderBottomColor: "#121212",
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
              }}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                if (numericText.length > 0 && parseInt(numericText) !== 0) {
                  setNumberOfPassenger(numericText);
                } else {
                  setNumberOfPassenger("");
                }
              }}
              minimumLe
              maxLength={1}
              keyboardType="numeric"
            />
          </View>
        )}

        <MapView
          showsMyLocationButton={true}
          showsUserLocation={true}
          ref={mapRef}
          style={{
            flex: 1,
            zIndex: -2,
          }}
          region={{
            latitude: cardData.coordinates.origin.latitude,
            longitude: cardData.coordinates.origin.longitude,
            latitudeDelta: 0.21,
            longitudeDelta: 0.21,
          }}
          onRegionChange={onRegionChange}
        >
          <Marker
            style={{ width: 200, height: 200 }}
            coordinate={{
              latitude: cardData.coordinates.origin.latitude,
              longitude: cardData.coordinates.origin.longitude,
            }}
            title="Origin"
            description={cardData.coordinates.origin.location}
            identifier="origin"
            pinColor="green"
          ></Marker>
          <Marker
            style={{ width: 200, height: 200 }}
            coordinate={{
              latitude: cardData.coordinates.destination.latitude,
              longitude: cardData.coordinates.destination.longitude,
            }}
            title="Destination"
            description={cardData.coordinates.destination.location}
            identifier="destination"
            pinColor="red"
          ></Marker>
          {!isLoading && numberOfPassenger !== "" && (
            <Marker
              style={{ width: 200, height: 200 }}
              coordinate={{
                latitude: centerLocation.latitude,
                longitude: centerLocation.longitude,
              }}
              title="Pickup"
              pinColor="blue"
            ></Marker>
          )}

          <MapViewDirections
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

          {isSet && (
            <MapViewDirections
              origin={{
                latitude: cardData.coordinates.origin.latitude,
                longitude: cardData.coordinates.origin.longitude,
              }}
              destination={{
                latitude: centerLocation.latitude,
                longitude: centerLocation.longitude,
              }}
              apikey={API_KEY}
              strokeWidth={4}
              strokeColor="green"
              timePrecision="now"
              optimizeWaypoints={true}
              onReady={(result) => {
                const distance = result.distance || 0;
                const duration = result.duration || 0;
                const description = result.legs[0].end_address;
                setRideInfo({
                  duration: duration,
                  distance: distance,
                  description: description,
                });

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
          )}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default ModalViewCard;
