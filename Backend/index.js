const express = require('express');
const app = express();
let cors = require('cors');

const eventApiRouter = require('./app/Api/eventApi');

app.use(express.json());
app.use(cors());

// API Event Routes
app.use('/api/event', eventApiRouter);

/* app.get('/', function(req, res){
    res.send('Hello World!');
}); */

app.listen(8080, function(){
    console.log('Serwer Node.js działa');
});