import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./app/Screens/WelcomeScreen";
import saveConfig from "./app/Screens/Config";
import HomeScreen from "./app/Screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  useEffect(() => {
    testSaveConfig(); // Call the function here
  }, []);

  const testSaveConfig = async () => {
    try {
      await saveConfig();
      console.log("saveConfig function executed successfully");
    } catch (error) {
      console.error("Error testing saveConfig:", error);
    }
  };

  return <WelcomeScreen />;
  // return <HomeScreen />;
}
