import React, { useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import HomeScreen from "./HomeScreen";
import TransactionHistory from "./TransactionHistory";
import Settings from "./Settings";
import AntDesign from "react-native-vector-icons/AntDesign";

function CustomDrawerContent({ navigation, state }) {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView style={{ marginTop: 20 }}>
        {/* <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.closeDrawer()}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity> */}
        <DrawerItem
          label="Home"
          onPress={() => navigateToScreen("Login")}
          style={[
            styles.drawerItem,
            state.routeNames[state.index] === "Login" &&
              styles.selectedDrawerItem,
          ]}
          labelStyle={[
            styles.drawerLabel,
            state.routeNames[state.index] === "Login" &&
              styles.selectedDrawerLabel,
          ]}
        />
        <DrawerItem
          label="Transaction History"
          onPress={() => navigateToScreen("History")}
          style={[
            styles.drawerItem,
            state.routeNames[state.index] === "History" &&
              styles.selectedDrawerItem,
          ]}
          labelStyle={[
            styles.drawerLabel,
            state.routeNames[state.index] === "History" &&
              styles.selectedDrawerLabel,
          ]}
        />
        <DrawerItem
          label="Settings"
          onPress={() => navigateToScreen("Settings")}
          style={[
            styles.drawerItem,
            state.routeNames[state.index] === "Settings" &&
              styles.selectedDrawerItem,
          ]}
          labelStyle={[
            styles.drawerLabel,
            state.routeNames[state.index] === "Settings" &&
              styles.selectedDrawerLabel,
          ]}
        />
        {/* Add more DrawerItems for additional screens */}
      </DrawerContentScrollView>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

function SideDrawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#f7f7f7",
          width: 240,
        },
        swipeEnabled: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Login" component={HomeScreen} />
      {/* <Drawer.Screen name="Login">
        {(props) => <HomeScreen {...props} navigation={props.navigation} />}
      </Drawer.Screen> */}
      <Drawer.Screen name="History" component={TransactionHistory} />
      <Drawer.Screen name="Settings" component={Settings} />
      {/* Add more screens for the drawer */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  closeButton: {
    padding: 16,
    alignSelf: "flex-end",
  },
  drawerItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
  },
  logoutButton: {
    width: "80%",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    padding: 16,
    alignSelf: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 30,
    backgroundColor: "#e74c3c", // Red color
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  selectedDrawerItem: {
    backgroundColor: "#b3d9ff", // Light blue background for selected tab
  },
  selectedDrawerLabel: {
    color: "#007AFF", // Blue color for selected tab label
  },
});

export default SideDrawer;
