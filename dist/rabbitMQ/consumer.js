var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as amqplib from 'amqplib';
// dotenv.config();
// const open = require("amqplib").connect(process.env.AMQP_CONNECTION_STRING)
// const queue = 'email-task';
// export const consumeMessage = async (): Promise<void> => {
//     try {
//         console.log(" consumer started")
//         const connection = await open;
//         const channel: Channel = await connection.createChannel();
//         await channel.assertQueue(queue);
//         console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
//         channel.consume(queue, async (msg) => {
//             if (msg !== null) {
//                 const { to, subject, body } = JSON.parse(msg.content.toString());
//                 console.log(' [x] Received %s', body);
//                 try {
//                     await sendMails({ to, subject, body });  // Use the updated sendMails
//                     channel.ack(msg);  // Acknowledge the message after successful processing
//                 } catch (error) {
//                     console.warn('Error processing message:', error);
//                     // Optionally, you could choose not to ack the message and let it be retried.
//                 }
//             }
//         });
//     } catch (error) {
//         console.warn('Error consuming message:', error);
//     }
// };
import sendMails from '../utils/EmailService';
const queue = 'Email-Queue';
const connectionString = process.env.AMQP_CONNECTION_STRING;
export default function startConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        const open = amqplib.connect(connectionString);
        console.log("hai");
        open
            .then((connection) => connection.createChannel())
            .then((channel) => {
            return channel.assertQueue(queue).then(() => {
                // console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);
                channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                    if (msg !== null) {
                        try {
                            const data = JSON.parse(msg.content.toString());
                            console.log(` [x] Received: ${JSON.stringify(data)}`);
                            // Send email via AWS Email-Queue
                            yield sendMails(data);
                            channel.ack(msg); // Acknowledge the message after successful processing
                            console.log(' [x] Message processed and acknowledged');
                        }
                        catch (error) {
                            console.error('Error processing message:', error);
                            // Optionally, you can reject the message or handle requeueing here
                        }
                    }
                }));
            });
        })
            .catch((error) => {
            console.error('Error setting up RabbitMQ consumer:', error);
        });
        // Handle unhandled rejections
        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        });
    });
}
