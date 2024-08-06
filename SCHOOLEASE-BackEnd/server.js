const express = require('express');

const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: true }));
const auth_route =require('./src/routes/auth_route');
// app.use(cors());
app.use('/auth',auth_route)
//start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
     console.log(`sever is running on port ${PORT}`)
})
