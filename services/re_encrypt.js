// const crypto = require("crypto");
const { ObjectId, Mongoose } = require("mongoose");

const { decrypt, encrypt } = require("./encryption-decryption");
const re_encrypt = (records, oldSecret, newSecret) => {
  console.log("old new", oldSecret, newSecret);
  const bulkOps = records.map((doc) => {
    const { username, password } = JSON.parse(
      decrypt(doc.encryptedData, doc.iv, oldSecret)
    );
    const dataToBeEncrypted = JSON.stringify({ username, password });
    const { iv, encryptedData } = encrypt(dataToBeEncrypted, newSecret);
    return {
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: { encryptedData: encryptedData, iv: iv } },
        upsert: true,
      },
    };
  });
  return bulkOps;
};
module.exports = { re_encrypt };
