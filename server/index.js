const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
dotenv.config({ path: "./.env" });

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}


app.use(morgan("dev"))
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//
app.get('/', (req, res) => {
res.status(200).send({
    message: "server is running"
})
})

const port = process.env.PORT || 4000


app.listen(port, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})