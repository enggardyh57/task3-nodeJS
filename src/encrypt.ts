import * as fs from "fs/promises";
import * as crypto from "crypto";
import { logMessage } from "./log";

const algorithm = "aes-256-ctr";

async function encryptFile(filePath: string, password: string): Promise<void> {
  try {
    await logMessage(`Mulai mengenkripsi file: ${filePath}`);
    const data = await fs.readFile(filePath);
    const key = crypto.scryptSync(password, "salt", 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

    const encryptedFile = Buffer.concat([iv, encrypted]);
    const fileName = filePath.split("/").pop()?.split(".")[0] || "encrypted_file";
    const encryptedFilePath = `${fileName}_encrypted.txt`; // Output file name

    await fs.writeFile(encryptedFilePath, encryptedFile);
    await logMessage(`Berhasil mengenkripsi file: ${filePath}`);
    await logMessage(`File terenkripsi disimpan sebagai: ${encryptedFilePath}`);

    console.log(`File '${filePath}' berhasil dienkripsi menjadi '${encryptedFilePath}'`);
  } catch (err) {
    if (err instanceof Error) {
      await logMessage(`Error ketika mengenkripsi file: ${err.message}`);
      console.error(`Error ketika mengenkripsi file: ${err.message}`);
    }
  }
}

export { encryptFile };
