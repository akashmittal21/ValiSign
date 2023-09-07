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
import { fetchUserDataAndDeviceID } from "./app/Screens/DatabaseSetup";
import {
  decryptData,
  encryptData,
  makeApiRequest,
} from "./app/Screens/AppUtil";

export default function App() {
  const Stack = createStackNavigator();

  useEffect(() => {
    checkFirstTimeLaunch();
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
