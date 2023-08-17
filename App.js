import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./app/Screens/WelcomeScreen";
import saveConfig from "./app/Screens/Config";
import createTables from "./app/Screens/DatabaseSetup";
import HomeScreen from "./app/Screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SideDrawer from "./app/Screens/SideDrawer";
import "react-native-gesture-handler";

export default function App() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

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
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={SideDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return (
  //   <NavigationContainer>
  //     <Drawer.Navigator
  //       initialRouteName="Welcome"
  //       screenOptions={{ headerShown: false }}
  //     >
  //       <Drawer.Screen name="Welcome" component={WelcomeScreen} />
  //       <Drawer.Screen name="Home" component={HomeScreen} />
  //     </Drawer.Navigator>
  //   </NavigationContainer>
  // );

  // return <WelcomeScreen />;
  // return <HomeScreen />;
}
