import CryptoJS from 'crypto-js'
import * as dotenv from "dotenv";
dotenv.config();

const secretKey: string = String(process.env.SECRET_KEY)

const coreService = {
    encryptData: (plainText: string) => {
      // Perform the encryption AES-256-CBC
      const ciphertext = CryptoJS.AES.encrypt(plainText, secretKey, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();

      return ciphertext
    },
    decryptData: (text: string) => {
      // Perform the encryption AES-256-CBC
      const plaintext = CryptoJS.AES.decrypt(text, secretKey, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);

      return plaintext
    }
}

export {
  coreService
}