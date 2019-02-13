// process.env.NODE_ENV = 'production';
// process.env.app_password = 'test';

const debug = require('debug');
const config = require('config');
const express = require('express');

const joi = require('joi')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const check = require('./modules');
const helmet = require('helmet');

const app = express();

//config

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());

// console.log(app.get('env'));
console.log(config.get('name'));
console.log(config.get('mail.host'));
console.log(config.get('password'));
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    
}


app.use(check.log);
app.use(check.auth);

app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('index.html');
    
})



app.listen(3000);
