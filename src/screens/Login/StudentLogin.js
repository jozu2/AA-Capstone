import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "./../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserIsLoggedin, setUserProfile } from "../../redux/navSlice";
import { useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import Entypo from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";

const StudentLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        navigation.navigate("CommuterHomePage");
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    }
  };
  const loginUser = async (email, password) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        const userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
          await AsyncStorage.setItem("user", JSON.stringify(user));
          dispatch(setUserIsLoggedin("student"));
        } else {
          alert("Please log in to your Student Account");
        }
      } else {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: "https://aa-ride-along.firebaseapp.com",
        });

        alert("Please verify your email before proceeding.");
        await firebase.auth().signOut();
      }
    } catch (error) {
      console.log("Firebase Error:", error.message);
      alert("Invalid Email/Password");
      return;
    }
  };
  const handleResetPassword = async () => {
    try {
      if (!email) return;

      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert(
        "Password Reset Email Sent",
        "Check your email to reset your password."
      );
    } catch (error) {
      console.error("Password Reset Failed", error);
      Alert.alert("Password Reset Failed", error.message);
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
        <Text style={styles.title2}>Commuter</Text>
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
          <Text style={styles.inputemail}>Dhvsu Email</Text>
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
          <TouchableOpacity onPress={handleResetPassword}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <Animatable.View
            animation={"fadeInUp"}
            duration={2000}
            iterationCount={1}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => loginUser(email, password)}
              disabled={!email || !password}
            >
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

            <Animatable.View
              animation={"slideInUp"}
              duration={1500}
              delay={200}
              iterationCount={1}
              style={styles.registerContainer}
            >
              <Text style={styles.noAccText}>No commuter account?</Text>
              <Pressable
                onPress={() => navigation.navigate("StudentRegistration")}
              >
                <Text style={styles.signUpText}> Sign Up</Text>
              </Pressable>
            </Animatable.View>
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

export default StudentLogin;

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
    backgroundColor: "#001c2e",
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
    color: "#ee005c",
    fontSize: 20,
  },
  button: {
    width: "80%",
    marginTop: "10%",
    backgroundColor: "#1c9c87",
    borderRadius: 30,
    alignSelf: "center",
    borderWidth: 1.5,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 22,
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },

  input: {
    padding: 8,
    borderBottomWidth: 1,
    width: "80%",
    alignSelf: "center",
  },

  containerone: {
    backgroundColor: "#001c2e",
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
    color: "#ecca2d",
  },
  signUpText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#01ccdd",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 0.5,
  },
  noAccText: { fontSize: 14, color: "gray" },

  registerContainer: {
    alignItems: "flex-end",
    top: 140,
    right: "5%",
  },
  inputemail: {
    marginLeft: "10%",
    marginTop: "15%",
  },
  inputpassword: {
    marginLeft: "10%",
    marginTop: "5%",
  },
});
