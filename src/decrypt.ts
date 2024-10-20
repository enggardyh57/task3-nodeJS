import * as fs from "fs/promises";
import * as crypto from "crypto";
import { logMessage } from "./log";

const algorithm = "aes-256-ctr";

async function decryptFile(filePath: string, password: string): Promise<void> {
  try {
    await logMessage(`Mulai mendekripsi file: ${filePath}`);

    const encryptedData = await fs.readFile(filePath);
    const key = crypto.scryptSync(password, "salt", 32);
    const iv = encryptedData.slice(0, 16); // Mengambil IV dari awal file
    const encryptedText = encryptedData.slice(16); // Mengambil data terenkripsi

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

    const decryptedFilePath = `${filePath.split("/").pop()?.split(".")[0]}_decrypted.txt`; // Output file name for decryption

    await fs.writeFile(decryptedFilePath, decrypted);
    await logMessage(`Berhasil mendekripsi file: ${filePath}`);
    await logMessage(`File didekripsi disimpan sebagai: ${decryptedFilePath}`);

    console.log(`File '${filePath}' berhasil didekripsi menjadi '${decryptedFilePath}'`);
  } catch (err) {
    if (err instanceof Error) {
      await logMessage(`Error ketika mendekripsi file: ${err.message}`);
      console.error(`Error ketika mendekripsi file: ${err.message}`);
    }
  }
}

export { decryptFile };
