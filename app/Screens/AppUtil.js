import axios from "axios";
import crypto from "crypto";
import "./shim.js";

const encryptData = (data, encryptionKey) => {
  const iv = "e93jGXDcjXPbSOAE";
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
  let encryptedData = cipher.update(data, "utf8", "base64");
  encryptedData += cipher.final("base64");
  return encryptedData;
};

const decryptData = (encryptedString, key) => {
  const iv = "e93jGXDcjXPbSOAE";
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedData = decipher.update(encryptedString, "base64", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
};

const makeApiRequest = async (API_URL, config) => {
  // const response = await axios.post(API_URL, config);
  // console.log(response);
  try {
    const response = await axios.post(API_URL, config);
    console.log("API request successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

const makeApiRequestWithHeader = async (API_URL, config, header) => {
  try {
    const response = await axios.post(API_URL, config, { headers: header });
    console.log("API request successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export { encryptData, decryptData, makeApiRequest, makeApiRequestWithHeader };
