const CryptoJS = require("crypto-js");

// Function to generate a random AES key (256 bits)
function generateKey() {
  return CryptoJS.lib.WordArray.random(32); // 256 bits key
}

// Function to encrypt data using AES
function encryptText(text) {
  const key = generateKey(); // Generate a new key for each encryption operation
  console
  const encrypted = CryptoJS.AES.encrypt(text, key.toString());
  console.log("encrypted in encryption file",encrypted)
  return {
    encryptedtext: encrypted.toString(),
    key: key.toString()
  };
}

module.exports = encryptText;
