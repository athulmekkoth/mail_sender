import dotenv from 'dotenv';
dotenv.config();
import amqplib from 'amqplib';
const connectionString = process.env.AMQP_CONNECTION_STRING;
if (!connectionString) {
    throw new Error('AMQP_CONNECTION_STRING environment variable is not set.');
}
const open = amqplib.connect(connectionString);
var queue = "Email-Queue";
// Publisher
const publishMessage = (payload) => open
    .then((connection) => {
    connection.createChannel().then((channel) => channel.assertQueue(queue).then(() => {
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
        console.log("send");
    }));
})
    .catch((error) => console.warn(error));
export default publishMessage;
