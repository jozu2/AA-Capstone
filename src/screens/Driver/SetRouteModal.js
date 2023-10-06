import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useBackHandler } from "@react-native-community/hooks";

import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import {
  selectDestination,
  selectDestinationDescription,
  selectOrigin,
  selectOriginDescription,
  setDestination,
  setDestinationDescription,
  setOrigin,
  setOriginDescription,
} from "../../redux/navSlice";
import MapViewDirections from "react-native-maps-directions";
const SetRouteModal = () => {
  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const googlePlaceAutoCompleteRefOrigin = useRef(null);
  const googlePlaceAutoCompleteRefDestination = useRef(null);
  const origin = useSelector(selectOrigin);
  const originDesc = useSelector(selectOriginDescription);
  const destination = useSelector(selectDestination);
  const destinationDesc = useSelector(selectDestinationDescription);
  const [showTip, setShowTip] = useState(true);
  function backActionHandler() {
    handleGoBackBtn();

    return true;
  }
  useBackHandler(backActionHandler);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  handleGoBackBtn = () => {
    dispatch(setDestination(null));
    dispatch(setDestinationDescription(null));
    dispatch(setOrigin(null));
    dispatch(setOriginDescription(null));
    navigation.goBack();
  };
  handleDoneBtn = () => {
    if (origin && destination) {
      navigation.goBack();
    } else {
      alert("Please Fill out the Fields");
    }
  };
  return (
    <View>
      <View
        style={tw`flex flex-row pt-13  items-center pb-5 bg-white shadow-md`}
      >
        <Ionicons
          name={"arrow-back"}
          color={"black"}
          size={40}
          style={tw`ml-2`}
          onPress={handleGoBackBtn}
        />
        <Text style={tw`text-4xl ml-4 text-black font-medium`}>Set Route</Text>
      </View>
      <View style={[tw`shadow-md`, styles.container]}>
        <View style={[tw`pt-2 pr-2`, { alignSelf: "flex-end" }]}>
          <Pressable onPress={handleDoneBtn} style={styles.btnDone}>
            <Text style={styles.btntxt}>Done</Text>
            <Ionicons
              name={"checkmark"}
              color={"#f5f5f5"}
              size={30}
              style={tw`ml-2`}
            />
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Origin:
          </Text>
          <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              renderRightButton={() =>
                googlePlaceAutoCompleteRefOrigin.current?.getAddressText() ? (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => {
                      googlePlaceAutoCompleteRefOrigin.current?.setAddressText(
                        ""
                      );
                    }}
                  >
                    <Ionicons
                      name={"close-outline"}
                      color={"#121212"}
                      size={35}
                      style={{ paddingLeft: "3%" }}
                    />
                  </TouchableOpacity>
                ) : null
              }
              ref={googlePlaceAutoCompleteRefOrigin}
              styles={styles.googleAutoStyle}
              query={{
                key: API_KEY,
                language: "en",
                components: "country:ph",
              }}
              placeholder="    Input Origin "
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
              minLength={2}
              enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                dispatch(
                  setOrigin({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  })
                );
                dispatch(setOriginDescription(data.description));
              }}
              fetchDetails={true}
              returnKeyType={"search"}
            />
          </View>
          <View>
            <Text
              style={{
                position: "absolute",
                top: 70,
                fontSize: 17,
                fontWeight: "600",
              }}
            >
              Destination:
            </Text>

            <View
              style={{
                width: "100%",
                backgroundColor: "red",
                marginTop: 100,
                flex: 1,
              }}
            >
              <GooglePlacesAutocomplete
                renderRightButton={() =>
                  googlePlaceAutoCompleteRefDestination.current?.getAddressText() ? (
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => {
                        googlePlaceAutoCompleteRefDestination.current?.setAddressText(
                          ""
                        );
                      }}
                    >
                      <Ionicons
                        name={"close-outline"}
                        color={"#121212"}
                        size={35}
                        style={{ paddingLeft: "3%" }}
                      />
                    </TouchableOpacity>
                  ) : null
                }
                ref={googlePlaceAutoCompleteRefDestination}
                styles={styles.googleAutoStyle}
                query={{
                  key: API_KEY,
                  language: "en",
                  components: "country:ph",
                }}
                placeholder="   Input Destination Place"
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                minLength={2}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                  dispatch(
                    setDestination({
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                    })
                  );
                  dispatch(setDestinationDescription(data.description));
                }}
                fetchDetails={true}
                returnKeyType={"search"}
              />
            </View>
            <View>
              {showTip && (
                <Text
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: 86,
                    color: "green",
                    fontWeight: "400",
                    zIndex: -1,

                    width: "90%",
                  }}
                >
                  *Tip: You can drag and drop the marker after inputting your
                  desired location
                </Text>
              )}
              <MapView
                showsMyLocationButton={true}
                showsUserLocation={true}
                ref={mapRef}
                style={{
                  paddingVertical: 180,
                  zIndex: -2,
                  marginTop: "20%",
                }}
                region={{
                  latitude: 15.0794,
                  longitude: 120.62,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.314,
                }}
              >
                {origin && (
                  <Marker
                    style={{ width: 200, height: 200 }}
                    coordinate={{
                      latitude: origin.latitude,
                      longitude: origin.longitude,
                    }}
                    title="Origin"
                    description={originDesc}
                    identifier="origin"
                    draggable
                    onDragEnd={async (e) => {
                      const newCoordinate = e.nativeEvent.coordinate;
                      dispatch(setOrigin(newCoordinate));
                    }}
                  ></Marker>
                )}
                {destination && (
                  <Marker
                    style={{ width: 200, height: 200 }}
                    coordinate={{
                      latitude: destination.latitude,
                      longitude: destination.longitude,
                    }}
                    title="Destination"
                    description={destinationDesc}
                    identifier="destination"
                    pinColor="green"
                    draggable
                    onDragEnd={async (e) => {
                      const newCoord = e.nativeEvent.coordinate;
                      dispatch(setDestination(newCoord));
                    }}
                  ></Marker>
                )}

                {origin && destination && (
                  <MapViewDirections
                    origin={{
                      latitude: origin.latitude,
                      longitude: origin.longitude,
                    }}
                    destination={{
                      latitude: destination.latitude,
                      longitude: destination.longitude,
                    }}
                    identifier="destination"
                    apikey={API_KEY}
                    strokeWidth={4}
                    strokeColor="red"
                    optimizeWaypoints={true}
                    onReady={(result) => {
                      mapRef.current.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                          top: 50,
                          right: 50,
                          bottom: 50,
                          left: 50,
                        },
                      });
                    }}
                  />
                )}
              </MapView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SetRouteModal;
const styles = StyleSheet.create({
  googleAutoStyle: {
    container: {
      top: "65%",
      position: "absolute",
      zIndex: 10000,
      flex: 0,
      alignSelf: "center",
      width: "99%",
      borderWidth: 1,
      marginTop: 5,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
    },
    textInput: {
      width: 200,
      fontSize: 18,
    },
  },
  container: {
    padding: 10,
    backgroundColor: "#fff",
    width: "96%",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 20,
    borderBottomColor: "#262626",
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftColor: "gray",
  },
  btnDone: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    width: "40%",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  btntxt: {
    alignSelf: "center",
    fontSize: 19,
    fontWeight: "500",
    color: "#fff",
  },
});
