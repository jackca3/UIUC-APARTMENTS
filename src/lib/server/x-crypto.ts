import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

function getEncryptionKey(): Buffer {
  const rawKey = process.env.X_TOKEN_ENCRYPTION_KEY;

  if (rawKey) {
    if (/^[a-f0-9]{64}$/i.test(rawKey)) {
      return Buffer.from(rawKey, "hex");
    }

    try {
      const base64Key = Buffer.from(rawKey, "base64");
      if (base64Key.length === 32) return base64Key;
    } catch {}
  }

  if (process.env.NODE_ENV !== "production") {
    return createHash("sha256")
      .update("dev-only-x-token-encryption-key")
      .digest();
  }

  throw new Error(
    "Missing X_TOKEN_ENCRYPTION_KEY. Use a 32-byte base64 string or 64-char hex string."
  );
}

export function encryptSecret(plainText: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("base64url")}.${authTag.toString("base64url")}.${encrypted.toString(
    "base64url"
  )}`;
}

export function decryptSecret(payload: string): string {
  const [ivRaw, authTagRaw, encryptedRaw] = payload.split(".");
  if (!ivRaw || !authTagRaw || !encryptedRaw) {
    throw new Error("Encrypted secret payload is invalid.");
  }

  const decipher = createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(ivRaw, "base64url")
  );
  decipher.setAuthTag(Buffer.from(authTagRaw, "base64url"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedRaw, "base64url")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
