import dotenv from "dotenv";
import app from "./app";
import prisma from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function testDB() {
  try {
    await prisma.$connect();
    console.log("DB connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    })
  }catch(error){
    console.error("Failed to connect to the Server",error);
  }
}

testDB();
