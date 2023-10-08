import React from "react";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";

import {
  selectUserIsLoggedIn,
  setRideInfo,
  setUserId,
  setUserIsLoggedin,
  setUserProfile,
} from "./../redux/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../component/LoadingScreen";
import Driver from "./../navigations/driverNav";
import UserStack from "./UserStack";

const MainNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const Stack = createStackNavigator();
  const isStudent = useSelector(selectUserIsLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    checkUserAuthentication();
    checkForUID();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const driver = await AsyncStorage.getItem("driver");
      const isRideStarted = await AsyncStorage.getItem("isRideStarted");
      const rideInfoData = await AsyncStorage.getItem("StartRideInfo");
      const driverFirestore = await AsyncStorage.getItem("driverInfo");
      const userFirestore = await AsyncStorage.getItem("userInfo");

      if (user) {
        setIsLoading(true);
        const userFirestoreData = JSON.parse(userFirestore);
        dispatch(setUserProfile(userFirestoreData));
        const userDatax = JSON.parse(user);
        const userUIDx = userDatax.uid;
        dispatch(setUserId(userUIDx));
        dispatch(setUserIsLoggedin("student"));
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
      if (driver) {
        setIsLoading(true);

        const rideStart = JSON.parse(isRideStarted);
        const rideData = JSON.parse(rideInfoData);
        dispatch(
          setRideInfo({
            rideData: rideData,
            rideStarted: rideStart,
          })
        );

        const driverFirestoreData = JSON.parse(driverFirestore);
        dispatch(setUserProfile(driverFirestoreData));
        const driverData = JSON.parse(driver);
        const driverUID = driverData.uid;
        dispatch(setUserId(driverUID));

        dispatch(setUserIsLoggedin("driver"));
        setTimeout(() => {
          setIsLoading(false); // Set loading to false after 2 seconds
        }, 2000); // 2000 milliseconds (2 seconds)
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    }
  };

  const checkForUID = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const driver = await AsyncStorage.getItem("driver");

      if (user) {
        const userData = JSON.parse(user);
        const userUID = userData.uid;

        dispatch(setUserId(userUID));

        dispatch(setUserIsLoggedin("student"));

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } else if (driver) {
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        // You can render a loading indicator here while checking authentication.
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      ) : isStudent === "student" ? (
        <UserStack />
      ) : isStudent === "driver" ? (
        <Driver />
      ) : (
        <Login />
      )}
    </>
  );
};

export default MainNavigation;
