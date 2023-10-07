import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import {
  selectDestination,
  selectDestinationDescription,
  selectOrigin,
  selectOriginDescription,
  selectUserId,
  selectUserProfile,
  setDestination,
  setDestinationDescription,
  setOrigin,
  setOriginDescription,
} from "../../redux/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { db } from "./../../../config";
import { ref, set } from "firebase/database";

const DriverRideRegistration = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [when, setWhen] = useState(null);
  const [tod, setTod] = useState(null);
  const [seatAvail, setSeatAvail] = useState(null);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";

  const mapRef = useRef(null);

  const toggleDatePicker = () => {
    setShowPicker(true);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(true);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      setWhen(currentDate.toDateString());
      setShowPicker(false);
    } else {
      setShowPicker(false);
    }
  };

  const onChangeTime = ({ type }, selectedTime) => {
    if (type === "set") {
      const currentTime = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTod(currentTime);
      setShowTimePicker(false);
    } else {
      setShowTimePicker(false);
    }
  };
  const minimumTime = new Date();
  minimumTime.setHours(0, 0, 0, 0);
  ////////////////////////LOG/////////////////////////
  const origin = useSelector(selectOrigin);
  const originDesc = useSelector(selectOriginDescription);
  const destination = useSelector(selectDestination);
  const destinationDesc = useSelector(selectDestinationDescription);
  const userProfile = useSelector(selectUserProfile);
  const userID = useSelector(selectUserId);
  const handleSetRouteBtn = () => {
    if (origin && destination) {
      dispatch(setDestination(null));
      dispatch(setDestinationDescription(null));
      dispatch(setOrigin(null));
      dispatch(setOriginDescription(null));
      navigation.navigate("SetRouteModal");
    } else {
      navigation.navigate("SetRouteModal");
    }
  };
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const uniqueID = makeid(5);
  const handleShareBtn = () => {
    if (origin && destination && when && tod && seatAvail && userProfile) {
      set(ref(db, `POSTED_RIDES/${userID}${uniqueID}`), {
        coordinates: {
          origin: {
            latitude: origin.latitude,
            longitude: origin.longitude,
            location: originDesc,
          },
          destination: {
            latitude: destination.latitude,
            longitude: destination.longitude,
            location: destinationDesc,
          },
        },
        Schedule: {
          When: when,
          timeOfDeparture: tod,
          seatAvailable: seatAvail,
          occupiedSeat: 0,
        },
        driverProfile: {
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          email: userProfile.email,
          UID: userID,
          postID: uniqueID,
        },
      });

      dispatch(setDestination(null));
      dispatch(setDestinationDescription(null));
      dispatch(setOrigin(null));
      dispatch(setOriginDescription(null));
      navigation.goBack();
    } else {
      alert("Incomplete Information");
    }
  };
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled" // Add this prop
      >
        <View
          style={tw`flex flex-row pt-13  items-center pb-5 bg-white shadow-md

`}
        >
          <Ionicons
            name={"arrow-back"}
            color={"black"}
            size={40}
            style={tw`ml-2`}
            onPress={() => navigation.goBack()}
          />
          <Text style={tw`text-4xl ml-4 text-black font-medium`}>
            Post a Ride
          </Text>
        </View>

        <View style={tw`p-3 `}>
          <View>
            <View
              style={[
                tw`shadow-md`,
                {
                  backgroundColor: "#fff",
                  paddingVertical: 1,
                  borderRadius: 15,
                  paddingHorizontal: 18,
                  marginTop: "1%",
                  borderBottomColor: "#262626",
                  borderWidth: 1,
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftColor: "gray",
                },
              ]}
            >
              <View style={[tw`pt-3 pb-3`, { alignSelf: "flex-end" }]}>
                <Pressable
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "red",
                    width: "40%",
                    borderRadius: 5,
                    paddingVertical: 3,
                    paddingHorizontal: 10,
                  }}
                  onPress={handleShareBtn}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "600",
                      color: "#f5f5f5",
                    }}
                  >
                    Share Ride
                  </Text>

                  <Ionicons
                    name={"arrow-redo"}
                    color={"#f5f5f5"}
                    size={30}
                    style={tw`ml-2`}
                  />
                </Pressable>
              </View>
              <View>
                <Text style={styles.TextInputFieldx}>Schedule Date: </Text>
                {showPicker && (
                  <DateTimePicker
                    mode="date"
                    value={date}
                    onChange={onChange}
                    minimumDate={new Date()}
                    maximumDate={new Date("2025-1-1")}
                  />
                )}
                <View style={tw`flex flex-row items-center`}>
                  <TextInput
                    style={styles.txtbox}
                    value={when}
                    onChangeText={setWhen}
                    placeholder="Departure Date"
                    editable={false}
                  />
                  <MaterialCommunityIcons
                    onPress={toggleDatePicker}
                    name={"calendar-month"}
                    size={25}
                    color={"#121212"}
                    style={styles.icon}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.TextInputField}>Departure Time</Text>
                {showTimePicker && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={date}
                    timeZoneName={"Asia/Manila"}
                    onChange={onChangeTime}
                    minimumDate={new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />
                )}
                <View style={tw`flex flex-row`}>
                  <TextInput
                    value={tod}
                    style={styles.txtbox}
                    onChangeText={setTod}
                    placeholder="Departure Time"
                    editable={false}
                  />
                  <MaterialCommunityIcons
                    onPress={toggleTimePicker}
                    name={"clock-edit-outline"}
                    size={25}
                    color={"#121212"}
                    style={styles.icon}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.TextInputField}>
                  Vehicle Seating Capacity
                </Text>
                <TextInput
                  placeholder={"No. of Available Seat"}
                  value={seatAvail}
                  style={styles.txtbox}
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, "");
                    if (numericText.length > 0 && parseInt(numericText) !== 0) {
                      setSeatAvail(numericText);
                    } else {
                      setSeatAvail("");
                    }
                  }}
                  minimumLe
                  maxLength={1}
                  keyboardType="numeric"
                />
              </View>
              <View style={tw`mb-10`}>
                <Text style={styles.TextInputFieldt}>Course Destination</Text>
                <Pressable
                  onPress={handleSetRouteBtn}
                  style={styles.buttonSetCourse}
                >
                  {origin ? (
                    <Text style={styles.btntxt}>Edit Route </Text>
                  ) : (
                    <Text style={styles.btntxt}>Set Route </Text>
                  )}
                </Pressable>

                <View>
                  <MapView
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    ref={mapRef}
                    style={[
                      tw`flex-1 mt-2`,
                      {
                        paddingVertical: "38%",
                      },
                    ]}
                    region={{
                      latitude: 15.0794,
                      longitude: 120.62,
                      latitudeDelta: 0.45,
                      longitudeDelta: 0.45,
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
      </ScrollView>
    </View>
  );
};

