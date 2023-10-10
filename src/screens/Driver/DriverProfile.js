import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../redux/navSlice";
const DriverProfile = () => {
  const UserProfile = useSelector(selectUserProfile);
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView>
      {UserProfile && (
        <View>
          <LinearGradient
            colors={["#081e30", "#081e30", "#081e30", "#15b99e"]}
            style={{
              backgroundColor: "#",
              width: "100%",
              height: 530,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 25,
                paddingRight: 45,
                paddingTop: 50,
                paddingBottom: 50,
              }}
            >
              <EvilIcons
                name={"navicon"}
                size={40}
                color={"#fff"}
                onPress={handleOpenDrawer}
              />
              <Text
                style={{
                  fontSize: 40,
                  color: "#ecca2d",
                  fontWeight: "500",
                }}
              >
                Profile
              </Text>
              <Feather name="user" size={30} color={"#01ccdd"} />
            </View>
            <View
              style={{
                backgroundColor: "gray",
                width: 150,
                height: 150,
                borderRadius: 5000,
                alignSelf: "center",
                borderWidth: 4,
                borderColor: "#fff",
                zIndex: 10,
              }}
            ></View>
            <Text
              style={{
                color: "#ee005c",
                fontSize: 28,
                fontWeight: "500",
                alignSelf: "center",
                paddingTop: 20,
              }}
            >
              {`${UserProfile?.firstName} ${UserProfile?.lastName}`}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "400",
                alignSelf: "center",
              }}
            >
              Bachelor of Science in Information Technology | 4A
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              <Icon name="location" size={20} color="green" />

              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: "300",
                  alignSelf: "center",
                  paddingLeft: 2,
                }}
              >
                {UserProfile.address}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#ebebeb",
                width: "90%",
                alignSelf: "center",
                borderRadius: 10,
                position: "absolute",
                bottom: -30,
                borderBottomColor: "gray",
                borderWidth: 2,
              }}
            >
              <View
                style={{
                  display: "flex",
                  paddingHorizontal: 40,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "400",
                        color: UserProfile.Verified ? `yellow` : `red`,
                      }}
                    >
                      {UserProfile.Verified ? `YES` : `NO`}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "#4f4f4f",
                      }}
                    >
                      Verified
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "400",
                        color: "black",
                      }}
                    >
                      {UserProfile.totalRides}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "#4f4f4f",
                      }}
                    >
                      Total Rides
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "400",
                        color: "black",
                      }}
                    >
                      10/10/2023
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "500",
                        color: "#4f4f4f",
                      }}
                    >
                      Date Created
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>

          <View
            style={{
              height: 400,
              width: "70%",
              alignSelf: "center",
              borderRadius: 20,
              paddingTop: 50,
            }}
          >
            <View>
              <View>
                <View>
                  <Pressable style={styles.pressableBtn}>
                    <AntDesign name="idcard" size={30} color="black" />
                    <View style={{ paddingLeft: 15 }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        {UserProfile.driverId}
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: "300" }}>
                        Dhvsu ID
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
            <View>
              <View>
                <View>
                  <Pressable style={styles.pressableBtn}>
                    <Foundation name="telephone" size={30} color="black" />
                    <View style={{ paddingLeft: 15 }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        {` +63 ${UserProfile.mobileNumber}`}
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: "300" }}>
                        Contact No.
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
            <View>
              <View>
                <View>
                  <Pressable style={styles.pressableBtn}>
                    <AntDesign name="idcard" size={30} color="black" />
                    <View style={{ paddingLeft: 15 }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        N/A
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: "300" }}>
                        N/A
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DriverProfile;

const styles = StyleSheet.create({
  pressableBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
  },
});
