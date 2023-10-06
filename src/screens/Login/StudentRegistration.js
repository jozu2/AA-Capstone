import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { firebase } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

const StudentRegistration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const navigation = useNavigation();
  const [confirmPass, setConfirmPass] = useState("");

  const [showErrorPass, setShowErrorPass] = useState(false);

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
    studentId
  ) => {
    if (!validateEmail(email)) {
      return;
    }
    if (password !== confirmPass) {
      setShowErrorPass(true);
      return;
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://aa-ridealong.firebaseapp.com",
      });

      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
          studentId,
        });

      await firebase.auth().signOut();

      alert("Verification Email Sent");
      navigation.navigate("HomeLogin");
    } catch (error) {
      alert(error.message);
    }
  };

  //   return (
  //     <View style={styles.container}>
  //       <TextInput
  //         style={styles.input}
  //         defaultValue={firstName}
  //         onChangeText={(fname) => setFirstName(fname)}
  //         placeholder="First Name"
  //         autoCorrect={false}
  //         placeholderTextColor="grey"
  //         returnKeyType="next"
  //       />

  //       <TextInput
  //         style={styles.input}
  //         defaultValue={lastName}
  //         onChangeText={(lname) => setLastName(lname)}
  //         placeholder="Last Name"
  //         autoCorrect={false}
  //         placeholderTextColor="grey"
  //         returnKeyType="next"
  //       />

  //       <TextInput
  //         style={styles.input}
  //         defaultValue={studentId}
  //         onChangeText={(studID) => setStudentId(studID)}
  //         placeholder="Student ID"
  //         autoCorrect={false}
  //         placeholderTextColor="grey"
  //         returnKeyType="next"
  //       />

  //       <TextInput
  //         style={styles.input}
  //         defaultValue={email}
  //         onChangeText={(email) => setEmail(email)}
  //         textContentType="emailAddress"
  //         placeholder="Email Address"
  //         autoCapitalize="none"
  //         placeholderTextColor="grey"
  //         keyboardType="email-address"
  //         returnKeyType="next"
  //       />

  //       <TextInput
  //         style={styles.input}
  //         defaultValue={password}
  //         onChangeText={(pass) => setPassword(pass)}
  //         placeholder="Enter Password"
  //         placeholderTextColor="grey"
  //         returnKeyType="next"
  //         secureTextEntry={true}
  //         textContentType="password"
  //         keyboardType="default"
  //       />

  //       <Pressable
  //         style={styles.registerContainer}
  //         onPress={() => navigation.navigate("HomeLogin")}
  //       >
  //         <Text style={styles.register}>want to sign in?</Text>
  //       </Pressable>

  //         <Text>SIGN UP</Text>
  //       </Pressable>
  //     </View>
  //   );
  // };

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
            autoCorrect={false}
            placeholderTextColor="grey"
            returnKeyType="next"
          />
          <Text style={styles.textTitle}>Last Name</Text>

          <TextInput
            style={styles.input}
            defaultValue={lastName}
            onChangeText={(lname) => setLastName(lname)}
            autoCorrect={false}
            placeholderTextColor="grey"
            returnKeyType="next"
          />
          <Text style={styles.textTitle}>Student ID</Text>

          <TextInput
            style={styles.input}
            defaultValue={studentId}
            onChangeText={(studentId) => setStudentId(studentId)}
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
            keyboardType="email-address"
            returnKeyType="next"
          />
          <Text style={styles.textTitle}>
            Password{" "}
            {showErrorPass && (
              <Text style={styles.textError}> * Password doesn't match</Text>
            )}
          </Text>

          <TextInput
            style={styles.input}
            defaultValue={password}
            onChangeText={(pass) => setPassword(pass)}
            placeholderTextColor="grey"
            returnKeyType="next"
            secureTextEntry={true}
            textContentType="password"
            keyboardType="default"
          />
          <Text style={styles.textTitle}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            defaultValue={confirmPass}
            onChangeText={(pass) => setConfirmPass(pass)}
            placeholderTextColor="grey"
            returnKeyType="next"
            secureTextEntry={true}
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
                registerUser(email, password, firstName, lastName, studentId)
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
    color: "white",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  hiddenInput: {
    width: 0,
    height: 0,
  },
  button: {
    width: "70%",
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "gray",
    backgroundColor: "black",
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
    height: 600,
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
    color: "white",
    fontSize: 40,
    lineHeight: 40,
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  title2: {
    alignSelf: "flex-end",
    marginRight: "3%",
    color: "white",
    fontSize: 20,
    marginTop: 30,
  },
});
