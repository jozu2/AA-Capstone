import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectViewBookings,
  setUserLocationBooked,
} from "../../redux/navSlice";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { db } from "../../../config";
import { get, ref, set } from "firebase/database";

const ViewBookings = () => {
  const bookingData = useSelector(selectViewBookings);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [filteredBookingData, setFilteredBookingData] = useState(null);

  const DriverPostID = `${bookingData.DriverData.driverProfile.UID}${bookingData.DriverData.driverProfile.postID}`;
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
          return !request.status.isAccepted;
        });

        if (filteredRequests.length > 0) {
          const randomRequest = filteredRequests;

          const showRedDotRef = ref(
            db,
            `POSTED_RIDES/${DriverPostID}/notif/showRedDot`
          );
          set(showRedDotRef, false);
          setFilteredBookingData(randomRequest);
        } else {
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <ScrollView style={{ flex: 1 }}>
        {!filteredBookingData && (
          <View>
            <Text style={{ alignSelf: "center", fontSize: 30 }}>
              NO REQUEST ATM
            </Text>
          </View>
        )}
        {filteredBookingData &&
          filteredBookingData.map((booking, key) => (
            <View key={key} style={styles.mainContainer}>
              <View>
                <TouchableOpacity
                  style={[tw`shadow-md`, styles.container]}
                  
                >
                  <View style={styles.nameAndProfileContainer}>
                    <TouchableOpacity
                      style={styles.profilePic}
                    ></TouchableOpacity>
                    <View
                      style={{
                        justifyContent: "center",
                        paddingLeft: 10,
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        {booking.userInfo.userName}

                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "400",
                            color: "green",
                          }}
                        >
                          {`  -  ${booking.rideInfo.passengerCount}`}
                          <Feather name="user" size={15} color={"green"} />
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "300",
                          lineHeight: 14,
                        }}
                      >
                        1h ago
                      </Text>
                    </View>
                         <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("BookingDetails");
              dispatch(setUserLocationBooked(booking));
            }}
          >
            <Text style={{color:"white", fontSize:14, fontWeight:600,}}>View</Text>
          </TouchableOpacity>

                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default ViewBookings;

const styles = StyleSheet.create({
  mainContainer: { padding: 10, flex: 1 },
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  nameAndProfileContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  profilePic: {
    width: 70,
    height: 70,
    backgroundColor: "#b1b1b1",
    borderWidth: 1.6,
    borderColor: "red",
    borderRadius: 1000,
  },
 
    btn: {
      width: 70,
      height: 50,
      backgroundColor: "limegreen",
      borderRadius: 6,
      borderWidth: .5,
      borderColor: "green",
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 20,
      marginVertical: 10,
      marginLeft:45,
      shadowColor: "black",
      shadowOffset: {
          width: 0,
          height: 3,
                    },
      shadowOpacity: 9,
      shadowRadius: 4,
      elevation: 3
    },
});
