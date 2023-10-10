import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { firebase } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Entypo from "react-native-vector-icons/Entypo";

const StudentRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [commuterID, setCommuterID] = useState("");
  const navigation = useNavigation();
  const [confirmPass, setConfirmPass] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [totalRides, setTOtalRIde] = useState(0);

  const [showErrorPass, setShowErrorPass] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const validateEmail = (email) => {
    if (email.endsWith("@dhvsu.edu.ph")) {
      return true;
    } else {
      alert(
        'Invalid Email Please enter your valid dhvsu email address ending with "@dhvsu.edu.ph".'
      );
      return false;
    }
  };
  const registerUser = async (
    email,
    password,
    firstName,
    lastName,
    address,
    commuterID,
    confirmPass,
    mobileNumber
  ) => {
    if (!validateEmail(email)) {
      return;
    }
    if (password !== confirmPass) {
      setShowErrorPass(true);
      return;
    }
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://aa-ride-along.firebaseapp.com",
          })
          .then(() => {
            alert("Verification Email Sent");
          })
          .catch((err) => {
            alert(err.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
                commuterID,
                mobileNumber,
                isVerified,
                totalRides,
                address,
              });

            navigation.navigate("HomeLogin");
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"slideInDown"}
        duration={2000}
        iterationCount={1}
        style={styles.containerTwo}
      >
        <Animatable.View
          animation="fadeInDown"
          duration={1900}
          delay={100}
          iterationCount={1}
          style={styles.content}
        >
          <Text style={styles.textTitle}>First Name</Text>
          <TextInput
            style={styles.input}
            defaultValue={firstName}
            onChangeText={(fname) => setFirstName(fname)}
            placeholder="john"
            autoCorrect={false}
            placeholderTextColor="grey"
            returnKeyType="next"
          />
          <Text style={styles.textTitle}>Last Name</Text>
          <TextInput
            style={styles.input}
            defaultValue={lastName}
            onChangeText={(lname) => setLastName(lname)}
            placeholder="doe"
            autoCorrect={false}
            placeholderTextColor="grey"
            returnKeyType="next"
          />
          <Text style={styles.textTitle}>Address</Text>
          <TextInput
            style={styles.input}
            defaultValue={address}
            onChangeText={(add) => setAddress(add)}
            autoCorrect={false}
            placeholder="Set address"
            placeholderTextColor="grey"
            returnKeyType="next"
          />
          <Text style={styles.textTitle}>DHVSU ID No.</Text>
          <TextInput
            style={styles.input}
            defaultValue={commuterID}
            placeholder="ID number"
            onChangeText={(comid) => setCommuterID(comid)}
            autoCorrect={false}
            placeholderTextColor="grey"
            returnKeyType="next"
          />
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            style={styles.input}
            defaultValue={email}
            onChangeText={(email) => setEmail(email)}
            textContentType="emailAddress"
            autoCapitalize="none"
            placeholderTextColor="grey"
            placeholder="johndoe@dhvsu.edu.ph"
            keyboardType="email-address"
            returnKeyType="next"
          />
          <Text style={styles.textTitle}>Mobile No.</Text>
          <TextInput
            style={styles.input}
            defaultValue={mobileNumber}
            onChangeText={(num) => setMobileNumber(num)}
            textContentType="emailAddress"
            placeholder="09******023"
            autoCapitalize="none"
            maxLength={11}
            placeholderTextColor="grey"
            keyboardType="number-pad"
            returnKeyType="next"
          />
          <Text style={styles.textTitle}>
            Password{" "}
            {showErrorPass && (
              <Text style={styles.textError}> * Password doesn't match</Text>
            )}
          </Text>
          <View style={styles.passAndEye}>
            <TextInput
              style={styles.input}
              defaultValue={password}
              onChangeText={(pass) => setPassword(pass)}
              placeholder="set password"
              returnKeyType="next"
              secureTextEntry={!passwordVisible}
              textContentType="password"
              keyboardType="default"
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
          <Text style={styles.textTitle}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            defaultValue={confirmPass}
            onChangeText={(pass) => setConfirmPass(pass)}
            placeholderTextColor="grey"
            secureTextEntry={!passwordVisible}
            returnKeyType="next"
            placeholder="re-type password"
            textContentType="password"
            keyboardType="default"
          />
          <Animatable.View
            animation={"fadeIn"}
            duration={1500}
            delay={500}
            iterationCount={1}
            style={styles.button}
          >
            <Pressable
              onPress={() =>
                registerUser(
                  email,
                  password,
                  firstName,
                  lastName,
                  address,
                  commuterID,
                  confirmPass,
                  mobileNumber
                )
              }
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </Pressable>
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>
      <Animatable.View
        animation={"slideInRight"}
        duration={2000}
        iterationCount={1}
      >
        <Text style={styles.title2}>Commuter Registration</Text>
        <Text style={styles.title1}>Sign Up</Text>
      </Animatable.View>
      <Animatable.View
        animation={"slideInLeft"}
        duration={2000}
        iterationCount={1}
        style={styles.wantto}
      >
        <Text style={styles.wanttosign}>want to sign in?</Text>
        <Pressable
          style={styles.registerContainer}
          onPress={() => navigation.navigate("HomeLogin")}
        >
          <Text style={styles.signin}> Sign in</Text>
        </Pressable>
      </Animatable.View>
    </View>
  );
};

export default StudentRegistration;

const styles = StyleSheet.create({
  passAndEye: {
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: "10%",
    bottom: "15%",
  },
  textError: {
    color: "red",
  },
  wantto: {
    flexDirection: "row",
    color: "white",
    alignSelf: "flex-start",
    marginTop: 50,
    marginLeft: "3%",
  },
  wanttosign: {
    color: "white",
  },
  signin: {
    textDecorationLine: "underline",
    color: "#ee005c",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#001c2e",
  },
  hiddenInput: {
    width: 0,
    height: 0,
  },
  button: {
    width: "70%",
    alignSelf: "center",
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "gray",
    backgroundColor: "#ee005c",
    marginTop: 25,
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
    borderBottomWidth: 1,
    borderColor: "gray",
    width: "80%",
    alignSelf: "center",
  },

  containerTwo: {
    backgroundColor: "white",
    width: "100%",
    height: 666,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    marginTop: "22%",
  },
  textTitle: {
    paddingTop: 10,
    marginLeft: "10%",
    color: "black",
  },
  containerone: {
    width: "100%",
  },
  title1: {
    alignSelf: "flex-end",
    marginRight: "5%",
    color: "#fff",
    fontSize: 40,
    lineHeight: 40,
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  title2: {
    alignSelf: "flex-end",
    marginRight: "3%",
    color: "#ecca2d",
    fontSize: 20,
    marginTop: 30,
  },
});
