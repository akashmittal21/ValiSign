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
  FlatList,
  Animated,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, StackActions } from "@react-navigation/native";

const TransactionStatusColors = {
  Success: "#00AA00",
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
        {/* <Text style={[styles.status, { color: statusColor }]}>{status}</Text> */}
      </View>
      <Text style={styles.appName}>{appName}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

function TransactionHistory() {
  const [transactions, setTransactions] = useState([
    {
      date: "2023-08-17",
      time: "10:30 AM",
      appName: "GroupBenifitz",
      status: "Success",
      message:
        "Changed password, updated account details and updated broker information",
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

  const navigation = useNavigation();

  const [expandedTransaction, setExpandedTransaction] = useState(null);

  const [animationValue] = useState(new Animated.Value(1));

  const handleRowPress = (transaction) => {
    setExpandedTransaction(
      expandedTransaction === transaction ? null : transaction
    );
  };

  useEffect(() => {
    // Reset expanded transaction when the component mounts
    setExpandedTransaction(null);
  }, []);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  //
  const sortTransactionsByDate = () => {
    const sortedTransactions = [...transactions].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    setTransactions(sortedTransactions);
  };

  // TODO: Add mutli-app selection support
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
          <TouchableOpacity
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
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.dispatch(StackActions.replace("Home"))}
          >
            <MaterialCommunityIcons name="home" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <Text style={styles.heading}>Transaction History</Text>
        <View style={styles.tableContainer}>
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <React.Fragment>
                <TouchableOpacity
                  onPress={() => handleRowPress(item)}
                  style={[
                    styles.row,
                    expandedTransaction === item && styles.rowExpanded,
                  ]}
                >
                  <Text style={styles.rowText}>{formatDate(item.date)}</Text>
                  <Text style={styles.rowText}>{item.appName}</Text>
                  <Text
                    style={[
                      styles.rowText,
                      styles.statusText,
                      { color: TransactionStatusColors[item.status] },
                    ]}
                  >
                    {item.status}
                  </Text>
                </TouchableOpacity>
                {expandedTransaction === item && (
                  <TransactionCard
                    date={item.date}
                    time={item.time}
                    appName={item.appName}
                    status={item.status}
                    message={item.message}
                  />
                )}
              </React.Fragment>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
    color: "white",
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "#FFF",
  },
  rowExpanded: {
    borderBottomWidth: 0,
    backgroundColor: "lightgrey",
  },
  rowText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
  },
  statusText: {
    fontWeight: "bold",
  },
  expandedCard: {
    position: "absolute",
    top: "100%",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableContainer: {
    flex: 1,
    // maxHeight: 300,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
    overflow: "hidden",
  },
});

export default TransactionHistory;
