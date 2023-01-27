
const mongoose = require("mongoose");


const connect = async () => {

    try {
        const con = mongoose.connect('mongodb://127.0.0.1:27017/user')      
        if(con){
            console.log("db connect")
        }  
    } catch (error) {
        console.log(error)
       
    }
  
}

 module.exports = connect
