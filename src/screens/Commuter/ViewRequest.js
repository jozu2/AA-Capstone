import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet } from "react-native";
import tw from "twrnc";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { selectSavedRequest } from "../../redux/navSlice";
import { ScrollView } from "react-native-gesture-handler";
const ViewRequest = () => {
  const dataRequests = useSelector(selectSavedRequest);
  const mapRef = useRef(null);
  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";
  const [selectedCardData, setSelectedCardData] = useState(null);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      {dataRequests.map((card, index) => {
        return (
          <View key={index}>
            <View>
              <View style={[styles.MainCardContainer]}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
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
                    <View style={{}}>
                      <Text>Status</Text>
                    </View>
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
                        >{`Pick Up Location`}</Text>
                        <Text
                          style={styles.textPlace}
                        >{`${card.coordinates.origin.location}`}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* ////////////////////////////////////////////////////////////// */}

                <View>
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
                    ></Marker>

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
                    ></Marker>

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
                      strokeColor="red"
                      timePrecision="now"
                      optimizeWaypoints={true}
                      onReady={(result) => {
                        setSelectedCardData(card);

                        const distance = result.distance || 0; // Distance is in meters
                        // Now you can use the `distance` variable to display the distance as needed.
                        // console.log(`Total Distance: ${distance} meters`);

                        // You can also convert the distance to other units, such as kilometers or miles, if needed.
                        const distanceInKilometers = distance / 1000; // Correct conversion to kilometers
                        // console.log(
                        //   `Total Distance: ${distanceInKilometers} kilometers`
                        // );
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
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
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
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
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
    borderWidth: 1,
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 22,
  },
  MainCardContainerx: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 22,
    height: 520,
    width: "90%",
    alignSelf: "center",
    position: "absolute",
  },
  profileNameText: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  email: {
    lineHeight: 12,
    fontSize: 12,
    fontWeight: "300",
    flexDirection: "column",
  },
  textbot: {},
  containerTextBott: {
    marginTop: 7,
    paddingHorizontal: 5,
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
