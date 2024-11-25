
import amqplib, { Channel, Connection } from 'amqplib';
import { LOG_QUEUE } from "../Constants";

import { LogObject } from "../types/log.types";
import { getChannel } from '../config/rabbitMq';

export const publishLog = (logID: string, logMessage: string, logObject: LogObject, type: 'log' | 'error')=>
{
    const channel = getChannel()
    if (!channel) {
        console.error('RabbitMQ channel is not initialized. Cannot send log to queue.');
        return;
    }
    const log = { logID, logMessage, logObject, type, createdAt: new Date() }

    channel.sendToQueue(LOG_QUEUE, Buffer.from(JSON.stringify(log)));

}

export const logMsg = (logID: string, logMessage: string, logObject: any) => {
    console.log()
    publishLog(logID, logMessage, logObject, 'log')


}
export const logError = (logID: string, logMessage: string, logObject: any) => {
    publishLog(logID, logMessage, logObject, 'error')
}