import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, Image } from "react-native";

import tw from "twrnc";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { selectSavedRequest, selectUserId } from "../../redux/navSlice";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const ViewRequest = () => {
  const fetchedData = useSelector(selectSavedRequest);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";
  const [requestData, setRequestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [indexCard, setIndexCard] = useState(null);
  const handleOpenDrawer = () => {
    navigation.navigate("CommuterHomePage");
  };

  const userID = useSelector(selectUserId);
  useEffect(() => {
    const requestId = userID;
    const requestData = fetchedData.find((item) => item.Request[requestId]);

    if (requestData) {
      const requestObject = requestData.Request[requestId];
      setRequestData(requestObject);
    } else {
    }
  }, []);

  console.log("fetchedData:", fetchedData);
  console.log("userID:", userID);
  return (
    <View style={{ flex: 1, paddingTop: 120 }}>
      <View
        style={[
          {
            alignSelf: "center",
            width: "60%",
            borderRadius: 10,
            position: "absolute",
            bottom: 10,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-evenly",
            paddingVertical: 15,
          }}
        >
          <MaterialIcons
            name="notifications-none"
            size={40}
            color={"#01ccdd"}
            style={{
              backgroundColor: "transparent",
              paddingTop: 4,
            }}
          />
          <TouchableOpacity>
            <MaterialIcons
              name="list-alt"
              size={35}
              color={"#ecca2d"}
              style={{
                backgroundColor: "gray",
                padding: 7,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        colors={["#15b99e", "#081e30"]}
        style={[tw`shadow-lg`, styles.topBar]}
      >
        <MaterialCommunityIcons
          style={{ position: "absolute", bottom: 25, left: 10 }}
          name={"arrow-left"}
          size={40}
          color={"#fff"}
          onPress={handleOpenDrawer}
        />
        <Image
          source={require("./../../assets/IconC.png")}
          style={{ width: 60, height: 60, alignSelf: "center" }}
        />
        <View style={{ position: "absolute", right: -20, bottom: 25 }}></View>
      </LinearGradient>
      <ScrollView style={{ flex: 1, backgroundColor: "#2e3b45", padding: 10 }}>
        {fetchedData.map((card, index) => {
          return (
            <View key={index}>
              <View>
                <View style={[tw`shadow-lg`, styles.MainCardContainer]}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#0a2133",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      paddingVertical: 8,
                      paddingHorizontal: 17,
                    }}
                  >
                    <View style={styles.profilePic}></View>
                    <View
                      style={{
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={styles.profileNameText}
                      >{`${card.driverProfile.firstName} ${card.driverProfile.lastName} `}</Text>
                      <Text style={styles.email}>Posted: 3h ago</Text>
                    </View>
                  </View>

                  {/* ////////////////////////////////////////////// */}
                  <View style={styles.containerTextBott}>
                    <View
                      style={[
                        tw`flex flex-row`,
                        {
                          justifyContent: "flex-start",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <View
                        style={{ justifyContent: "center", paddingRight: 10 }}
                      >
                        <Octicons color={"green"} size={25} name={"dash"} />
                      </View>
                      <View>
                        <View>
                          <Text
                            style={styles.textPlaceTitle}
                          >{`Pickup Location`}</Text>
                          <Text
                            style={styles.textPlace}
                          >{`${requestData?.rideInfo.description}`}</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={[
                        tw`flex flex-row`,
                        {
                          justifyContent: "flex-start",
                          alignItems: "center",
                          marginTop: 2,
                        },
                      ]}
                    >
                      <View
                        style={{ justifyContent: "center", paddingRight: 10 }}
                      >
                        <Octicons color={"red"} size={25} name={"dash"} />
                      </View>
                      <View>
                        <View>
                          <Text
                            style={styles.textPlaceTitle}
                          >{`Drop Off`}</Text>
                          <Text
                            style={styles.textPlace}
                          >{`${card?.coordinates.destination.location}`}</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        tw`flex flex-row`,
                        {
                          justifyContent: "flex-start",
                          alignItems: "center",
                          marginTop: 2,
                        },
                      ]}
                    >
                      <View
                        style={{ justifyContent: "center", paddingRight: 10 }}
                      >
                        <Octicons color={"red"} size={25} name={"dash"} />
                      </View>
                      <View>
                        <View>
                          <Text
                            style={styles.textPlaceTitle}
                          >{`Passenger`}</Text>
                          <Text
                            style={[styles.textPlace, { paddingLeft: 15 }]}
                          >{`${requestData?.rideInfo.passengerCount}`}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* ////////////////////////////////////////////////////////////// */}

                  <View style={{ paddingHorizontal: 12 }}>
                    {showModal && indexCard === index && (
                      <MapView
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        ref={mapRef}
                        style={{
                          paddingVertical: 160,
                          zIndex: -2,
                          top: 13,
                        }}
                        region={{
                          latitude: 15.0794,
                          longitude: 120.62,
                          latitudeDelta: 0.21,
                          longitudeDelta: 0.21,
                        }}
                      >
                        {requestData && (
                          <Marker
                            style={{ width: 200, height: 200 }}
                            coordinate={{
                              latitude: requestData?.latitude,
                              longitude: requestData?.longitude,
                            }}
                            title="pickup"
                            description={requestData?.rideInfo.location}
                            identifier="pick Up"
                          >
                            <Image
                              source={require("./../../assets/userPickUp.png")}
                              style={{
                                width: 55,
                                height: 55,
                                alignSelf: "center",
                                position: "absolute",
                                bottom: 0,
                              }}
                            />
                          </Marker>
                        )}
                        <Marker
                          style={{ width: 200, height: 200 }}
                          coordinate={{
                            latitude: card.coordinates.origin.latitude,
                            longitude: card.coordinates.origin.longitude,
                          }}
                          title="Origin"
                          description={card.coordinates.origin.location}
                          identifier="origin"
                          pinColor="green"
                        >
                          <Image
                            source={require("./../../assets/iconOrigin.png")}
                            style={{
                              width: 55,
                              height: 55,
                              alignSelf: "center",
                              position: "absolute",
                              bottom: 0,
                            }}
                          />
                        </Marker>

                        <Marker
                          style={{ width: 200, height: 200 }}
                          coordinate={{
                            latitude: card.coordinates.destination.latitude,
                            longitude: card.coordinates.destination.longitude,
                          }}
                          title="Destination"
                          description={card.coordinates.destination.location}
                          identifier="destination"
                          pinColor="red"
                        >
                          <Image
                            source={require("./../../assets/iconDestination.png")}
                            style={{
                              width: 55,
                              height: 55,
                              alignSelf: "center",
                              position: "absolute",
                              bottom: 0,
                            }}
                          />
                        </Marker>

                        <MapViewDirections
                          origin={{
                            latitude: card.coordinates.origin.latitude,
                            longitude: card.coordinates.origin.longitude,
                          }}
                          destination={{
                            latitude: card.coordinates.destination.latitude,
                            longitude: card.coordinates.destination.longitude,
                          }}
                          identifier="destination"
                          apikey={API_KEY}
                          strokeWidth={4}
                          strokeColor="#ee005c"
                          timePrecision="now"
                          optimizeWaypoints={true}
                          onReady={(result) => {
                            setIndexCard(index);

                            mapRef.current.fitToCoordinates(
                              result.coordinates,
                              {
                                edgePadding: {
                                  top: 30,
                                  right: 10,
                                  bottom: 0,
                                  left: 10,
                                },
                              }
                            );
                          }}
                        />
                      </MapView>
                    )}
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{
                        height: 1,
                        width: "25%",
                        backgroundColor: "#121212",
                      }}
                    ></View>
                    <Text style={{ paddingHorizontal: 20, fontSize: 16 }}>
                      Schedule
                    </Text>
                    <View
                      style={{
                        height: 1,
                        width: "25%",
                        backgroundColor: "#121212",
                      }}
                    ></View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                  >
                    <View>
                      <View style={styles.flexRow}>
                        <MaterialCommunityIcons
                          name={"calendar-month"}
                          size={23}
                          color={"#474747"}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "300",
                            paddingLeft: 5,
                          }}
                        >
                          {card.Schedule.When}
                        </Text>
                      </View>
                      <View style={styles.flexRow}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "300",
                            paddingLeft: 65,
                            lineHeight: 15,
                          }}
                        >
                          {`${card.Schedule.timeOfDeparture}`}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "300",
                          paddingRight: 20,
                          paddingTop: 6,
                          color: "#636363",
                        }}
                      >{`${card.Schedule.occupiedSeat} / ${card.Schedule.seatAvailable}`}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingVertical: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setIndexCard(index);

                        setShowModal(true);
                      }}
                      style={{ alignSelf: "center" }}
                    >
                      {indexCard === index && showModal ? (
                        <TouchableOpacity
                          onPress={() => {
                            setShowModal(false);
                          }}
                        >
                          <Image
                            source={require("./../../assets/arrow.gif")}
                            style={{
                              width: 55,
                              height: 20,
                              transform: [{ scaleY: -1 }],
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <Image
                          source={require("./../../assets/arrow.gif")}
                          style={{
                            width: 55,
                            height: 20,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View style={{ height: 150 }}></View>
      </ScrollView>
    </View>
  );
};

export default ViewRequest;

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#fff",
    width: "100%",
    position: "absolute",
    zIndex: 20000,
    paddingTop: "10%",
    paddingBottom: "5%",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: "#b5b5b5",
  },
  mainTitle: {
    fontSize: 35,
    alignSelf: "center",
    fontWeight: "700",
  },
  title: {
    fontSize: 14,
    position: "absolute",
    bottom: "25%",
    right: "22%",
  },
  profilePic: {
    backgroundColor: "gray",
    width: 50,
    height: 50,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "red",
  },
  MainCardContainer: {
    marginTop: "5%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    marginBottom: "20%",
    marginTop: "15%",
    borderBottomWidth: 6,
    borderLeftWidth: 1,

    borderBottomColor: "#ee005c",
    borderLeftColor: "#ecca2d",
  },

  profileNameText: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: "#ee005c",
  },
  email: {
    lineHeight: 12,
    fontSize: 12,
    fontWeight: "300",
    flexDirection: "column",
    color: "#ebebeb",
  },
  containerTextBott: {
    marginTop: 7,
    paddingHorizontal: 22,
    paddingVertical: 5,
  },
  textPlaceTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#363636",
  },
  textPlace: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    width: "35%",
    height: 65,
    backgroundColor: "#fff",
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: "center",
    borderBottomColor: "#2e2e2e",
    borderLeftColor: "#2e2e2e",
    alignItems: "center",
    borderTopWidth: 0,
    borderRightColor: "#b3b3b3",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    zIndex: 5500,
  },
});
