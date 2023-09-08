import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { userRouter } from './Router/user.router.js'
import helmet from 'helmet'
import cors from 'cors'
let app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
helmet.crossOriginResourcePolicy({policy : 'same-origin'})
app.use(cors({ origin : ['https://frontend-yc6b.vercel.app','http://localhost:5173'], credentials : true }))
dotenv.config()
class Connection{
    mongodb_url;
    port;
    constructor(url,port){
        this.mongodb_url = url
        this.port = port
    }
    MongoDbConnection = () => {
        let port = this.port
        let db_url = this.mongodb_url
        mongoose.connect(db_url).then((res) => app.listen(port, () => {console.log('connected to mongoDb')})).catch(err => console.error(err))
        mongoose.connection.on('connected' ,() => {return 'connected again'})
        mongoose.connection.on('disconnected', () => {return 'disconnected again'})
    }
}
let ConnectioObj = new Connection(process.env.MONGODB_URL, process.env.PORT);
ConnectioObj.MongoDbConnection();
app.use('/api/auth',userRouter)
app.use((err,req,res,next) => {
    let errorMessage = err.message || 'Something went wrong!'
    let errorStatus = err.status || 500
    res.status(errorStatus).json({ error : errorMessage })
})