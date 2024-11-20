import cron from "node-cron"
import { deleteLogs } from "../controllers/Logcontroller"

export const deleteCron =()=>{
    cron.schedule('20 23 23 4 ',async()=>{
  try{
    await deleteLogs()
    console.log('succesfully in deleteing')
  }
  catch(err){
    console.log('error in deleteing',err)
  }
    })
}