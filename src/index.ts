import { encryptFile } from "./encrypt";
import { decryptFile } from "./decrypt";

const [, , command, filePath, password] = process.argv;

async function main() {
  if (command === "encrypt") {
    await encryptFile(filePath, password);
  } else if (command === "decrypt") {
    await decryptFile(filePath, password);
  } else {
    console.log("Perintah tidak dikenal. Gunakan 'encrypt' atau 'decrypt'.");
  }
}

main().catch(console.error);
