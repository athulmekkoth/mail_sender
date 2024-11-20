var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AWS from 'aws-sdk';
const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
};
const SENDER_EMAIL = process.env.SENDER_EMAIL;
if (!SENDER_EMAIL) {
    console.error("SENDER_EMAIL environment variable is not set.");
    process.exit(1);
}
const AWS_SES = new AWS.SES(SES_CONFIG);
const sendMails = ({ to, subject, body }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hai");
    const params = {
        Source: SENDER_EMAIL,
        Destination: {
            ToAddresses: [to],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: body,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: body,
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            }
        }
    };
    try {
        const data = yield AWS_SES.sendEmail(params).promise();
        console.log('Email sent successfully:', data);
    }
    catch (err) {
        console.error('Failed to send email:', err.message);
        throw new Error(err.message); // Rethrow to handle the error in the consumer
    }
});
export default sendMails;
