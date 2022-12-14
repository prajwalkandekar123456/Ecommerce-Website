const app = require("./app"); //importing the app

const dotenv = require("dotenv"); //require to reading the .env file which contain the running port

const connectDatabase = require("./config/database")

// Handling uncaught Exception
process.on("uncaughtException",(err)=>{
  console.log(`Error: $${err.message}`);
  console.log("Shutting down error due to Uncaught Exception");
  process.exit(1);
})

//config

dotenv.config({path:"backend/config/config.env"}); 

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });

  module.exports = app;

  //unhandled Promise Rejection
  process.on("unhandledRejection",err =>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(()=>{
      process.exit(1);
    })
  })