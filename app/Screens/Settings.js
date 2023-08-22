import React, { useState, useEffect } from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, StackActions } from "@react-navigation/native";

function Settings() {
  const navigation = useNavigation();

  const [animationValue] = useState(new Animated.Value(1));

  const handleOnPress = () => {
    // Trigger the animation by updating the animation value
    Animated.timing(animationValue, {
      toValue: 0.8,
      duration: 10,
      useNativeDriver: true,
    }).start(() => {
      // After the animation is complete, navigate to the home screen
      navigation.dispatch(StackActions.replace("Home"));
    });
  };

  useEffect(() => {
    // Reset the animation value when the component mounts
    animationValue.setValue(1);
  }, []);

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
          <Animated.View
            style={[
              styles.menuIcon,
              { transform: [{ scale: animationValue }] },
            ]}
          >
            <TouchableOpacity // Add TouchableOpacity to handle the dismissal of the popup
              style={styles.menuIcon}
              onPress={handleOnPress}
            >
              <MaterialCommunityIcons name="home" size={24} color="white" />
            </TouchableOpacity>
          </Animated.View>
        </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
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
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Settings;