export default DriverRideRegistration;

const styles = StyleSheet.create({
  googleAutoStyle: {
    container: {
      left: "5%",
      top: "65%",
      position: "absolute",
      zIndex: 100,
      flex: 0,
      width: "90%",
      paddingVertical: 20,
    },
    textInput: {
      width: 200,
      fontSize: 18,
    },
  },
  TextInputField: {
    paddingTop: 10,
    fontSize: 15,
    fontWeight: "600",
  },
  TextInputFieldx: {
    paddingTop: 10,
    fontSize: 15,
    fontWeight: "600",
  },
  TextInputFieldt: {
    paddingTop: 15,
    fontSize: 15,
    fontWeight: "600",
  },
  txtbox: {
    width: "100%",
    paddingVertical: 5,
    borderRadius: 7,
    textAlign: "center",
    fontSize: 17,
    borderWidth: 1,
    borderBottomColor: "#121212",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: "#5c5c5c",
  },
  icon: {
    position: "absolute",
    right: "5%",
    bottom: "10%",
  },
  buttonSetCourse: {
    backgroundColor: "red",
    width: "40%",
    paddingVertical: 7,
    borderRadius: 30,
    position: "absolute",
    bottom: "5%",
    zIndex: 1000,
    alignSelf: "center",
    textAlign: "center",
  },
  btntxt: {
    alignSelf: "center",
    fontSize: 19,
    fontWeight: "500",
    color: "#fff",
  },
  modalBox: {
    display: "flex",
    width: "96%",
    height: 650,
    alignSelf: "center",
    borderRadius: 8,
    position: "absolute",
    zIndex: 300,
    bottom: 100,
    backgroundColor: "blue",
  },
  modalBoxMainContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 400,
    alignSelf: "center",
    width: 400,
    height: 1000,
    bottom: -10,
  },
});
