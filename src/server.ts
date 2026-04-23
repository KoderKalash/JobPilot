import express from "express";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

/****
import prisma from "./config/db";

async function testDB() {
  await prisma.$connect();
  console.log("DB connected");
}

testDB();
****/



app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

// const startServer = async () => {
//     try {
        
//     } catch (error) {
        
//     }
// }