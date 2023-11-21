const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const path = require('path');

// body-parser configure
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const studentRouter = require('./routes/studentRoutes')
const moduleRouter = require('./routes/moduleRouts')
const registerRouter = require('./routes/registerRoute')

// Use handlebars
app.engine('hbs',
    expressHandlebars.engine({
      extname: '.hbs',
      layoutsDir: path.join(__dirname, 'views/layouts'),
      partialsDir: path.join(__dirname, 'views/partials')
    })
  );
  
app.set('view engine', 'hbs');


// Define a helper function to format dates
const hbs = expressHandlebars.create({});
hbs.handlebars.registerHelper('formatDate', function(date) {

  return new Date(date).toISOString().split('T')[0];
});

app.use(express.static('public'));

//server port configure
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('dashboard');
})
app.use('/student', studentRouter)
app.use('/module', moduleRouter)
app.use('/register', registerRouter)

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



