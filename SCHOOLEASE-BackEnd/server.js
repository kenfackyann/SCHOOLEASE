const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extends: true }));
const auth_route =require('./src/routes/auth_route');
const univ_route =require('./src/routes/univ_route');
const article_route =require('./src/routes/article_route');

app.use('/auth',auth_route);
app.use('/univ',univ_route);
app.use('/article',article_route);
app.use(express.static('public'))

//start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
     console.log(`sever is running on port ${PORT}`)
})
