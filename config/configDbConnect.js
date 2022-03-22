const mongoose = require('mongoose');
const dbURL = process.env.DATABASE_URL.replace('<password>',process.env.DATABASE_PASSWORD);

exports.dbConnection =  mongoose.connect(dbURL,(err, data) => {
    if(!err){
        console.log('Connected to database');
    } else {
        console.log(err);
    }
    
});