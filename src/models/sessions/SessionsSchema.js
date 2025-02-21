import mongoose from "mongoose";
const SessionsSchema = new mongoose.Schema({
    token:{
        type:String
    },
    association:{
        type:String
    },
    review:{
        type:String
    }
})

export default mongoose.model("sessions",SessionsSchema)
