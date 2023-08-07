import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
import DeviceInfo from "react-native-device-info";
import { NetworkInfo } from "react-native-network-info";
import Geolocation from "react-native-geolocation-service";

const generateRandomKey = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 32; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
};

const encryptData = (data, encryptionKey) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    encryptionKey
  ).toString();
  return encryptedData;
};

const getLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
        resolve(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

const generateConfig = async () => {
  const versionNo = "0.0.1";
  const deviceType = DeviceInfo.getSystemName();
  const deviceIp = await NetworkInfo.getIPAddress();
  const deviceLocation = await getLocation();
  const data = {
    checkPhrase: "ValiSign Calling",
    deviceId: DeviceInfo.getUniqueId(),
    deviceType,
    deviceLocation,
    deviceIp,
    datakey: generateRandomKey(),
  };

  const encryptionKeys = [
    "7r$V3q#mH9!pZs@eC5gA1bYtW8nKuXx",
    "2sP$5jMvN8%kTfQeG6rC0zWxH7nA1bE",
    "4tF#7yRvB3^jNpWzQ6mZqC9aD1sG2eX",
  ];

  const randomEncryptionKey =
    encryptionKeys[Math.floor(Math.random() * encryptionKeys.length)];
  const encryptedData = encryptData(data, randomEncryptionKey);

  const config = {
    versionNo,
    deviceType,
    data: encryptedData,
  };

  return config;
};

const saveConfig = async () => {
  try {
    const config = await generateConfig();
    const jsonConfig = JSON.stringify(config);
    await AsyncStorage.setItem("Config", jsonConfig);
    console.log("Config saved:", jsonConfig);
  } catch (error) {
    console.error("Error saving config:", error);
  }
};

export default saveConfig;
