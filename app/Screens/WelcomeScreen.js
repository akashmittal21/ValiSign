import {
  Button,
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";
import Fontiso from "react-native-vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { fetchUserDataAndDeviceID } from "./DatabaseSetup";
import { decryptData, encryptData, makeApiRequest } from "./AppUtil";

let listOfApplications = [];
let userID = "";
let token = "";

function WelcomeScreen() {
  const navigation = useNavigation();

  const handleLogin = async () => {
    const userDetails = {
      username: IdEmailNum,
      password: IdPassword,
    };

    const userDetailsString = JSON.stringify(userDetails);

    setLoading(true);

    try {
      const result = await fetchUserDataAndDeviceID();

      if (result) {
        const { userDataKey, valiSignDeviceID } = result;

        const encryptedCredentials = encryptData(
          userDetailsString,
          userDataKey
        );

        const payload = {
          identifier: valiSignDeviceID,
          data: encryptedCredentials,
        };

        console.log(payload);

        const API_URL = "https://dev1.valisign.aitestpro.com/auth/signIn";
        const loginResponse = await makeApiRequest(API_URL, payload);

        // console.log(listOfApplications);

        // console.log(typeof loginResponse);

        if (loginResponse.message === "Sign-in successful") {
          const listOfApplicationString = decryptData(
            loginResponse.data,
            userDataKey
          );
          console.log(listOfApplicationString);

          const loa = JSON.parse(listOfApplicationString).ListOFApplication;
          userID = JSON.parse(listOfApplicationString).userId;
          token = JSON.parse(listOfApplicationString).token;
          listOfApplications = loa;

          navigation.navigate("Home");
        } else {
          Alert.alert("Login failed! Please check your username/password");
        }
      } else {
        console.log("No user data and device ID found.");
      }
    } catch (error) {
      Alert.alert("Login Failed! Please check your username/password");
      // console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }

    // navigation.navigate("Home");
  };

  const [IdText, onChangeID] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [IdEmailNum, onChangeText] = React.useState("");
  const [IdPassword, onChangePassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  return (
    <ImageBackground
      source={require("../assets/login/background.png")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <Image
              source={require("../assets/login/ValisignLogo.png")}
              style={styles.logo}
            />
            <View style={styles.inputContainer}>
              <FeatherIcons name="user" size={20} padding={10} />
              <TextInput
                style={styles.input}
                autoCorrect={false}
                onChangeText={onChangeText}
                value={IdEmailNum}
                placeholder="Email ID/ Mobile Number"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <FeatherIcons name="unlock" size={20} padding={10} />
              <TextInput
                autoFocus={true}
                autoCorrect={false}
                style={styles.input}
                onChangeText={onChangePassword}
                value={IdPassword}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                blurOnSubmit={true}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <FeatherIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <Feather.Button
                name="log-in"
                style={[styles.button, (width = "100%")]}
                backgroundColor="#242c64"
                borderRadius={10}
                onPress={handleLogin}
              >
                {loading ? "Logging In..." : "Login"}
              </Feather.Button>
            </View>
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => Alert.alert("Forgot Password!")}
            >
              <Fontiso name="locked" color={"white"} />
              <Text style={styles.text}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <Text style={styles.footerText}>Powered By Ideabytes®</Text> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  button: {
    height: 50,
    // width:  '100%',
    alignSelf: "center",
  },
  buttonContainer: {
    // alignContent: 'center',
    // alignItems: 'center',
    // top: 400,
    marginTop: 5,
    alignSelf: "center",
    // alignItems: 'center',
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    // padding: 10
  },
  container: {
    flex: 1,
  },
  footerText: {
    justifyContent: "center",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "baseline",
    marginLeft: -200,
  },
  formContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    position: "relative",
    height: 50,
    width: "80%",
    // borderRadius: ,
    // top: 100
  },
  inputContainer: {
    alignSelf: "center",
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    marginBottom: 10,
  },
  logo: {
    position: "relative",
    // top: 114,
    marginTop: 114,
    marginBottom: 120,
    left: 17,
    alignSelf: "center",
  },
  text: {
    color: "white",
    marginLeft: 10,
    // position: 'relative',
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
export { listOfApplications, userID, token };
