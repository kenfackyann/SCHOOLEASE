const express = require('express')
const bodyParser = require('body-parser')

app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`sever is running on port ${PORT}`)
})









