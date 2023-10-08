import {
  StyleSheet,
  Text,
  View,
  Image as Img,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleRight,
  faCreditCard,
  faHeart,
  faLocationDot,
  faLock,
  faPenToSquare,
  faRightFromBracket,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ProfileHeaderBlock}>
        <Img
          source={require("../../assets/images/profile-icon.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Urban ship</Text>
        <Text style={styles.Email}>urbanship@gmail.com</Text>
        <Text style={styles.MobileNumber}>+91 6123456786</Text>
        <TouchableOpacity
          style={styles.editbutton}
          onPress={() => {
            console.log("Edit button pressed");
          }}
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={styles.buttonIconColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.ProfileContentBlock}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("Change Password button pressed");
          }}
        >
          <View style={styles.rowFlex}>
            <FontAwesomeIcon icon={faLock} style={styles.buttonIconColor} />
            <Text style={styles.buttonTextforgetPwd}>Change Password</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("Payment button pressed");
          }}
        >
          <View style={styles.rowFlex}>
            <FontAwesomeIcon
              icon={faCreditCard}
              style={styles.buttonIconColor}
            />
            <Text style={styles.buttonTextforgetPwd}>Payment</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("Address button pressed");
          }}
        >
          <View style={styles.rowFlex}>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={styles.buttonIconColor}
            />
            <Text style={styles.buttonTextforgetPwd}>Delivery Address</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("Favourites button pressed");
          }}
        >
          <View style={styles.rowFlex}>
            <FontAwesomeIcon icon={faHeart} style={styles.buttonIconColor} />
            <Text style={styles.buttonTextforgetPwd}>Favourites</Text>
          </View>
          <FontAwesomeIcon icon={faAngleRight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("logout button pressed");
          }}
        >
          <View style={styles.rowFlex}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={styles.faRightFromBracket}
            />
            <Text style={styles.buttonTextforgetPwd}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "flex-start",
  },
  userName: {
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: "#30c06b",
  },
  Email: {
    textTransform: "lowercase",
    fontSize: 15,
  },
  MobileNumber: {
    fontSize: 15,
    fontWeight: "400",
    marginTop: 5,
    opacity: 0.5,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginTop:10,
  },
  ProfileThumbnail: {
    opacity: 0.7,
    backgroundColor: "#cccccc",
  },
  ProfileHeaderBlock: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 20,
  },
  ProfileContentBlock: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    gap: 10,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    gap: 10,
    padding: 15,
  },
  rowFlex: {
    flexDirection: "row",
    gap: 10,
  },
  faRightFromBracket: {
    transform: [{ rotateY: "180deg" }],
    color: "#30c06b",
  },
  buttonIconColor: {
    color: "#30c06b",
  },
  editbutton: {
    position: "absolute",
    right: 30,
    bottom: 10,
  },
});
