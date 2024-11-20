import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

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

interface Email {
    to: string;
    subject: string;
    body: string;
}

const sendMails = async ({to, subject, body }: Email) => {
    console.log("hai")
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
        const data = await AWS_SES.sendEmail(params).promise();
        console.log('Email sent successfully:', data);
    } catch (err: any) {
        console.error('Failed to send email:', err.message);
        throw new Error(err.message);
    }
};

export default sendMails;
