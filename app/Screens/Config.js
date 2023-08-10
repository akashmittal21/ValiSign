import AsyncStorage from "@react-native-async-storage/async-storage";
import "../../shim.js";
import DeviceInfo from "react-native-device-info";
import crypto from "crypto";
import { NetworkInfo } from "react-native-network-info";
// import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";

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

const encryptData = (data, encryptionKey, iv) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
  let encryptedData = cipher.update(data, "utf8", "base64");
  encryptedData += cipher.final("base64");
  return encryptedData;
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

const generateConfig = async () => {
  const version = "0.0.1";
  const deviceType = DeviceInfo.getSystemName();
  const deviceIp = await NetworkInfo.getIPAddress();
  const deviceLocation = await getLocation();
  const firstDataKey = generateRandomKey(); // is going to be saved for further decryption stored in FirstTimeUsage LOCAL DATABASE
  const data = {
    checkPhrase: "ValiSign Calling",
    deviceId: DeviceInfo.getUniqueId(),
    deviceType,
    deviceLocation,
    deviceIp,
    datakey: firstDataKey, // this key will be saved on the device after first configuration
  };

  // Three keys:     1. One of the 8 keys ---> config api payload ----> random
  //                 2. Genreated on the device -----> encrypt login information for first time login/ further logins (maybe) ----> random
  //                 3. Generated on the server -----> is going to be sent after first successul login ----> updated after a certain period of time based on secuirty policy

  // Server data key -----> only sent during first time login (if login is successful) OR during security update (based on policy)----> further encryption of all data
  // is going to be stored on server side as well local database ----> subjeted to change based on the security policy

  const encryptionKeys = [
    "T5$okm.$DgZk2Ub.6AJZs%/Cn5pPvRCu",
    "Qy2fAMzYFZfqZzkcelcafohr%otYx^kx",
    ".rkZG^qlBiNc&Zm4byRdXgi8ekvwlLbW",
    "RsUQ&talPqu7C^tRHA&qyE$0Fg^RhK57",
    "xX.u42bQ6HoamUc8OBXqLT9fhNy&a8b1",
    ".ZC.1a4ZmQfVCOYKD9OANKI9SbgEGXUt",
    "SdEoDJepnzz61zjwKuDyB9&.Q6Se3$w.",
    "D/2FC5N6PVdd&g1QAC$CDl.4OHunESkZ",
    "gYF%z07%ekh./P/X.e0LZ4kMHj14BY.o",
  ];

  const randomEncryptionKey =
    encryptionKeys[Math.floor(Math.random() * encryptionKeys.length)];

  const iv = "e93jGXDcjXPbSOAE"; // 16 byte IV for AES-CBC

  const dataStr = JSON.stringify(data);

  const encryptedData = encryptData(dataStr, randomEncryptionKey, iv);

  const config = {
    version,
    deviceType,
    data: encryptedData,
  };

  return config;
};

const saveConfig = async () => {
  //   const key = "JiNiX3dCROGw/az82Z0hcA/%O2S7qwPr"; // 32 byte key for AES-25

  //   const iv = "e93jGXDcjXPbSOAE";

  //   const encrypted =
  //     "aBWhSTIf29DPPXf5UJTv+VZGU01icQLopGhMbZ4/GxCREfPcDyJ8NVZzNm+aJECx";
  //   try {
  //     const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  //     let decrypted = decipher.update(encrypted, "base64", "utf8");
  //     decrypted += decipher.final("utf8");

  //     console.log(decrypted);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   validate the resposnse

  //   const text = { checkPhrase: "ValiSign Calling" };

  //   const jsonText = JSON.stringify(text);

  //   const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  //   let encrypted = cipher.update(jsonText, "utf8", "base64");

  //   encrypted += cipher.final("base64");

  //   console.log(encrypted);

  try {
    const config = await generateConfig();
    const jsonConfig = JSON.stringify(config);
    await AsyncStorage.setItem("Config", jsonConfig);
    console.log("Config saved:", jsonConfig);
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
