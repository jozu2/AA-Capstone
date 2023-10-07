import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";

import {
  selectViewBookings,
  setUserLocationBooked,
} from "../../redux/navSlice";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { db } from "../../../config";
import { get, ref } from "firebase/database";

const ViewUserAccepted = () => {
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
          return request.status.isAccepted;
        });

        if (filteredRequests.length > 0) {
          const randomRequest = filteredRequests;
          setFilteredBookingData(randomRequest);
        } else {
          console.log("error in fetching");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          Users
        </Text>

        {!filteredBookingData && (
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              marginTop: 20,
              color: "red",
              fontWeight: "300",
            }}
          >
            NO USER ACCEPTED
          </Text>
        )}
        {filteredBookingData &&
          filteredBookingData.map((booking, key) => (
            <View key={key} style={styles.mainContainer}>
              <View>
                <TouchableOpacity
                  style={[tw`shadow-md`, styles.container]}
                  onPress={() => {
                    navigation.navigate("AcceptedUserDetails");
                    dispatch(setUserLocationBooked(booking));
                  }}
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
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        <View>
          <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 20 }}>
            Comment Section
          </Text>
          <View
            style={{
              height: 300,
              backgroundColor: "#fff",
              width: "95%",
              alignSelf: "center",
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 1,
            }}
          ></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewUserAccepted;

const styles = StyleSheet.create({
  mainContainer: { padding: 10, flex: 1 },
  container: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
  },
  nameAndProfileContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: "#b1b1b1",
    borderWidth: 1.6,
    borderColor: "red",
    borderRadius: 1000,
  },
});
