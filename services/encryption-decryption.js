const crypto = require("crypto");
const algorithm = "aes-256-cbc";
secret = "mypassword";
const extendKey = (secret) => {
  return crypto
    .createHash("sha256")
    .update(String(secret))
    .digest("base64")
    .substr(0, 32);
};

const encrypt = (text, secret) => {
  let key = extendKey(secret);
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

const decrypt = (text, secret) => {
  let key = extendKey(secret);
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
// let encryptedData = encrypt("this is confidential", "secret");
// console.log(encryptedData);
// let decryptedData = decrypt(encryptedData, "secret");
// console.log(decryptedData);
