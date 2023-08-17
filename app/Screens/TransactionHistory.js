import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TransactionStatusColors = {
  success: "#00AA00",
  pending: "#FFA500",
  failed: "#FF0000",
};

function TransactionCard({ date, time, appName, status, message }) {
  const statusColor = TransactionStatusColors[status] || "#000";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{date}</Text>
        {/* <Text style={styles.time}>{time}</Text> */}
        <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
      </View>
      <Text style={styles.appName}>{appName}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

function TransactionHistory({ navigation }) {
  const [transactions, setTransactions] = useState([
    {
      date: "2023-08-17",
      time: "10:30 AM",
      appName: "Sample App 1",
      status: "success",
      message: "Transaction successful",
    },
    {
      date: "2023-08-16",
      time: "02:15 PM",
      appName: "Sample App 2",
      status: "success",
      message: "Payment processing",
    },
    {
      date: "2023-08-15",
      time: "08:45 AM",
      appName: "Sample App 3",
      status: "failed",
      message: "Changed the transaction",
    },
    // Add more transactions as needed
  ]);

  const sortTransactionsByDate = () => {
    const sortedTransactions = [...transactions].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    setTransactions(sortedTransactions);
  };

  const sortTransactionsByAppName = () => {
    const sortedTransactions = [...transactions].sort((a, b) =>
      a.appName.localeCompare(b.appName)
    );
    setTransactions(sortedTransactions);
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
        <View style={styles.headingContainer}>
          {/* <Text style={styles.heading}>Transaction History</Text> */}
          {/* <TouchableOpacity
            onPress={sortTransactionsByDate}
            style={styles.sortButton}
          >
            <MaterialIcons name="sort" size={24} color="#FFF" />
            <Text style={styles.sortButtonText}>Sort by Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={sortTransactionsByAppName}
            style={styles.sortButton}
          >
            <MaterialIcons name="sort" size={24} color="#FFF" />
            <Text style={styles.sortButtonText}>Sort by App Name</Text>
          </TouchableOpacity> */}
        </View>
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <TransactionCard
              date={item.date}
              time={item.time}
              appName={item.appName}
              status={item.status}
              message={item.message}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    alignSelf: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  date: {
    fontSize: 14,
    color: "#333",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    alignSelf: "center",
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
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
    resizeMode: "contain",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  message: {
    fontSize: 14,
    color: "#888",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },
  sortButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#333",
  },
});

export default TransactionHistory;
