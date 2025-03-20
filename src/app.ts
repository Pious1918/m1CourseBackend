import express from 'express'
import cors from "cors";

import dotenv from 'dotenv'
import morgan from 'morgan'
import logger from './utils/logger'
import userRoutes from './routes/userRoutes'

import connectDB from './utils/db'
import uploadData from './coursedata';
connectDB()

// uploadData()



const app = express()
const morganFormat = ":method :url :status :response-time ms";
app.use(cors({
    origin: 'https://m1-course-frontend-q8st.vercel.app',
}))
app.use(express.json());


app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);


app.use('/', userRoutes)

export default app

