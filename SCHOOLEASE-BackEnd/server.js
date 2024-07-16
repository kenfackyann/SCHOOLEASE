const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// MOCK DATA
let client 


const port = 3000;

  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  });
