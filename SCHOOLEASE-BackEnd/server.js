const express = require('express');
const cors = require('cors');
const bodyparsar = require('body-parser')

const app = express();

app.use(bodyparsar.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cors());

app.use('/student', stud_route);
app.use('/subject',sub_rout);
  app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    
})