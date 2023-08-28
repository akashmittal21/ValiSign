import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./app/Screens/WelcomeScreen";
import saveConfig from "./app/Screens/Config";
import createTables from "./app/Screens/DatabaseSetup";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SideDrawer from "./app/Screens/SideDrawer";
import { ThemeProvider } from "./app/Screens/ThemeSelect";
import "react-native-gesture-handler";
import axios from "axios";

export default function App() {
  const Stack = createStackNavigator();

  useEffect(() => {
    checkFirstTimeLaunch();
    makeApiRequest();
  }, []);

  const checkFirstTimeLaunch = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem("isFirstTime");
      if (!isFirstTime) {
        await createTables();
        await saveConfig();

        await AsyncStorage.setItem("isFirstTime", "true");
        console.log("First time launch complete");
      }
    } catch (error) {
      console.error("Error checking first time launch:", error);
    }
  };

  const makeApiRequest = async () => {
    try {
      const API_URL = "https://dev1.valisign.aitestpro.com/app/configure";

      // const response = await axios.post(API_URL, {
      //   version: "0.0.1",
      //   deviceType: "iOS",
      //   data: "GtM6TDI0pbaUT7wlcgj6HiL5BpIAZeRpzwO0ljFGLa0CGSG+XnFXFSrN9N7kJn0F2M2SAyKeZrSREiZoQyrsDO1iaoPotzfYW02UzCyGQUG9YLH+vASlycvEPk3M9snG4MD48ebhBRn8OLlYrTMdE2fgqeYuNML1fSZY9WkWi9ZP2PMCm3cYsamskNJicuQ9Q4+hWEBQIMR5fFuH/ftTvySHd8TWnc04wG0D+aMNo1rSVCSkz7ZwYiIWW5MgXqSA+D7QhXjOvildqJKwzhp6K6NIkI2WwAyRltzsmmajeagiU+47ZyRBwrKMv0CIXW2T",
      // });
      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  return (
    <ThemeProvider defaultTheme="">
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={SideDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

// For Testing if config object is being generated
// useEffect(() => {
// testSaveConfig(); // Call the function here
// }, []);

// const testSaveConfig = async () => {
// await saveConfig();
//   try {
//     await createTables();
//     await saveConfig();
//     console.log("saveConfig function executed successfully");
//   } catch (error) {
//     console.error("Error testing saveConfig:", error);
//   }
// };
// The lines of above code are for testing purposes only
