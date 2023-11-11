
const mongoose = require('mongoose');

module.exports = async() =>{

    const uri = "mongodb+srv://jaseem:8qgqcISk1lQB4Z8Z@cluster0.sl1lqjy.mongodb.net/?retryWrites=true&w=majority";
    
    try {
        
        const connect = await mongoose.connect(uri, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });

        console.log('MongoDb Connected to server', connect.connection.host);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    
    
}
