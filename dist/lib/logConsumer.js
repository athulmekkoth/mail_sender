var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { channel, connectRabbitMQ } from "../config/rabbitMq";
import { LOG_QUEUE } from "../Constants";
export const startLogConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectRabbitMQ();
        if (!channel) {
            throw new Error("Channel is not initialized");
        }
        channel.consume(LOG_QUEUE, (msg) => __awaiter(void 0, void 0, void 0, function* () {
            if (msg !== null) {
                const logData = JSON.parse(msg.content.toString());
                console.log("Received log:", logData);
                channel.ack(msg);
            }
            else {
                console.log("Received null message");
            }
        }), { noAck: false }); //remove auto if msg delivers
    }
    catch (err) {
        console.error("Failed to start log consumer:", err);
    }
});
startLogConsumer();
