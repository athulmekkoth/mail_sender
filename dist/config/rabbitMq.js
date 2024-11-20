var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { connect } from "amqplib"; // Only named imports
import { LOG_QUEUE, EMAIL_QUEUE } from "../Constants";
let channel;
const connectRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield connect(process.env.RABBITMQ_URI); // Use the named import
        channel = yield connection.createChannel();
        yield channel.assertQueue(LOG_QUEUE);
        yield channel.assertQueue(EMAIL_QUEUE);
        console.log("Connected to RabbitMQ");
        // Further logic...
    }
    catch (err) {
        console.log("Error connecting to RabbitMQ:", err);
    }
});
export { connectRabbitMQ, channel };
