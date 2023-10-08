import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRideInfo, setRideInfo } from "../../redux/navSlice";
import Entypo from "react-native-vector-icons/Entypo";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapViewDirections from "react-native-maps-directions";
const RideStart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";

  const mapRef = useRef(null);
  const cardData = useSelector(selectRideInfo);
  const [acceptedRide, setAcceptedRide] = useState(null);
  const handleEndRideBtn = async () => {
    navigation.navigate("RideSuccess");
  };

  const [userLocation, setUserLocation] = useState({});
  const [showUserStroke, setshowUserStroke] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    if (cardData) {
      const requestArray = Object.values(cardData.rideData.Request);
      const acceptedRides = requestArray.filter(
        (item) => item.status.isAccepted
      );
      setAcceptedRide(acceptedRides);
    }
  }, []);
  const markerColors = ["orange", "purple", "red", "blue", "green"];

  return (
    <View style={{ flex: 1 }}>
      <View style={[tw`shadow-lg`, styles.topBar]}>
        <EvilIcons
          style={{ position: "absolute", bottom: 30, left: 15 }}
          name={"navicon"}
          size={40}
          color={"#242424"}
          onPress={() => navigation.openDrawer()}
        />
        <Image
          source={require("./../../assets/Icon.png")}
          style={{ width: 60, height: 60, alignSelf: "center" }}
        />
      </View>
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: cardData.rideData.coordinates.origin.latitude,
          longitude: cardData.rideData.coordinates.origin.longitude,
          latitudeDelta: 0.12,
          longitudeDelta: 0.12,
        }}
      >
        <MapViewDirections
          origin={{
            latitude: cardData.rideData.coordinates.origin.latitude,
            longitude: cardData.rideData.coordinates.origin.longitude,
          }}
          destination={{
            latitude: cardData.rideData.coordinates.destination.latitude,
            longitude: cardData.rideData.coordinates.destination.longitude,
          }}
          identifier="destination"
          apikey={API_KEY}
          strokeWidth={4}
          strokeColor="red"
          timePrecision="now"
          optimizeWaypoints={true}
          onReady={(result) => {
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

        {showUserStroke && (
          <MapViewDirections
            origin={{
              latitude: cardData.rideData.coordinates.origin.latitude,
              longitude: cardData.rideData.coordinates.origin.longitude,
            }}
            destination={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            identifier="User Location"
            apikey={API_KEY}
            strokeWidth={6}
            strokeColor="green"
            optimizeWaypoints={true}
            onReady={(result) => {
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

        <Marker
          style={{ width: 200, height: 200 }}
          coordinate={{
            latitude: cardData.rideData.coordinates.origin.latitude,
            longitude: cardData.rideData.coordinates.origin.longitude,
          }}
          title="Origin"
          description={cardData.rideData.coordinates.origin.location}
          identifier="origin"
          pinColor={"green"}
        />
        <Marker
          style={{ width: 200, height: 200 }}
          coordinate={{
            latitude: cardData.rideData.coordinates.destination.latitude,
            longitude: cardData.rideData.coordinates.destination.longitude,
          }}
          title="destination"
          description={cardData.rideData.coordinates.destination.location}
          identifier="destination"
          pinColor={"red"}
        />
        {acceptedRide &&
          acceptedRide.map((item, index) => (
            <Marker
              key={index}
              style={{ width: 200, height: 200 }}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.userInfo.userName}
              description={item.rideInfo.description}
              identifier="origin"
              pinColor={markerColors[index % markerColors.length]}
            />
          ))}
      </MapView>
      <View style={{ position: "absolute", top: 200, right: 15 }}>
        <TouchableOpacity onPress={handleEndRideBtn}>
          <Text
            style={{
              paddingHorizontal: 16,
              borderWidth: 1,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: "yellow",
            }}
          >
            End Ride
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ position: "absolute", top: 270, right: 25 }}>
        <Entypo name="chat" size={50} color={"black"} />
      </View>
      <View
        style={{
          position: "absolute",
          top: 320,
          right: 25,
        }}
      >
        {acceptedRide &&
          acceptedRide.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: 55,
                height: 55,
                borderRadius: 1000,
                borderColor: markerColors[index % markerColors.length],
                borderWidth: 2,
                backgroundColor: "#ebebeb",
                marginTop: 20,
              }}
              onPress={() => {
                setUserLocation({
                  latitude: item.latitude,
                  longitude: item.longitude,
                });
                setshowUserStroke(true);
                setShowUserInfo(true);
              }}
            ></TouchableOpacity>
          ))}
      </View>

      {showUserInfo &&
        acceptedRide.map((item, index) => (
          <Pressable
            key={index}
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              bottom: 0,
              top: 0,
              right: 0,
              left: 0,
              flex: 1,
            }}
            onPress={() => {
              setShowUserInfo(false);
            }}
          >
            <View
              key={index}
              style={{
                backgroundColor: "#fff",
                position: "absolute",
                bottom: 10,
                alignSelf: "center",
                borderRadius: 13,
                width: "96%",
                height: 130,
              }}
            >
              <View
                style={{
                  width: 140,
                  height: 140,
                  backgroundColor: "#ebebeb",
                  borderRadius: 100,
                  borderWidth: 1,
                  top: -70,
                  left: 20,
                }}
              ></View>
              <View>
                <Text
                  style={{
                    backgroundColor: "red",
                    backgroundColor: "red",
                    alignSelf: "center",
                    top: -70,
                    left: 20,
                  }}
                >
                  {item.userInfo.userName}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
    </View>
  );
};

export default RideStart;

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#fff",
    width: "100%",
    position: "absolute",
    zIndex: 20000,
    paddingTop: "10%",
    paddingBottom: "5%",
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: "#b5b5b5",
  },
});
