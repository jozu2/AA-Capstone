import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { selectRideInfo, setRideInfo } from "../../redux/navSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const RideSuccess = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const x = useSelector(selectRideInfo);
  const handleGoBackBtn = async () => {
    try {
      dispatch(
        setRideInfo({
          rideStarted: false,
        })
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
    navigation.navigate("DriverHomePage");
  };
  return (
    <View>
      <Text style={{ marginTop: 200, alignSelf: "center" }}>
        Yey!! Ride Success
      </Text>
      <TouchableOpacity onPress={handleGoBackBtn}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RideSuccess;

const styles = StyleSheet.create({});
