import express from 'express'
import { contactTemplate, SendMail } from '../config/nodemailerConfig.js';
const  router = express.Router();

router.post("/", async (req,res,next)=>{
    const obj = req.body;

    const template = contactTemplate(obj);
    const isSent = await SendMail(template)

   try {
     if (isSent?.messageId) {
      return res.json({
         status: "success",
         message: "message recieved , we will reply soon ^^ ",
       });
     }
     return res.json({
        status:"error",
        message:"Message Error occured"
     })
   } catch (error) {
   next({
    statusCode:"500",
    message:"Message error occured"
   })
   }

})

export default router;