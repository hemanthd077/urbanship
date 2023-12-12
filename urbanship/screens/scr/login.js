import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_URL_RN } from "@env";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faGoogle,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useFocusEffect } from "@react-navigation/native";
import Axios from "axios";

const Login = ({ navigation }) => {
  const [userData, setUserDatas] = useState({ email: "", password: "" });
  const [uploadStatus, setUploadStatus] = useState(false);

  const AssignValue = (text, fieldName) => {
    const updatedUserData = { ...userData, [fieldName]: text };
    setUserDatas(updatedUserData);
  };

  async function getLogin(e) {
    console.log("Login button pressed");
    e.preventDefault();
    try {
      console.log(BASE_URL_RN+"login");
      await Axios.post(`${BASE_URL_RN}login`, {
        userData: userData,
      }).then((response) => {
        if (response.status === 200) {
          navigation.navigate("Home");
        }
      });
    } catch (e) {
      console.log("Login Error : ", e);
      if (e.response.status === 401) {
        setUploadStatus(e.response.data.message);
        setUserDatas((oldVAlue) => {
          return { ...oldVAlue, password: "" };
        });
      } else {
        setUploadStatus(e.response.data.message);
        setUserDatas((oldVAlue) => {
          return { ...oldVAlue, password: "" };
        });
        setUserDatas((oldVAlue) => {
          return { ...oldVAlue, email: "" };
        });
      }
    }
  }

  useEffect(() => {}, [uploadStatus]);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          return true;
        }
      );
      return () => backHandler.remove();
    }, [])
  );

  return (
    <View style={styles.Container}>
      <Text style={styles.header}>login</Text>
      <View style={styles.inputOuterView}>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Enter the Email-Id"
          onChangeText={(email) => AssignValue(email, "email")}
          value={userData["email"]}
        />
        <Text style={styles.IconTextBlock}>
          <FontAwesomeIcon style={styles.IconText} icon={faUser} />
        </Text>
      </View>
      <View style={styles.inputOuterView}>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Enter the Password"
          secureTextEntry={true}
          onChangeText={(password) => AssignValue(password, "password")}
          value={userData["password"]}
        />
        <Text style={styles.IconTextBlock}>
          <FontAwesomeIcon style={styles.IconText} icon={faLock} />
        </Text>
      </View>
      <View style={styles.forgetbtn}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("Forget button pressed");
            // navigation.navigate('Signup')
          }}
        >
          <Text style={styles.buttonTextforgetPwd}>Forget Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.WarningOuterBox}>
        {uploadStatus ? (
          <Text style={styles.WarningBox}>Login Failed</Text>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.buttonOuterView}>
        <TouchableOpacity style={styles.loginbtn} onPress={getLogin}>
          <Text style={styles.buttonTextLogin}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.OrContainerBlock}>
        <View style={styles.horizontalLine} />
        <Text>Or</Text>
        <View style={styles.horizontalLine} />
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("Google Signin button pressed");
          // navigation.navigate('Home')
        }}
      >
        <View style={styles.buttonOuterContainer}>
          <Text style={styles.buttonGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} style={styles.googleIcon} />
          </Text>
          <Text style={styles.buttonTextGoogleLogin}>Continue with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log("Twitter Signin button pressed");
          // navigation.navigate('Home')
        }}
      >
        <View style={styles.buttonOuterContainer}>
          <Text style={styles.buttonTwitterLogin}>
            <FontAwesomeIcon icon={faXTwitter} style={styles.googleIcon} />
          </Text>
          <Text style={styles.buttonTextTwitterLogin}>
            Continue with Twitter
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log("Facebook Signin button pressed");
          // navigation.navigate('Home')
        }}
      >
        <View style={styles.buttonOuterContainer}>
          <Text style={styles.buttonFBLogin}>
            <FontAwesomeIcon icon={faFacebook} style={styles.googleIcon} />
          </Text>
          <Text style={styles.buttonTextFBLogin}>Continue with Facebook</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.signupbtn}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("Signup button pressed");
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.buttonTextSignup}>
            Don't have an account? Create now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    gap: 20,
  },
  WarningBox: {
    color: "#ffffff",
    justifyContent: "center",
    padding: 7,
  },
  WarningOuterBox: {
    borderRadius: 5,
    backgroundColor: "#FF000099",
    color: "#ffffff",
    marginTop: 10,
    marginBottom: -40,
    width: 300,
    alignItems: "center",
  },
  textAreaInput: {
    minWidth: 260,
    height: 50,
    padding: 10,
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
  buttonOuterContainer: {
    flexDirection: "row",
  },
  buttonOuterView: {
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
  },
  IconText: {
    color: "#30c06b99",
  },
  IconTextBlock: {
    padding: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: "700",
    textTransform: "capitalize",
    color: "#30c06b",
  },
  horizontalLine: {
    borderBottomWidth: 2,
    borderColor: "#34344e",
    opacity: 0.1,
    width: "30%",
  },
  OrContainerBlock: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    color: "#34344e",
  },
  loginbtn: {
    width: 300,
    borderRadius: 5,
    backgroundColor: "#30c06b",
    color: "#ffffff",
  },
  signupbtn: {
    marginTop: 60,
    marginBottom: -120,
  },
  buttonTextLogin: {
    textAlign: "center",
    color: "#ffffff",
    padding: 10,
    fontSize: 16,
  },
  buttonTextSignup: {
    textAlign: "center",
    padding: 10,
    color: "#3a415a",
    fontSize: 14,
  },
  buttonGoogleLogin: {
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#DB4437",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonTwitterLogin: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#000",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonFBLogin: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#0866FF",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 35,
  },
  buttonTextGoogleLogin: {
    borderWidth: 1,
    padding: 7,
    color: "#DB4437",
    borderColor: "#DB4437",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 170,
  },
  buttonTextTwitterLogin: {
    borderWidth: 1,
    padding: 7,
    color: "#000000",
    borderColor: "#000000",
    width: 170,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonTextFBLogin: {
    borderWidth: 1,
    padding: 7,
    color: "#0866FF",
    borderColor: "#0866FF",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 170,
  },
  googleIcon: {
    color: "#ffffff",
  },
  forgetbtn: {
    flexDirection: "row",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 320,
    marginTop: -15,
    marginBottom: -20,
  },
  buttonTextforgetPwd: {
    color: "#3a415a",
    fontSize: 14,
  },
});
