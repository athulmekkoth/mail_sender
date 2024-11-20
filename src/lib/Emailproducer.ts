import dotenv from 'dotenv';
dotenv.config()
import { connectRabbitMQ,channel } from '../config/rabbitMq';


var queue = "Email-Queue"
interface Email{
    to: string;
    subject: string;
    body: string;

}

export const publishMessage = async (payload: Email) => {
  console.log(payload)
  try {
  
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))

  }
  catch (error)
  {
    throw new Error("Something went wrong ")
  }
}

//   open
//     .then((connection:Connection) => {
//       connection.createChannel().then((channel) =>
//         channel.assertQueue(queue).then(() => {
//           channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))
//           console.log("send")
//         })
        
//       )
   
    
//     })
   
   
//     .catch((error:any) => console.warn(error))


//     export default publishMessage
