import { ImageBackground, Text, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../redux/navSlice";

const CustomDrawer = (props) => {
  const userProfile = useSelector(selectUserProfile);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#393939" }}
      >
        <ImageBackground
          source={require("../../assets/menu-bg.png")}
          style={{
            paddingTop: 20,
            paddingLeft: 8,
            paddingBottom: 20,
            paddingRight: 6,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 80,
              width: 80,
              borderRadius: 500,
              marginBottom: 10,
              backgroundColor: "gray",
            }}
          ></View>

          <View style={{ paddingLeft: 10 }}>
            <Text style={{ color: "#fff", fontSize: 17 }}>
              {`${userProfile?.firstName} ${userProfile?.lastName}`}
            </Text>
            <Text style={{ color: "#fff", fontSize: 12 }}>
              {userProfile?.email}
            </Text>
          </View>
        </ImageBackground>

        <View style={{ backgroundColor: "#fff", flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
