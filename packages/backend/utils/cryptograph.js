const { createCipheriv, createDecipheriv, randomBytes } = require("crypto");
require("dotenv").config({ path: "../config/config.env" });

exports.encryptToken = (token, key) => {
    // The initial vector used for encryption and decryption
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", key, iv);
    // concatenate iv, encrypted token and authTag toegther so that it can be used during decryption
    const encryptedToken = Buffer.concat([
        iv,
        cipher.update(token, "utf8"),
        cipher.final(),
        cipher.getAuthTag(),
    ]);
    // return encrypted token in base64 format
    return encryptedToken.toString("base64");
};

exports.decryptToken = (encryptedToken, key) => {
    const tokenBuffer = Buffer.from(encryptedToken, "base64");
    // retrieve iv from token
    const iv = tokenBuffer.slice(0, 12);
    // parse original ciphertext from token
    const cipherText = tokenBuffer.slice(12, tokenBuffer.length - 16);
    // parse authTag from token
    const authTag = tokenBuffer.slice(tokenBuffer.length - 16);
    // decipher token
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    const decryptedToken = Buffer.concat([
        decipher.update(cipherText),
        decipher.final(),
    ]);
    return decryptedToken.toString();
};
