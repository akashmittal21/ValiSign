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

function WelcomeScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Home");
  };

  const [IdText, onChangeID] = React.useState("");
  const [IdEmailNum, onChangeText] = React.useState("");
  const [IdPassword, onChangePassword] = React.useState("");

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
            {/* <Text style={styles.text}>Login</Text> */}
            {/* <View style={styles.inputContainer}>
                            <FeatherIcons name='user' size={20} padding={10}/>
                            <TextInput 
                                style={styles.input} 
                                autoCorrect = {false}
                                onChangeText={onChangeID} 
                                value={IdText}
                                placeholder='ValiSign ID'
                                autoCapitalize='none'
                            />
                        </View> */}
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
                blurOnSubmit={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Feather.Button
                name="log-in"
                style={[styles.button, (width = "100%")]}
                backgroundColor="#004E8E"
                borderRadius={10}
                onPress={handleLogin}
              >
                Login
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
    width: "70%",
    // borderRadius: ,
    // top: 100
  },
  inputContainer: {
    // top: 400,
    // left: 40,
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
