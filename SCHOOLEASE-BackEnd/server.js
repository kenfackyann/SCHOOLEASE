const express = require('express');

const bodyParser = require('body-paser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyparsar.urlencoded({extends: true }));
app.use(cors());

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`sever is running on port$`)
})
