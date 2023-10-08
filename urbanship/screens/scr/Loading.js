import React, { useEffect, useRef } from "react";
import { StyleSheet, Image, Animated, Easing, View } from "react-native";

function AppLogo({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      navigation.navigate("Login");
    }, 2000);

    setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={require("../../assets/logo-no-background.png")}
          style={{ width: 250, height: 55 }}
        />
      </Animated.View>
    </View>
  );
}

export default AppLogo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: -70,
    justifyContent: "center",
  },
});
