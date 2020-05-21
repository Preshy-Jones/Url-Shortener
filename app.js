const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')

const connectDB = require('./config/db');

connectDB();
app.use(express.json({ extended: false }));
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

const PORT = 4000;


// dotenv.config();
// mongoose.connect(process.env.DB_CONNECT,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => console.log('connected to mongodb')

// );


app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));




app.listen(PORT, () => console.log(`server running on port ${PORT}`));