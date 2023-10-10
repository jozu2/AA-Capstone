import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";

import {
  selectViewBookings,
  setUserLocationBooked,
} from "../../redux/navSlice";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
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
    <View style={{ flex: 1,height:"100%", borderColor:"blue"}}>
       <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            marginTop: 5,
            fontWeight: "bold",
          }}
        >
          Users
        </Text>
      <ScrollView style={{ height:"25%" , borderColor:"red"}}>
       

        {!filteredBookingData && (
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: "red",
              fontWeight: "bold",
              margin:"2%",
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
        </ScrollView>

        <View style={{ height:"80%"}}>
          <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 3 }}>
            Comment Section
          </Text>

          <ScrollView
            style={styles.chatboxconatainer}
          >
              <View style={styles.chatbubble}></View>
              <View style={styles.chatbubble}></View>
              <View style={styles.chatbubble}></View>
              <View style={styles.chatbubble}></View>
              <View style={styles.chatbubble}></View>
              <View style={styles.chatbubble}></View>
                      <View style={styles.chatbubble}></View>
          </ScrollView>
          <View
            style={styles.chatinputcontainer}
          >
            <TextInput
            style={{width:"95%",height:"100%" ,marginHorizontal:10, marginTop:0}}></TextInput>
          </View>
        </View>
       

    </View>
  );
};

export default ViewUserAccepted;

const styles = StyleSheet.create({
  mainContainer: { padding: 0, flex: 1 },
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
  chatbubble:{
     height: 70,
    backgroundColor: "#fff",
    borderRadius:10,
    borderColor:"gray",
    borderWidth:2,
    width: "95%",
    alignSelf: "center",
    margin: 5,
    shadowColor: "gray",
    shadowOffset: {
        width: 0,
        height: 2,
                  },
    shadowOpacity: 0.11,
    shadowRadius: 3.84,
    elevation: 3
  },

  chatboxconatainer:{ height:"75%",
    backgroundColor: "#fff",
    borderRadius:10,
   
    width: "95%",
    alignSelf: "center",
    marginTop: 3,
    shadowColor: "gray",
    shadowOffset: {
        width: 0,
        height: 2,
                  },
    shadowOpacity: 0.11,
    shadowRadius: 3.84,
    elevation: 3
  },
    chatinputcontainer:{ 
      height: 50,
      backgroundColor: "#fff",
      borderRadius:10,
      marginBottom:10,
      borderColor:"gray",
      borderWidth:2,
      width: "95%",
      alignSelf: "center",
      marginTop: 20,

      shadowColor: "gray",
      shadowOffset: {
          width: 0,
          height: 2,
                    },
      shadowOpacity: 0.11,
      shadowRadius: 3.84,
      elevation: 3

    }
});
