
import { connectRabbitMQ, getChannel } from "../config/rabbitMq";
import { LOG_QUEUE } from "../Constants";
import { createLog } from "../controllers/Logcontroller";

export const startLogConsumer = async () => {
    try {
        const channel = getChannel()
        await connectRabbitMQ();

  
        if (!channel) {
            throw new Error("Channel is not initialized");
        }

        channel.consume(LOG_QUEUE, async (msg: any) => { 
            if (msg !== null) {
                const logData = JSON.parse(msg.content.toString());
                console.log("Received logs:", logData);
                createLog(logData)
                channel.ack(msg); 
            } else {
                console.log("Received null message");
            }
        }, { noAck: false });  
    } catch (err) {
        console.error("Failed to start log consumer:", err);
    }
};


startLogConsumer();
