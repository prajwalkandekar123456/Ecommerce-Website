const ErrorHander = require("../utils/errorhander")

module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode||500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb ID error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message,400);
    }

    //Mongoose duplicate key error
    if(err.code === 11000)
    {
        const message = `Duplicate ${object.keys(err.keyValue)} Entered`
        err = new ErrorHander(message,400);
    }

    // Wrong JWT error
    if(err.name === "JsonwebTokenError"){
        const message = `Json web Token is invalid, Try again`;
        err = new ErrorHander(message,400);
    }

    //JWT EXPIRE ERROR
    if(err.name === "TokenExpireError"){
        const message = `Json web Token is Expired, Try again`;
        err = new ErrorHander(message,400);
    }

    res.status(err.statuscode).json({
        success:false,
        message:err.message,
    });
};