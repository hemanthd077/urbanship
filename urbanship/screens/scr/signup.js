import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <View style={styles.inputOuterView}>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Enter the first Name"
        />
        <Text style={styles.IconTextBlock}>
          <FontAwesomeIcon style={styles.IconText} icon={faUser} />
        </Text>
      </View>
      <View style={styles.inputOuterView}>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Enter the Last Name"
        />
        <Text style={styles.IconTextBlock}>
          <FontAwesomeIcon style={styles.IconText} icon={faUser} />
        </Text>
      </View>
      <View style={styles.inputOuterView}>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Enter the Email-Id"
        />
        <Text style={styles.IconTextBlock}>
          <FontAwesomeIcon style={styles.IconText} icon={faEnvelope} />
        </Text>
      </View>
      <View style={styles.inputOuterView}>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Enter the Password"
          secureTextEntry={true}
        />
        <Text style={styles.IconTextBlock}>
          <FontAwesomeIcon style={styles.IconText} icon={faLock} />
        </Text>
      </View>
      <View style={styles.inputOuterView}>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Enter the Confirm Password"
        />
        <Text style={styles.IconTextBlock}>
          <FontAwesomeIcon style={styles.IconText} icon={faLock} />
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.signupbtn}
          onPress={() => {
            console.log("Signup button pressed");
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonTextSignup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginbtn}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("Login button pressed");
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonTextLogin}>
            Already have an Account? Login now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: "700",
    textTransform: "capitalize",
    color: "#30c06b",
  },
  inputOuterView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    backgroundColor: "#f8f8f899",
    width: "80%",
    borderBottomColor: "#30c06b99",
    borderWidth: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRadius: 5,
    color: "#34344e",
  },
  signupbtn: {
    marginTop: 20,
    marginBottom: 50,
    width: 300,
    borderRadius: 5,
    backgroundColor: "#30c06b",
    color: "#ffffff",
  },
  buttonTextSignup: {
    textAlign: "center",
    color: "#ffffff",
    padding: 10,
    fontSize: 16,
  },
  IconTextBlock: {
    padding: 10,
  },
  textAreaInput: {
    padding: 10,
  },
  IconText: {
    color: "#30c06b99",
  },
});
