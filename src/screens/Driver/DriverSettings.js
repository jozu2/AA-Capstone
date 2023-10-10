import { Pressable, Text, View } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  selectUserProfile,
  setUserId,
  setUserIsLoggedin,
  setUserProfile,
} from "../../redux/navSlice";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/EvilIcons";
const DriverSettings = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(setUserIsLoggedin(""));
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("userInfo");
      await AsyncStorage.removeItem("driverInfo");
      await AsyncStorage.removeItem("driver");
      dispatch(setUserIsLoggedin(""));
      dispatch(setUserProfile(null));
      dispatch(setUserId(null));
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const openAppSettings = async () => {
    await Linking.openSettings();
  };

  const userProfile = useSelector(selectUserProfile);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#05131f" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 25,
          paddingRight: 45,
          paddingVertical: 35,
          borderBottomWidth: 2,
          borderColor: "gray",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            color: "#01ccdd",
            fontWeight: "600",
          }}
        >
          Settings
        </Text>
        <Feather
          name="settings"
          size={45}
          color={"#fff"}
          style={{ paddingTop: 5 }}
        />
      </View>

      <Text
        style={{
          color: "#ecca2d",
          marginTop: 30,
          fontSize: 24,
          fontWeight: "500",
          paddingLeft: 20,
        }}
      >
        Your Location
      </Text>

      <View>
        <View>
          <Pressable
            style={{
              borderColor: "#fff",
              paddingLeft: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 130,
              marginTop: 20,
            }}
          >
            <Entypo name="home" size={25} color="white" />
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: "700",
                  paddingBottom: 3,
                }}
              >
                Home
              </Text>
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "300" }}>
                {userProfile?.address}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View>
        <View>
          <TouchableOpacity
            style={{
              borderColor: "#fff",
              paddingLeft: 30,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 130,
              marginTop: 40,
            }}
            onPress={openAppSettings}
          >
            <Icon name="location" size={50} color="white" />
            <View style={{ paddingLeft: 5 }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Allow Location Permission
              </Text>
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "300" }}>
                allows the app to access your device's location for various
                features and functionalities
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View>
            <Pressable
              style={{
                borderColor: "#fff",
                paddingLeft: 30,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingRight: 90,
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                name="account-details"
                size={48}
                color="white"
              />
              <View style={{ paddingLeft: 8 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  Account Information
                </Text>
                <Text
                  style={{ color: "#fff", fontSize: 12, fontWeight: "300" }}
                >
                  displays your personal details and preferences.
                </Text>
              </View>
            </Pressable>
          </View>

          <View>
            <View>
              <Pressable
                style={{
                  flexDirection: "row",
                  padding: 10,
                  width: "100%",
                  paddingLeft: 40,
                  alignItems: "center",
                  marginTop: 10,
                }}
                onPress={handleLogout}
              >
                <Entypo name="log-out" size={32} color="#ee005c" />
                <Text
                  style={{
                    color: "#ee005c",
                    fontSize: 19,
                    paddingLeft: 10,
                    fontWeight: "500",
                  }}
                >
                  Logout
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DriverSettings;
