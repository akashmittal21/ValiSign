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
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, StackActions } from "@react-navigation/native";
import selectableThemes, { useThemeSelect } from "./ThemeSelect";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Settings() {
  const navigation = useNavigation();

  const [lang, selectLang] = useState(null);
  const [animationValue] = useState(new Animated.Value(1));

  const language = [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
    { label: "Hindi", value: "hindi" },
    // Add more options as needed
  ];

  const selectThemes = [
    { label: "Blue", value: "blue" },
    { label: "Pink", value: "pink" },
  ];

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

  const { theme, toggleTheme } = useThemeSelect();

  // Update theme and persist it in AsyncStorage
  const handleThemeChange = async (newTheme) => {
    toggleTheme(newTheme); // Update theme in context
    try {
      await AsyncStorage.setItem("selectedTheme", JSON.stringify(newTheme)); // Save theme to AsyncStorage
    } catch (error) {
      console.error("Error saving selected theme:", error);
    }
  };

  return (
    <ImageBackground
      source={selectableThemes[theme].backgroundImage}
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
        {/* Language Select */}
        <View style={styles.dropdownContainer}>
          <View style={styles.rowContainer}>
            <Text style={[styles.label, styles.labelFlex]}>Theme</Text>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.shadow}
              data={selectThemes}
              labelField="label"
              valueField="value"
              placeholder="Select Theme"
              value={theme}
              onChange={handleThemeChange}
              // search={true}
            />
          </View>
        </View>

        {/* Theme */}
        {/* <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Theme</Text> */}
        {/* <Dropdown
            options={[
              { label: "Light Theme", value: "light" },
              { label: "Dark Theme", value: "dark" },
              // Add more theme options as needed
            ]}
            onSelect={(value) => {
              // Handle theme selection here
              console.log("Selected theme:", value);
            }}
          /> */}
        {/* </View> */}
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
  dropdown: {
    width: "70%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  dropdownContainer: {
    marginVertical: 20,
    paddingHorizontal: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  labelFlex: {
    flex: 1, // Let the label take up a proportionally smaller width
  },
  rowContainer: {
    flexDirection: "row",
    // alignItems: "center",
    // alignSelf: "center",
    justifyContent: "center",
  },
});

export default Settings;
