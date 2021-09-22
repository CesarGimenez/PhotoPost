const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const routes = require('./routes/index');
const errorHandler = require("errorhandler");

//Database
require("./database");

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));
app.engine('.hbs', exphbs({
    defaultLayout: "main",
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: 'hbs',
    helpers: require('./helpers')
}));
app.set('view engine', 'hbs');
app.listen(app.get('port'), () =>{
    console.log("Server on port", app.get('port'));
});

//Middlewares
app.use(morgan('dev'));
app.use(multer({dest: path.join(__dirname, './public/uploads/temp')}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
routes(app);

//static files
app.use('/public',express.static(path.join(__dirname, './public')));

//Errors
if ('development' === app.get('env')){
    app.use(errorHandler);
};