const mongoose = require('mongoose');


const DbConnection = ()=>{

    mongoose.connect('mongodb+srv://hansi:Hansi123@cluster0.bqvuhuz.mongodb.net/TaskManagmentSystem?retryWrites=true&w=majority')
    .then((con)=>console.log(`MongoDB is connected to the host :${con.connection.host}`))
    .catch((err)=>{
        console.log(err)
    })

}

module.exports = DbConnection   