const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

require('./models/dbModel');

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
