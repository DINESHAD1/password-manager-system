const CryptoJS = require("crypto-js"); 
module.exports = function decryptText(encryptedText, key) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
  console.log("decrypted decryption file",decrypted.toString(CryptoJS.enc.Utf8))
  return decrypted.toString(CryptoJS.enc.Utf8);
}

