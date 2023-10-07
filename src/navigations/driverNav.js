import React from "react";
import DriverSettings from "../screens/Driver/DriverSettings";
import DriverStack from "./driverStack";
import Feather from "react-native-vector-icons/Feather";

import { StyleSheet } from "react-native";
import DriverProfile from "../screens/Driver/DriverProfile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native-animatable";
import CustomDrawer from "../screens/Commuter/CustomDrawer";
const DriverNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "rgba(0, 0, 0, 0.4)",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "black",
          drawerLabelStyle: { marginLeft: -18 },
        }}
      >
        <Drawer.Screen
          name="HomeDriver"
          component={DriverStack}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="home" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ProfileDriver"
          component={DriverProfile}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="user" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="SettingsDriver"
          component={DriverSettings}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="settings" size={22} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default DriverNav;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
