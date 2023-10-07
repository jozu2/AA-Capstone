import { View, Text, Pressable, Modal, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../../config";
import Swiper from "react-native-deck-swiper";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet } from "react-native";
import tw from "twrnc";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCardData } from "./../../redux/navSlice";
const CommuterHomePage = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCardData, setSelectedCardData] = useState(null);
  useEffect(() => {
    const dbRef = ref(db, "POSTED_RIDES");

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      if (data) {
        const dataArray = Object.values(data);
        setFetchedData(dataArray);
        setIsLoading(false);
      } else {
        console.log("No data found in the 'POSTED_RIDES' node.");
        setIsLoading(false);
      }
    });
  }, []);

  const swiperRef = useRef(null);
  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={[tw`flex-1`, { backgroundColor: "#ebebeb" }]}>
      <View style={[tw`shadow-lg`, styles.topBar]}>
        <EvilIcons
          style={{ position: "absolute", bottom: 25, left: 10 }}
          name={"navicon"}
          size={40}
          color={"#242424"}
          onPress={handleOpenDrawer}
        />

        <Text style={styles.mainTitle}>Angkas Atad</Text>
        <Text style={styles.title}>ride Along</Text>
      </View>
      <View style={[tw`shadow-md`, styles.MainCardContainerx]}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 1000,
            backgroundColor: "#f7f7f7",
          }}
        ></View>
        <View
          style={{
            width: 150,
            height: 15,
            backgroundColor: "#f7f7f7",
            position: "absolute",
            left: 70,
            top: 25,
          }}
        ></View>
        <View
          style={{
            width: 80,
            height: 15,
            backgroundColor: "#f7f7f7",
            position: "absolute",
            left: 70,
            top: 48,
          }}
        ></View>
        <View
          style={{
            width: "100%",
            height: 320,
            backgroundColor: "#f7f7f7",
            marginTop: 80,
          }}
        ></View>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btn}
          onPress={() => swiperRef.current.swipeLeft()}
        >
          <AntDesign name={"close"} size={40} color={"#db000f"} />
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => {
            dispatch(setCardData(selectedCardData));

            navigation.navigate("ModalViewCard");
          }}
        >
          <AntDesign name={"check"} size={40} color={"#04db00"} />
        </Pressable>
      </View>

      {isLoading ? (
        <Modal transparent={true} animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      ) : (
        <View>
          {fetchedData.length > 0 && (
            <Swiper
              cards={fetchedData}
              cardIndex={0}
              animateCardOpacity
              infinite={true}
              verticalSwipe={false}
              ref={swiperRef}
              onSwipedRight={() => {
                if (selectedCardData) {
                  dispatch(setCardData(selectedCardData));
                  navigation.navigate("ModalViewCard");
                }
              }}
              overlayLabels={{
                right: {
                  title: " View ",
                  style: {
                    label: {
                      marginTop: 100,
                      backgroundColor: "green",
                      textAlign: "left",
                      color: "white",
                      fontSize: 30,
                      paddingLeft: 20,
                    },
                  },
                },
                left: {
                  title: "X",
                  style: {
                    label: {
                      fontSize: 30,
                      paddingRight: 20,
                      marginTop: 100,
                      backgroundColor: "red",
                      textAlign: "right",
                      color: "#fff",
                    },
                  },
                },
              }}
              renderCard={(card) => (
                <View>
                  <View style={[tw`shadow-md`, styles.MainCardContainer]}>
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
                      </View>
                      <Text
                        style={{
                          fontWeight: "400",
                          alignSelf: "flex-start",
                          marginTop: 12,
                          fontSize: 13,
                          color: "gray",
                        }}
                      >
                        - Wants to share a ride
                      </Text>
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
                            >{`Origin`}</Text>
                            <Text
                              style={styles.textPlace}
                            >{`${card.coordinates.origin.location}`}</Text>
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
                            >{`Destination`}</Text>
                            <Text
                              style={styles.textPlace}
                            >{`${card.coordinates.destination.location}`}</Text>
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
                        >{`${card.Schedule.seatAvailable} / ${card.Schedule.seatAvailable}`}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            ></Swiper>
          )}
        </View>
      )}
    </View>
  );
};

{
  /* <View>{console.log(card.coordinates.destination.location)}</View> */
}
export default CommuterHomePage;
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
    marginTop: "30%",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 22,
  },
  MainCardContainerx: {
    marginTop: "40%",
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
