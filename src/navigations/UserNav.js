import React from "react";
import { View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { StyleSheet } from "react-native";
import CommuterHomePage from "../screens/Commuter/CommuterHomePage";
import CommuterSettings from "../screens/Commuter/CommuterSettings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../screens/Commuter/CustomDrawer";
import UserProfile from "../screens/Commuter/UserProfile";
const UserNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "#081e30",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "black",
          drawerLabelStyle: { marginLeft: -18 },
        }}
      >
        <Drawer.Screen
          name="CommuterHomePage"
          component={CommuterHomePage}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="home" size={22} color={color} />
            ),
            drawerLabel: "Home",
          }}
        />

        <Drawer.Screen
          name="CommuterProfile"
          component={UserProfile}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="user" size={22} color={color} />
            ),
            drawerLabel: "Profile",
          }}
        />
        <Drawer.Screen
          name="CommuterSettings"
          component={CommuterSettings}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="settings" size={22} color={color} />
            ),
            drawerLabel: "Settings",
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default UserNav;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
