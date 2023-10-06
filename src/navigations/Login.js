import StudentLogin from "../screens/Login/StudentLogin";
import StudentRegistration from "../screens/Login/StudentRegistration";
import DriverLogin from "../screens/Login/DriverLogin";
import DriverRegistration from "../screens/Login/DriverRegistration";

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginHome from "../screens/Login/LoginHome";

const Login = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="HomeLogin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeLogin" component={LoginHome} />
      <Stack.Screen name="StudentLogin" component={StudentLogin} />
      <Stack.Screen
        name="StudentRegistration"
        component={StudentRegistration}
      />
      <Stack.Screen name="DriverLogin" component={DriverLogin} />
      <Stack.Screen name="DriverRegistration" component={DriverRegistration} />
    </Stack.Navigator>
  );
};

export default Login;
