"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptFile = decryptFile;
const fs = __importStar(require("fs/promises"));
const crypto = __importStar(require("crypto"));
const log_1 = require("./log");
const algorithm = "aes-256-ctr";
function decryptFile(filePath, password) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            yield (0, log_1.logMessage)(`Mulai mendekripsi file: ${filePath}`);
            const encryptedData = yield fs.readFile(filePath);
            const key = crypto.scryptSync(password, "salt", 32);
            const iv = encryptedData.slice(0, 16); // Mengambil IV dari awal file
            const encryptedText = encryptedData.slice(16); // Mengambil data terenkripsi
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
            const decryptedFilePath = `${(_a = filePath.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0]}_decrypted.txt`; // Output file name for decryption
            yield fs.writeFile(decryptedFilePath, decrypted);
            yield (0, log_1.logMessage)(`Berhasil mendekripsi file: ${filePath}`);
            yield (0, log_1.logMessage)(`File didekripsi disimpan sebagai: ${decryptedFilePath}`);
            console.log(`File '${filePath}' berhasil didekripsi menjadi '${decryptedFilePath}'`);
        }
        catch (err) {
            if (err instanceof Error) {
                yield (0, log_1.logMessage)(`Error ketika mendekripsi file: ${err.message}`);
                console.error(`Error ketika mendekripsi file: ${err.message}`);
            }
        }
    });
}
