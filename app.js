const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Sequelize = require('sequelize')

const db = new Sequelize('process.env.DATABASE_URL');

db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error))

// Set Port
const port = 3000;

// Init app
const app = express();

// View Engine\
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// methodOverride
app.use(methodOverride('_method'));

// dir
app.use(express.static(path.join(__dirname, '/public')));

// Search Page
app.get('/', function(req, res, next){
  res.render('searchusers');
});

app.listen(port, function(){
  console.log('Server started on port '+port);
});
