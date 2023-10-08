import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "./../../../config";
import { ref, remove, onValue } from "firebase/database";
import {
  selectUserId,
  setRideInfo,
  setViewBookings,
} from "../../redux/navSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Alert, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
const DriverHomePage = () => {
  const navigation = useNavigation();
  const userID = useSelector(selectUserId);
  const [fetchedData, setFetchedData] = useState(null);
  const mapRef = useRef(null);
  const API_KEY = "AIzaSyCU46T5I3BvJF3_uQHta5XGih_xljGYt-I";
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      // Your data fetching logic here
      const dbRef = ref(db, "POSTED_RIDES");

      onValue(dbRef, (snapshot) => {
        const requestData = snapshot.val();

        if (!requestData) {
          return;
        }

        const requests = Object.keys(requestData).map((key) => ({
          id: key,
          ...requestData[key],
        }));

        const filteredRequests = requests.filter((request) => {
          return request.driverProfile.UID === userID;
        });

        if (filteredRequests.length > 0) {
          setFetchedData(filteredRequests);
        } else {
          console.log("No matching data found.");
        }

        setRefreshing(false);
      });
    } catch (error) {
      console.error("Error:", error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleScroll = (event) => {
    // Detect if the user has scrolled up beyond a certain threshold (e.g., 100)
    if (event.nativeEvent.contentOffset.y < -100) {
      // Trigger the refresh action
      handleRefresh();
    }
  };

  const handleCloseBtn = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this Posted Ride?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const updatedData = fetchedData.filter((data) => data.id !== id);
            setFetchedData(updatedData);
            const dbRef = ref(db, `POSTED_RIDES/${id}`);
            remove(dbRef)
              .then(() => {
                console.log("Data removed successfully");
              })
              .catch((error) => {
                console.error("Error removing data:", error);
              });
          },
        },
      ]
    );
  };
  const handleCreateButton = () => {
    navigation.navigate("DriverRideRegistration");
  };
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
        <View style={{ position: "absolute", right: -10, bottom: 30 }}>
          <TouchableOpacity onPress={handleCreateButton}>
            <Text
              style={{
                borderRadius: 20,
                textAlign: "center",
                paddingHorizontal: 10,
                borderWidth: 1,
                alignSelf: "flex-end",
                marginRight: 30,
                fontSize: 20,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={[tw`mt-18`, styles.cardContainer]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View>
          {fetchedData && (
            <View>
              {fetchedData.map((data) => {
                return (
                  <View key={data.id} style={styles.cardBox}>
                    <View>
                      <View style={styles.detailsContainer}>
                        <View style={[styles.IconChat]}>
                          <TouchableOpacity
                          style={{width:40}}
                            onPress={() => {
                              if (data) {
                                dispatch(
                                  setViewBookings({
                                    Request: data.Request,
                                    DriverData: data,
                                  })
                                );
                                navigation.navigate("UserAccepted");
                              } else {
                                dispatch(
                                  setViewBookings({
                                    Request: "",
                                    DriverData: "",
                                  })
                                );
                                navigation.navigate("UserAccepted");
                              }
                            }}
                          >
                            <AntDesign
                              name="user"
                              color={"black"}
                              size={35}
                            />
                            <Text
                              style={{ paddingLeft: 5 }}
                            >{`${data.Schedule.occupiedSeat}/${data.Schedule.seatAvailable}`}</Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{ position: "absolute", top: 23, right: 20 }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              handleCloseBtn(
                                `${data.driverProfile.UID}${data.driverProfile.postID}`
                              );
                            }}
                          >
                            <EvilIcons
                              name="close"
                              color={"#323232"}
                              size={35}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.txtContentFirst}>- Schedule -</Text>
                        <View style={{ alignItems: "center" }}>
                          <Text style={styles.txtContent}>
                            {data.Schedule.When}
                          </Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                          <Text style={styles.txtContentTwo}>
                            {data.Schedule.timeOfDeparture}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.mapContainer}>
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
                          latitude: data.coordinates.destination.latitude,
                          longitude: data.coordinates.destination.longitude,
                          latitudeDelta: 0.21,
                          longitudeDelta: 0.21,
                        }}
                        scrollEnabled={false}
                      >
                        {data.coordinates.origin.longitude && (
                          <Marker
                            style={{ width: 200, height: 200 }}
                            coordinate={{
                              latitude: data.coordinates.origin.latitude,
                              longitude: data.coordinates.origin.longitude,
                            }}
                            title="Origin"
                            description={data.coordinates.origin.location}
                            identifier="origin"
                            pinColor="red"
                          ></Marker>
                        )}

                        {data.coordinates.destination.latitude && (
                          <Marker
                            style={{ width: 200, height: 200 }}
                            coordinate={{
                              latitude: data.coordinates.destination.latitude,
                              longitude: data.coordinates.destination.longitude,
                            }}
                            title="Destination"
                            description={data.coordinates.destination.location}
                            identifier="destination"
                            pinColor="green"
                          ></Marker>
                        )}

                        <MapViewDirections
                          origin={{
                            latitude: data.coordinates.origin.latitude,
                            longitude: data.coordinates.origin.longitude,
                          }}
                          destination={{
                            latitude: data.coordinates.destination.latitude,
                            longitude: data.coordinates.destination.longitude,
                          }}
                          identifier="destination"
                          apikey={API_KEY}
                          strokeWidth={4}
                          strokeColor="red"
                          optimizeWaypoints={true}
                          onReady={(result) => {
                            mapRef.current.fitToCoordinates(
                              result.coordinates,
                              {
                                edgePadding: {
                                  top: 10,
                                  right: 10,
                                  bottom: 10,
                                  left: 10,
                                },
                              }
                            );
                          }}
                        />
                      </MapView>
                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.txtContentx}>
                          {data.coordinates.destination.location}
                        </Text>
                        <Text style={styles.txtContentFirstx}>Destination</Text>
                      </View>
                      <View style={styles.BtnContainer}>
                        <Pressable
                          style={styles.Btnview}
                          onPress={() => {
                            if (data) {
                              dispatch(
                                setViewBookings({
                                  Request: data.Request,
                                  DriverData: data,
                                })
                              );

                              navigation.navigate("ViewBooking");
                            } else {
                              dispatch(
                                setViewBookings({
                                  Request: "",
                                  DriverData: "",
                                })
                              );
                              navigation.navigate("ViewBooking");
                            }
                          }}
                        >
                          <MaterialCommunityIcons
                            name="book-open-outline"
                            color={"blue"}
                            size={30}
                            style={styles.bookingBtn}
                          />
                          {data.notif.showRedDot == true && (
                            <Entypo
                              name="dot-single"
                              color={"red"}
                              size={45}
                              style={{
                                position: "absolute",
                                top: -2,
                                alignSelf: "flex-end",
                                right: 18,
                              }}
                            />
                          )}
                        </Pressable>
                        <Pressable
                          style={styles.Btn}
                          onPress={async () => {
                            await AsyncStorage.setItem(
                              "StartRideInfo",
                              JSON.stringify(data)
                            );
                            await AsyncStorage.setItem(
                              "isRideStarted",
                              JSON.stringify(true)
                            );

                            if (data) {
                              try {
                                const rideData = await AsyncStorage.getItem(
                                  "StartRideInfo"
                                );

                                const rideStarted = await AsyncStorage.getItem(
                                  "isRideStarted"
                                );

                                dispatch(
                                  setRideInfo({
                                    rideData: rideData,
                                    rideStarted: rideStarted,
                                  })
                                );
                              } catch (error) {
                                console.error("Error storing data:", error);
                              }
                            }
                          }}
                        >
                          <Text style={styles.Start}>START</Text>
                          <Text style={styles.Ride}>RIDE</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View style={{ height: 100 }}></View>
        {!fetchedData && (
          <View>
            <Pressable onPress={handleCreateButton} style={styles.addContainer}>
              <View style={styles.wl}></View>
              <View style={styles.wl2}></View>
              <View style={styles.wl3}></View>
              <View style={styles.wl4}></View>
              <AntDesign
                name="plus"
                color={"gray"}
                size={80}
                style={styles.Icon}
              />

              <Text>CREATE A RIDE</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DriverHomePage;

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
  addContainer: {
    width: "80%",
    alignSelf: "center",
    height: 280,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "gray",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
    marginTop: 50,
  },
  cardContainer: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 35,
  },
  wl: {
    backgroundColor: "#f2f2f2",
    width: 200,
    height: 20,
    bottom: -10,
    position: "absolute",
    alignSelf: "center",
    zIndex: 10,
  },
  wl2: {
    backgroundColor: "#f2f2f2",
    width: 200,
    height: 20,
    top: -10,
    position: "absolute",
    alignSelf: "center",
    zIndex: 10,
  },
  wl3: {
    backgroundColor: "#f2f2f2",
    width: 20,
    height: 200,
    top: 40,
    left: -10,
    position: "absolute",
    alignSelf: "center",
    alignItems: "flex-start",
    zIndex: 10,
  },
  wl4: {
    backgroundColor: "#f2f2f2",
    width: 20,
    height: 200,
    top: 40,
    right: -10,
    position: "absolute",
    alignSelf: "center",
    alignItems: "flex-start",
    zIndex: 10,
  },
  cardBox: {
    backgroundColor: "#fff",
    height: 600,
    marginTop: 30,
    borderRadius: 10,
    shadowColor: "gray",
    shadowOffset: {
        width: 0,
        height: 2,
                  },
    shadowOpacity: 0.11,
    shadowRadius: 3.84,
    elevation: 3
  },
  mapContainer: {
    padding: 8,
    position: "absolute",
    width: "100%",
    zIndex: 100,
    top: 10,
        
  },
  profilePic: {
    backgroundColor: "#979797",
    width: 60,
    height: 60,
    left: 20,
    top: 12,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "red",
  },
  detailsContainer: {
    paddingHorizontal: 25,
  },

  txtContentTwo: {
    fontSize: 17,
    fontWeight: "300",
  },

  txtContent: {
    fontSize: 20,
    fontWeight: "300",
  },
  txtContentx: {
    fontSize: 17,
    fontWeight: "300",
    marginTop: 10,
  },
  txtContentFirst: {
    paddingTop: 12,
    alignSelf: "center",
    fontSize: 13,
    fontWeight: "600",
  },
  txtContentFirstx: {
    alignSelf: "center",
    fontSize: 12,
    color: "#2e2e2e",
    fontWeight: "bold",
  },
  IconThreeDot: {
    position: "absolute",
    right: -8,
    top: 20,
  },
  Btn: {
    width: "32%",
    height: 60,
    backgroundColor:"white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor:"green",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
        width: 0,
        height: 3,
                  },
    shadowOpacity: 9,
    shadowRadius: 4,
    elevation: 3
  },

  Btnview: {
    width: "32%",
    height: 60,
    backgroundColor:"white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor:"blue",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
        width: 0,
        height: 3,
                  },
    shadowOpacity: 9,
    shadowRadius: 4,
    elevation: 3
  },
  BtnContainer: {
    mari: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Start: {
    fontSize: 14,
    fontWeight: "800",
    color: "green",
  },
  Ride: {
    color: "#363636",
    fontWeight: "700",
    color: "green",

    fontSize: 12,
    lineHeight: 13,
  },
  IconChat: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
