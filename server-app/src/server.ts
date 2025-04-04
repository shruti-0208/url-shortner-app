
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/dbConfig';
connectDB();
import shortUrl from "./routes/shortUrl"

const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/api/", shortUrl);

app.listen(port, () =>{
    console.log(`Server started successfully on port : ${port}`);
})