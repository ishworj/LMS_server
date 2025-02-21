import mongoose from "mongoose"

const reviewsSchema = new mongoose.Schema({
    userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "books",
          required: true,
        },
        review:{
            type:String
        },
        rating:{
            type:Number,
            enum:[1, 2 ,3, 4 ,5]
        },
        isApproved:{
            type:Boolean,
            default:false
        }
})

export default mongoose.model("reviews",reviewsSchema)