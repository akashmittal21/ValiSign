import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useNavigation } from "@react-navigation/native";

function TransactionHistory() {
  return (
    <ImageBackground
      source={require("../assets/login/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/HomeScreen/valisign.png")}
          style={styles.logo}
        />
        <View style={styles.line} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: "flex-start",
    qpaddingBottom: 20, // Add paddingBottom to push content up
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#FCFCFC",
    width: "90%",
    alignSelf: "center",
    marginTop: -14,
  },
  logo: {
    width: "55%",
    height: 100,
    // marginTop: 50,
    alignSelf: "center",
    resizeMode: "contain", // Use resizeMode to fit the image within the container
  },
});

export default TransactionHistory;
