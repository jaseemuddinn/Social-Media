const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config('./.env')
const dbConnect = require("./dbConnect")
const authRouter = require('./routers/authRouter')
const postsRouter = require('./routers/postsRouter')
const userRouter = require('./routers/userRouter')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")


const app = express();

//middleware
app.use(express.json());
app.use(morgan('common'));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))


app.use('/auth', authRouter)
app.use('/posts', postsRouter)
app.use('/user', userRouter)
app.get('/', (req, res) =>{
    res.status(200).send('Welcome')
})
  
const PORT = process.env.PORT || 4000;

dbConnect();

app.listen(PORT, (req, res) => {
    console.log(`listening on ${PORT}`);
});
