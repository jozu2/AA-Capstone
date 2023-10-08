import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DriverHomePage from "../screens/Driver/DriverHomePage";
import DriverRideRegistration from "../screens/Driver/DriverRideRegistration";
import SetRouteModal from "../screens/Driver/SetRouteModal";
import ViewBookings from "../screens/Driver/ViewBookings";
import ViewUserBookingDetails from "../screens/Driver/ViewUserBookingDetails";
import ViewUserAccepted from "../screens/Driver/ViewUserAccepted";
import ViewAcceptedUserDetails from "../screens/Driver/ViewAcceptedUserDetails";
import { useDispatch, useSelector } from "react-redux";
import { selectRideInfo } from "../redux/navSlice";
import RideStart from "../screens/Driver/RideStart";

const DriverStack = () => {
  const Stack = createStackNavigator();
  const rideInfo = useSelector(selectRideInfo);
  const isRideStarted = rideInfo?.rideStarted;

  console.log(rideInfo);
  return (
    <Stack.Navigator
      initialRouteName="DriverHomePage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Group>
        {isRideStarted ? (
          <Stack.Screen name="RideStart" component={RideStart} />
        ) : (
          <Stack.Screen name="DriverHomePage" component={DriverHomePage} />
        )}
        <Stack.Screen
          name="DriverRideRegistration"
          component={DriverRideRegistration}
        />
        <Stack.Screen name="SetRouteModal" component={SetRouteModal} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: true }}>
        <Stack.Screen name="ViewBooking" component={ViewBookings} />
        <Stack.Screen
          name="BookingDetails"
          component={ViewUserBookingDetails}
        />
        <Stack.Screen
          name="ViewAcceptedUserDetails"
          component={ViewAcceptedUserDetails}
        />
        <Stack.Screen name="UserAccepted" component={ViewUserAccepted} />
        <Stack.Screen
          name="AcceptedUserDetails"
          component={ViewAcceptedUserDetails}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default DriverStack;
