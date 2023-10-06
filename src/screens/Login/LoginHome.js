import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const LoginHome = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["black", "black", "gray", "#fff"]}
      style={styles.Main}
    >
      <View style={styles.containerone}>
        <Animatable.View
          animation="fadeInDown"
          duration={1900}
          delay={100}
          iterationCount={1}
          style={styles.logoContainer}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </Animatable.View>
        <Animatable.Text
          animation="fadeIn"
          duration={1900}
          delay={100}
          iterationCount={1}
          style={styles.logoTitle}
        >
          Angkas Atad
        </Animatable.Text>
      </View>
      <Animatable.View
        animation={"fadeInUp"}
        duration={1900}
        delay={100}
        iterationCount={1}
        style={styles.containertwo}
      >
        <Animatable.View
          animation={"slideInUp"}
          duration={1200}
          iterationCount={1}
        >
          <Text style={styles.h1}>Login As</Text>

          <View style={[styles.buttonBlueContainer]}>
            <Pressable
              style={[styles.buttonBlue]}
              onPress={() => navigation.navigate("StudentLogin")}
            >
              <Text style={styles.buttonText}>COMMUTER</Text>
            </Pressable>
          </View>

          <LinearGradient
            colors={["#404040", "black", "black"]}
            style={[styles.buttonBlueContainerTwo]}
          >
            <Pressable onPress={() => navigation.navigate("DriverLogin")}>
              <Text style={styles.buttonTexttwo}>DRIVER</Text>
            </Pressable>
          </LinearGradient>
        </Animatable.View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default LoginHome;

const styles = StyleSheet.create({
  buttonBlueContainerTwo: {
    width: "80%",
    marginTop: "5%",
    borderRadius: 12,
    borderWidth: 2,
    borderTopColor: "#e6e6e6",
    borderRightColor: "#ababab",
    backgroundColor: "black",
    alignSelf: "center",
  },
  buttonBlueContainer: {
    backgroundColor: "white",
    width: "80%",
    marginTop: "5%",
    borderRadius: 30,
    borderWidth: 2,
    borderTopColor: "#e6e6e6",
    borderRightColor: "#ababab",
    alignSelf: "center",
  },
  containerone: {
    backgroundColor: "transparent",

    height: "47%",

    justifyContent: "center",
  },
  Main: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonText: {
    color: "black",

    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 15,
    letterSpacing: 1.1,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  buttonTexttwo: {
    fontSize: 20,
    alignSelf: "center",
    color: "white",
    paddingVertical: 15,
    letterSpacing: 1.1,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },

  button: {
    width: "80%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    top: 2,
    padding: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "gray",
  },
  input: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,

    borderColor: "gray",
  },
  h1: {
    fontSize: 30,
    color: "black",
    letterSpacing: 0.5,
    alignSelf: "center",
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginTop: "25%",
  },
  containertwo: {
    position: "absolute",
    width: "95%",
    alignSelf: "center",
    height: "50%",
    bottom: "10%",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    blurRadius: 2,
    borderWidth: 2,
    borderTopColor: "#e6e6e6",
    borderRightColor: "#ababab",
  },
  logo: {
    resizeMode: "cover",
    height: 130,
    width: 230,
    alignSelf: "center",
  },
  logoContainer: {
    backgroundColor: "transparent",
    borderRadius: 1000,
    width: "40%",
    height: "25%",

    alignSelf: "center",
    justifyContent: "center",
  },
  logoTitle: {
    alignSelf: "center",
    fontSize: 32,
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    color: "white",
  },
});
