import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, View } from "react-native";
import HomeScreen from "./HomeScreen";
import TransactionHistory from "./TransactionHistory";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";

function SideDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const Drawer = createDrawerNavigator();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Drawer.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Login" component={HomeScreen} />
      <Drawer.Screen name="History" component={TransactionHistory} />
      {/* Add more screens for the drawer */}
    </Drawer.Navigator>
  );
}

export default SideDrawer;
