import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ModalViewCard from "./../screens/Commuter/ModalViewCard";
import UserNav from "./UserNav";
import ViewRequest from "../screens/Commuter/ViewRequest";

const UserStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="UserNavHome"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Group>
        <Stack.Screen name="UserNavHome" component={UserNav} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="ModalViewCard" component={ModalViewCard} />
        <Stack.Screen name="ViewRequest" component={ViewRequest} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          headerShown: true,
        }}
      ></Stack.Group>
    </Stack.Navigator>
  );
};

export default UserStack;
