import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./app/Screens/WelcomeScreen";
import saveConfig from "./app/Screens/Config";
import createTables from "./app/Screens/DatabaseSetup";
import HomeScreen from "./app/Screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

export default function App() {
  const Stack = createStackNavigator();

  // For Testing if config object is being generated
  // useEffect(() => {
  //   testSaveConfig(); // Call the function here
  // }, []);

  // const testSaveConfig = async () => {
  //   try {
  //     await saveConfig();
  //     console.log("saveConfig function executed successfully");
  //   } catch (error) {
  //     console.error("Error testing saveConfig:", error);
  //   }
  // };
  // The lines of above code are for testing purposes only

  useEffect(() => {
    checkFirstTimeLaunch();
  }, []);

  const checkFirstTimeLaunch = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem("isFirstTime");
      if (!isFirstTime) {
        await saveConfig();
        await createTables();
        await AsyncStorage.setItem("isFirstTime", "true");
        console.log(checkFirstTimeLaunch);
      }
    } catch (error) {
      console.error("Error checking first time launch:", error);
    }
  };
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Welcome">
  //       <Stack.Screen name="Welcome" component={WelcomeScreen} r />
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  // return <WelcomeScreen />;
  return <HomeScreen />;
}
