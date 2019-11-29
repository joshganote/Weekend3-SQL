const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const to_do_appRouter = require('./routes/to_do_app.router')

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/to-do-app', to_do_appRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });