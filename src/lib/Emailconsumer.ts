import * as amqplib from 'amqplib';
import { channel, connectRabbitMQ } from "../config/rabbitMq";
import { EMAIL_QUEUE } from "../Constants";
import sendMails from '../utils/EmailService';

export const EmailConsumer = async () => {
  try {
    await connectRabbitMQ();

    if (!channel) {
      throw new Error("Channel is not initialized");
    }

    channel.consume(EMAIL_QUEUE, async (mail: any) => {
      if (mail != null) {
        const data = JSON.parse(mail.content.toString());
      console.log(data)
       await sendMails(data)
        channel.ack(mail);
        console.log(' [x] Message processed and acknowledged');
      }
    });

  
    console.log("Waiting for messages in the queue...");
    process.stdin.resume();

  } catch (err) {
    console.error("Failed to start email consumer:", err);
  }
};


EmailConsumer();


// export default async function startConsumer() {
//   const open: Promise<Connection> = amqplib.connect(connectionString);
//   console.log("hai")
//   open
//     .then((connection: Connection) => connection.createChannel())
//     .then((channel: Channel) => {
//       return channel.assertQueue(queue).then(() => {
//         channel.consume(queue, async (msg) => {
//           if (msg !== null) {
//             try {
//               const data = JSON.parse(msg.content.toString());
//               console.log(` [x] Received: ${JSON.stringify(data)}`);
//               await sendMails(data);
//               channel.ack(msg); 
//               console.log(' [x] Message processed and acknowledged');
//             } catch (error) {
//               console.error('Error processing message:', error);
            
//             }
//           }
//         });
//       });
//     })
//     .catch((error) => {
//       console.error('Error setting up RabbitMQ consumer:', error);
//     });
  
  
//   process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//   });
//   }