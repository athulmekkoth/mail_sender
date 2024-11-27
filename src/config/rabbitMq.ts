import { Channel, connect } from "amqplib"; 
import { LOG_QUEUE, EMAIL_QUEUE } from "../Constants";

let channel: Channel | null = null;


const connectRabbitMQ = async (retries = 5, delay = 5000) => {
  try {

    const rabbitMQUri = process.env.RABBITMQ_URI;
    if (!rabbitMQUri) {
      throw new Error("RABBITMQ_URI environment variable is not defined");
    }

    const connection = await connect(rabbitMQUri);
    channel = await connection.createChannel();

 
    await channel.assertQueue(LOG_QUEUE);
    await channel.assertQueue(EMAIL_QUEUE);

    console.log("Connected to RabbitMQ");

  
    process.on('SIGINT', async () => {
      await channel?.close();
      await connection.close();
      console.log('RabbitMQ connection closed');
    });
    
  } catch (err) {
    console.log(`Error connecting to RabbitMQ: ${err}`);
    if (retries > 0) {
      console.log(`Retrying in ${delay / 1000} seconds...`);
      setTimeout(() => connectRabbitMQ(retries - 1, delay), delay);
    } else {
      throw new Error("Failed to connect to RabbitMQ after several attempts");
    }
  }
};


const getChannel = (): Channel => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }
  return channel;
};

export { connectRabbitMQ, getChannel };
