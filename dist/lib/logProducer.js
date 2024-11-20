import { channel } from "../config/rabbitMq";
import { LOG_QUEUE } from "../Constants";
export const publishLog = (logid, logMessage, logObject, type) => {
    const log = { logid, logMessage, logObject, type, createdAt: new Date() };
    channel.sendToQueue(LOG_QUEUE, Buffer.from(JSON.stringify(log)));
};
export const logMsg = (logid, logMessage, logObject) => {
    publishLog(logid, logMessage, logObject, 'log');
};
export const logError = (logid, logMessage, logObject) => {
    publishLog(logid, logMessage, logObject, 'error');
};
