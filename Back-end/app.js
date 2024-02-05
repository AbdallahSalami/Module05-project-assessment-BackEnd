import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import connect from './config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import RoleRouter from './routes/roleRoute.js'
import AdminsRoutes from './routes/adminRoute.js'
import OrderRouter from './routes/orderRoute.js'
import ProductRouter from './routes/productRoute.js'
import {createServer} from 'http'
import { authenticate } from './middleware/auth.js'
dotenv.config()
const app = express()
//middlware to parse request body that doesn't contains files(multer will do parse the one contains files)
app.use(bodyParser.urlencoded({ extended: false }));
//middleware to parse json objects
app.use(express.json());
//define images folder as static folder
app.use("/images", express.static("images"));
//Allow access from any origin
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
 credentials: true,
}))

app.use(cookieParser())


app.use((req,res,next) => {
    console.log(`//${req.method} ${req.path} `);
    next()
})



//Routes goes here
app.use("/api/admins",AdminsRoutes)
app.use('/api/roles',RoleRouter)
app.use('/api/orders',authenticate,OrderRouter)
app.use('/api/products',ProductRouter)




//this middleware coonect to the mongodb atlas cluster, 'db_string' is the connection string
await connect(process.env.CONNECTION_STRING)
const httpServer = createServer(app)

