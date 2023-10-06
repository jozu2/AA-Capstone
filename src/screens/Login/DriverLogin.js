import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "./../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  setUserId,
  setUserIsLoggedin,
  setUserProfile,
} from "../../redux/navSlice";
import * as Animatable from "react-native-animatable";
import Entypo from "react-native-vector-icons/Entypo";

const DriverLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const driver = await AsyncStorage.getItem("driver");
      if (driver) {
        navigation.navigate("DriverHomePage");
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    }
  };

  const loginDriver = async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        const userDocs = await firebase
          .firestore()
          .collection("drivers")
          .doc(user.uid)
          .get();
        if (userDocs.exists) {
          const userData = userDocs.data();
          await AsyncStorage.setItem("driverInfo", JSON.stringify(userData));

          dispatch(setUserIsLoggedin("driver"));
          await AsyncStorage.setItem("driver", JSON.stringify(user));
        } else {
          alert("Please log in your Driver Account");
        }
      } else {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: "https://aa-ridealong.firebaseapp.com",
        });
        alert("Please verify your email before proceeding.");
        await firebase.auth().signOut();
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid Email/Password");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="slideInLeft"
        duration={1000}
        delay={100}
        style={styles.containerone}
      >
        <Text style={styles.title2}>Hello!</Text>
        <Text style={styles.title1}>Sign In</Text>
      </Animatable.View>
      <Animatable.View
        animation={"slideInUp"}
        duration={2000}
        iterationCount={1}
        style={styles.containertwo}
      >
        <Animatable.View
          animation={"fadeInUp"}
          duration={1500}
          iterationCount={1}
          style={styles}
        >
          <Text style={styles.inputemail}>Gmail</Text>
          <TextInput
            style={styles.input}
            defaultValue={email}
            autoCorrect={false}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
          />
          <Text style={styles.inputpassword}>Password</Text>

          <View style={styles.passAndEye}>
            <TextInput
              style={styles.input}
              defaultValue={password}
              onChangeText={(pass) => setPassword(pass)}
              keyboardType="default"
              autoCorrect={false}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
            />
            <Entypo
              name={passwordVisible ? "eye" : "eye-with-line"}
              color="gray"
              size={23}
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            />
          </View>
          <Text style={styles.forgot}>Forgot Password?</Text>
          <Animatable.View
            animation={"fadeInUp"}
            duration={2000}
            iterationCount={1}
            style={styles.button}
          >
            <Pressable
              onPress={() => loginDriver(email, password)}
              disabled={!email || !password}
            >
              <Text style={styles.buttonText}>SIGN IN</Text>
            </Pressable>
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>
      <Animatable.View
        animation={"slideInUp"}
        duration={1500}
        delay={200}
        iterationCount={1}
        style={styles.registerContainer}
      >
        <Text style={styles.noAccText}>No driver account?</Text>
        <Pressable onPress={() => navigation.navigate("DriverRegistration")}>
          <Text style={styles.signUpText}> Sign Up</Text>
        </Pressable>
      </Animatable.View>
    </View>
  );
};

export default DriverLogin;
const styles = StyleSheet.create({
  passAndEye: {
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: "10%",
    bottom: "15%",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title1: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    top: "-15%",
    color: "white",
    fontSize: 40,
    lineHeight: 45,
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  title2: {
    alignSelf: "flex-start",
    marginLeft: "8%",
    top: "-15%",
    color: "white",
    fontSize: 20,
  },
  button: {
    width: "80%",
    marginTop: "10%",
    backgroundColor: "black",
    borderRadius: 30,
    alignSelf: "center",
    borderWidth: 1.5,
    borderColor: "gray",
  },
  buttonText: {
    fontSize: 22,
    color: "white",
    alignSelf: "center",
    paddingBottom: 10,
    paddingTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  input: {
    padding: 8,
    borderBottomWidth: 1,
    width: "80%",
    alignSelf: "center",
  },

  containerone: {
    backgroundColor: "black",
    height: "47%",
    justifyContent: "center",
  },
  containertwo: {
    position: "absolute",
    width: "100%",
    height: "75%",
    bottom: "0%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
  },
  forgot: {
    alignSelf: "flex-end",
    marginRight: "10%",
    marginTop: 20,
    fontSize: 14,
  },
  signUpText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "black",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 0.5,
  },
  noAccText: { fontSize: 14, color: "gray" },

  registerContainer: {
    alignItems: "flex-end",
    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
  inputemail: {
    marginLeft: "10%",
    marginTop: "15%",
    color: "black",
  },
  inputpassword: {
    marginLeft: "10%",
    marginTop: "5%",
    color: "black",
  },
});
