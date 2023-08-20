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
  Easing,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useNavigation } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  const application = [
    { label: "GroupBenfitz", value: "groupbenefits" },
    { label: "DGSMS", value: "dgsms" },
    // Add more options as needed
  ];

  const [dropdown, selectDropdown] = useState(null);
  const [select, selected] = useState(null);

  // const windowWidth = Dimensions.get("window").width;
  const [showPopup, setShowPopup] = useState(false);
  const [countdownTIme, setCountdownTIme] = useState(60);
  const [code, setCode] = useState("");

  const popupOpacity = useRef(new Animated.Value(0)).current;
  const popupScale = useRef(new Animated.Value(1)).current;

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
            onChange={(item) => selectDropdown(item.value)}
          />
        </View>
        <View style={styles.buttonContainer}>
          {/* Button */}
          {!showPopup && (
            <Animated.View
              style={[
                styles.getCodeButton,
                { transform: [{ scale: popupScale }] },
              ]}
            >
              <TouchableOpacity onPress={handleValisginCode}>
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
          <TouchableOpacity // Add TouchableOpacity to handle the dismissal of the popup
            style={styles.closeIconContainer}
            onPress={closePopup}
          >
            {/* Use MaterialIcons or other icons, or simply a Text with "X" */}
            <MaterialCommunityIcons
              name="close-circle"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <View style={styles.popupContent}>
            <View style={styles.countdownContainer}>
              <CountdownCircleTimer
                isPlaying
                duration={countdownTIme}
                colors={["#FFF", "#FF8C8C", "#FF6666", "#FF3F3F", "#FF1919"]}
                colorsTime={[60, 45, 30, 15, 0]}
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
            <Text style={styles.additionalText}>Your ValiSign Code is</Text>
            <View style={styles.codeContainer}>
              {code.split("").map((char, index) => (
                <View key={index} style={styles.codeBox}>
                  <Text style={styles.codeText}>{char}</Text>
                </View>
              ))}
            </View>
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
    marginTop: 20,
    marginBottom: -10, // Add some margin to create space between the countdown and the text
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  closeIconContainer: {
    position: "relative",
    // top: 10,
    left: 180,
    top: 30,
    // padding: 5,
    borderRadius: 15,
    // backgroundColor: "white",
    zIndex: 1, // Make sure the icon appears above the popup content
  },
  codeBox: {
    width: 40,
    height: 54,
    marginLeft: 10,
    backgroundColor: "white",
    borderColor: "#004E8E",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  codeContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    alignItems: "center",
  },
  countdownText: {
    fontSize: 30,
    fontWeight: "bold",
    // marginBottom: 10,
    textAlign: "center",
    color: "white",
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
    width: "45%",
    borderColor: "white",
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#004E8E",
    alignSelf: "center",
    margin: 260, // make the change here to add it to the middle of the screen
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    // backgroundColor: "#27bbff",
    backgroundColor: "#1b91ff",
    padding: 20,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
});

export default HomeScreen;
