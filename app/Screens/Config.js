import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import * as Location from "expo-location";
import {
  getEncryptionKeys,
  deleteLocalTable,
  storeFirstTimeUsage,
} from "./DatabaseSetup.js";
import { encryptData, decryptData, makeApiRequest } from "./AppUtil.js";

async function fetchEncryptionKeys() {
  let keys;
  try {
    keys = await getEncryptionKeys();
    // console.log("Encryption keys:", keys);
  } catch (error) {
    console.error("Error retrieving encryption keys:", error);
  }

  const tableToDelete = "EncryptionKeys";

  try {
    await deleteLocalTable(tableToDelete);
    console.log(`${tableToDelete} table deleted`);
  } catch (error) {
    console.log(`Error deleting ${tableToDelete} table:`, error);
  }

  return keys;
}

const generateRandomKey = () => {
  const keyLength = 32; // For AES-256 Bit Encrytion
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789^%$&./";
  let key = "";
  for (let i = 0; i < keyLength; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
};

const getLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console;
    if (status !== "granted") {
      console.error("Location permission not granted");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { latitude, longitude } = location.coords;
    return { latitude, longitude };
  } catch (error) {
    console.error("Error getting location:", error);
    return null;
  }
};

const generateConfig = async (firstDataKey) => {
  const version = "0.0.1";
  const deviceType = DeviceInfo.getSystemName();
  const deviceIp = await NetworkInfo.getIPAddress();
  const deviceLocation = await getLocation();
  // const firstDataKey = generateRandomKey(); // is going to be saved for further decryption stored in FirstTimeUsage LOCAL DATABASE

  const deviceId = await DeviceInfo.getUniqueId();
  const data = {
    checkPhrase: "ValiSign Calling",
    deviceId: deviceId,
    deviceType,
    deviceLocation,
    deviceIp,
    datakey: firstDataKey, // this key will be saved on the device after first configuration --- come from server
  };

  // Three keys:     1. One of the 8 keys ----> config api payload ----> random
  //                 2. Generated on the device -----> encrypt login information for first time login/ further logins (maybe) ----> random
  //                 3. Generated on the server -----> is going to be sent after first successful login ----> updated after a certain period of time based on security policy

  // Server data key -----> only sent during first time login (if login is successful) OR during security update (based on policy)----> further encryption of all data
  // is going to be stored on server side as well local database ----> subjected to change based on the security policy

  const encryptionKeys = await fetchEncryptionKeys();

  const randomEncryptionKey =
    encryptionKeys[Math.floor(Math.random() * encryptionKeys.length)];

  console.log("Encryption Key: ", randomEncryptionKey);

  const dataStr = JSON.stringify(data);

  console.log("data string: ", dataStr);

  const encryptedData = encryptData(dataStr, randomEncryptionKey);

  const config = {
    version,
    deviceType,
    data: encryptedData,
  };

  return config;
};

const saveConfig = async () => {
  //   validate the resposnse

  //   const text = { checkPhrase: "ValiSign Calling" };

  //   const jsonText = JSON.stringify(text);

  //   const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  //   let encrypted = cipher.update(jsonText, "utf8", "base64");

  //   encrypted += cipher.final("base64");

  //   console.log(encrypted);

  const tempKey = generateRandomKey();

  try {
    const config = await generateConfig(tempKey);
    const jsonConfig = JSON.stringify(config);
    await AsyncStorage.setItem("Config", jsonConfig);
    console.log("Config saved:", jsonConfig);

    const API_URL = "https://dev1.valisign.aitestpro.com/app/configure";

    configResponse = await makeApiRequest(API_URL, config);

    if (configResponse.statusCode === "IBVS_CONF_SUCCESS") {
      // console.log(configResponse.data);
      deviceData = JSON.parse(decryptData(configResponse.data, tempKey));
      console.log(deviceData);
      storeFirstTimeUsage(true, deviceData.dataKey, deviceData.identifier);
      // console.log(decryptData(configResponse.data, tempKey));
    }
  } catch (error) {
    console.error("Error saving config:", error);
  }

  //   Sending the config to configuration API. Response ---> {

  // message:"App configured successfully",

  // statusCode:"200",

  // status:200,

  // error:"NA",

  // errorCode:"IBVS_CONFIG_SUCCESS",

  // data:"encrypted_data_key" ----> decrypt using firstDatakey and match the value with itself

  // }
};

export default saveConfig;
