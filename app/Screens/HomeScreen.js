import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { listOfApplications } from "./WelcomeScreen";
import { useNavigation } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  const application = listOfApplications.map((app) => ({
    label: app.name,
    value: app.id, // Convert id to a string if needed
  }));

  // const application = [
  //   { label: "GroupBenefitz", value: "groupbenefits" },
  //   { label: "DGSMS", value: "dgsms" },
  //   // Add more options as needed
  // ];

  const [dropdown, selectDropdown] = useState(null);
  const [select, selected] = useState(null);

  // const windowWidth = Dimensions.get("window").width;b
  const [showPopup, setShowPopup] = useState(false);
  const [countdownTIme, setCountdownTIme] = useState(60);
  const [code, setCode] = useState("");

  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const popupOpacity = useRef(new Animated.Value(0)).current;
  const popupScale = useRef(new Animated.Value(1)).current;
  const buttonBackgroundColor = useRef(new Animated.Value(0)).current;

  const [message, setMessage] = useState(
    "Changed password, updated account details and updated broker information"
  );

  const handleValisginCode = () => {
    const generateCode = "ABCD123";
    setCode(generateCode);

    // Animate the button into the popup
    Animated.parallel([
      Animated.timing(popupScale, {
        // toValue: 1.8, // Enlarge the scale
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(popupOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowPopup(true);
      // Animate the popup content
      Animated.parallel([
        Animated.timing(popupOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(popupScale, {
          toValue: 1,
          duration: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const closePopup = () => {
    // Animate the popup content out
    Animated.parallel([
      Animated.timing(popupOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(popupScale, {
        // toValue: 1.2, // Enlarge the scale
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowPopup(false);
      // Animate the button back in
      Animated.parallel([
        Animated.timing(popupScale, {
          toValue: 1,
          duration: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(popupOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleOnComplete = () => {
    // Start the popup animation when the countdown completes
    Animated.timing(popupOpacity, {
      toValue: 0,
      duration: 300, // Animation duration (in milliseconds)
      useNativeDriver: true,
    }).start(() => {
      setShowPopup(false);
      setCode("");
    });
  };

  const handleDropdownChange = (item) => {
    selectDropdown(item.value);
    setIsOptionSelected(true);

    // Animate button opacity
    Animated.timing(buttonBackgroundColor, {
      toValue: 1,
      duration: 300, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  };

  const buttonBackgroundColorInterpolation = buttonBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#BFBFBF", "#242c64"], // Grayed out to colored background color
  });

  return (
    <ImageBackground
      source={require("../assets/login/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity // Add TouchableOpacity to handle the dismissal of the popup
            style={styles.menuIcon}
            onPress={() => navigation.openDrawer()}
          >
            <MaterialCommunityIcons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/HomeScreen/valisign.png")}
              style={styles.logo}
            />
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={application}
            labelField="label"
            valueField="value"
            placeholder="Select Application"
            value={dropdown}
            onChange={handleDropdownChange}
            // search={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          {/* Button */}
          {!showPopup && (
            <Animated.View
              style={[
                styles.getCodeButton,
                {
                  // width: windowWidth * 0.45,
                  transform: [{ scale: popupScale }],
                  backgroundColor: buttonBackgroundColorInterpolation,
                },
              ]}
            >
              <TouchableOpacity
                onPress={handleValisginCode}
                disabled={!isOptionSelected}
                style={styles.buttonCenterContainer}
              >
                <Text style={styles.buttonText}>Get ValiSign Code</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
      {/* This is going to be the popup that displays the code. */}
      {showPopup && (
        <Animated.View
          style={[styles.popupContainer, { opacity: popupOpacity }]}
        >
          {/* <TouchableOpacity // Add TouchableOpacity to handle the dismissal of the popup
            style={styles.closeIconContainer}
            onPress={closePopup}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={24}
              color="white"
            />
          </TouchableOpacity> */}
          <View style={styles.popupContent}>
            <Text style={styles.headerText}>
              GroupBenefitz wants you to validate the following transaction
            </Text>
            <View style={styles.transactionContainer}>
              <Text style={styles.transactionText}>{message}</Text>
            </View>
            <Text style={styles.codeHeaderText}>Your ValiSign Code is</Text>
            <View style={styles.codeContainer}>
              {code.split("").map((char, index) => (
                <View key={index} style={styles.codeBox}>
                  <Text style={styles.codeText}>{char}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.timerText}>Expiring in</Text>
            <View style={styles.countdownContainer}>
              <CountdownCircleTimer
                isPlaying
                duration={countdownTIme}
                colors={["#FFF", "#FF3F3F", "#FF1919"]}
                colorsTime={[60, 55, 0]}
                onComplete={handleOnComplete}
                isSmoothColorTransition={true}
                updateInterval={1}
                size={90}
              >
                {({ remainingTime }) => (
                  <Text style={styles.countdownText}>{remainingTime}</Text>
                )}
              </CountdownCircleTimer>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={closePopup} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closePopup} style={styles.doneButton}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  additionalText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    // marginTop: 20,
    // marginBottom: -10, // Add some margin to create space between the countdown and the text
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonCenterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    // marginLeft: 5,
    padding: 10,
  },
  closeIconContainer: {
    position: "relative",
    // top: 10,
    left: "40%",
    top: 30,
    // padding: 5,
    borderRadius: 15,
    // backgroundColor: "white",
    zIndex: 1, // Make sure the icon appears above the popup content
  },
  cancelButton: {
    // flex: 1,
    // marginTop: 40,
    backgroundColor: "#FF3F3F",
    justifyContent: "center",
    alignSelf: "center",
    // borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
  codeBox: {
    width: 40,
    height: 54,
    margin: 5,
    backgroundColor: "white",
    borderColor: "#004E8E",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  codeContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "center",
    flexWrap: "nowrap",
    paddingHorizontal: 20,
  },
  codeHeaderText: {
    marginTop: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  codeText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: "flex-start",
    qpaddingBottom: 20, // Add paddingBottom to push content up
  },
  countdownContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  countdownText: {
    fontSize: 30,
    fontWeight: "bold",
    // marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#BFBFBF", // Grayed out background color
    borderColor: "#BFBFBF",
  },
  doneButton: {
    // flex: 1,
    // marginTop: 40,
    backgroundColor: "#1b91ff",
    justifyContent: "center",
    alignSelf: "center",
    // borderColor: "white",
    borderRadius: 10,
    // borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: 40,
  },
  doneText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
  dropdownContainer: {
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 7,
    paddingLeft: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  getCodeButton: {
    // width: "45%",
    // borderColor: "white",
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#004E8E",
    alignSelf: "center",
    // margin: 260, // make the change here to add it to the middle of the screen
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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
    alignSelf: "center",
    resizeMode: "contain", // Use resizeMode to fit the image within the container
  },
  logoContainer: {
    flex: 1, // Occupy remaining space to center the logo
    alignItems: "center", // Center the logo horizontally
  },
  popupContent: {
    backgroundColor: "#242c64",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    // borderColor: "white", // Match the background color for a seamless look
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  timerText: {
    marginTop: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  transactionContainer: {
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  transactionText: {
    // backgroundColor: "white",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    // marginTop: 10,
    padding: 10,
  },
});

export default HomeScreen;
