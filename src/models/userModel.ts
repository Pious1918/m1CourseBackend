import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


const userSchema : Schema<IUser>= new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    profileImage: {
        type: String,
        default: 'https://jotit-article-buck.s3.ap-south-1.amazonaws.com/avathar.jpg',
    },
    latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      cityname: {
        type: String,
      },
      location: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true },
      },
})


export default mongoose.model<IUser>('User', userSchema)