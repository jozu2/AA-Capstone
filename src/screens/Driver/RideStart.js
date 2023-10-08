import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setRideInfo } from "../../redux/navSlice";

const RideStart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleEndRideBtn = () => {
    dispatch(
      setRideInfo({
        rideStarted: false,
      })
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={handleEndRideBtn}>
        <Text style={{ marginTop: 30 }}>EndRide</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RideStart;

const styles = StyleSheet.create({});
