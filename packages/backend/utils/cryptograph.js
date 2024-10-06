import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

export const encryptToken = (token, secretKey) => {
  // The initial vector used for encryption and decryption
  const iv = randomBytes(12);

  const key = Buffer.from(secretKey, "hex");
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

export const decryptToken = (encryptedToken, SecretKey) => {
  const tokenBuffer = Buffer.from(encryptedToken, "base64");
  const key = Buffer.from(SecretKey, "hex");
  // retrieve iv from token
  const iv = tokenBuffer.subarray(0, 12);
  // parse original ciphertext from token
  const cipherText = tokenBuffer.subarray(12, tokenBuffer.length - 16);
  // parse authTag from token
  const authTag = tokenBuffer.subarray(tokenBuffer.length - 16);
  // decipher token
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  const decryptedToken = Buffer.concat([
    decipher.update(cipherText),
    decipher.final(),
  ]);
  return decryptedToken.toString();
};
