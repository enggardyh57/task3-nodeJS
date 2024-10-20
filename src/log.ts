import * as fs from "fs/promises";
import * as path from "path";

const logDir = path.join(__dirname, "../activityLog");

async function logMessage(message: string): Promise<void> {
  try {
    const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    const logFilePath = path.join(logDir, `${getLogFileName()}.log`);

    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(logFilePath, `${timestamp} - ${message}\n`);
  } catch (error) {
    console.error("Error dalam penulisan log:", error);
  }
}

function getLogFileName(): string {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}

export { logMessage };
