import "react-native-gesture-handler";
import React from "react";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigations/MainNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
}
