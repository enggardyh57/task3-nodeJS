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
exports.encryptFile = encryptFile;
const fs = __importStar(require("fs/promises"));
const crypto = __importStar(require("crypto"));
const log_1 = require("./log");
const algorithm = "aes-256-ctr";
function encryptFile(filePath, password) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            yield (0, log_1.logMessage)(`Mulai mengenkripsi file: ${filePath}`);
            const data = yield fs.readFile(filePath);
            const key = crypto.scryptSync(password, "salt", 32);
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
            const encryptedFile = Buffer.concat([iv, encrypted]);
            const fileName = ((_a = filePath.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0]) || "encrypted_file";
            const encryptedFilePath = `${fileName}_encrypted.txt`; // Output file name
            yield fs.writeFile(encryptedFilePath, encryptedFile);
            yield (0, log_1.logMessage)(`Berhasil mengenkripsi file: ${filePath}`);
            yield (0, log_1.logMessage)(`File terenkripsi disimpan sebagai: ${encryptedFilePath}`);
            console.log(`File '${filePath}' berhasil dienkripsi menjadi '${encryptedFilePath}'`);
        }
        catch (err) {
            if (err instanceof Error) {
                yield (0, log_1.logMessage)(`Error ketika mengenkripsi file: ${err.message}`);
                console.error(`Error ketika mengenkripsi file: ${err.message}`);
            }
        }
    });
}
