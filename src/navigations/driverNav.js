import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DriverSettings from "../screens/Driver/DriverSettings";
import DriverStack from "./driverStack";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import DriverProfile from "../screens/Driver/DriverProfile";
const DriverNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: "red",
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "HomeDriver") {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
          } else if (route.name === "ProfileDriver") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "SettingsDriver") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeDriver" component={DriverStack} />
      <Tab.Screen name="ProfileDriver" component={DriverProfile} />
      <Tab.Screen name="SettingsDriver" component={DriverSettings} />
    </Tab.Navigator>
  );
};

export default DriverNav;
const styles = StyleSheet.create({
  tabBarStyle: {
    width: "94%",
    borderRadius: 10,
    alignSelf: "center",
    bottom: 5,
    left: "3%",
    position: "absolute",
    height: 80,
    borderWidth: 1,
    borderTopColor: "#fff",
    borderRightColor: "gray",
    borderLeftColor: "#242424",
  },
});
