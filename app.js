const express = require('express');
const projects = require('./data/data.json').projects;
const app = express();

//create static route
app.use('/static', express.static('public'));

//set view engine to pug
app.set('view engine', 'pug');

//create an index route
app.get('/', (req,res) =>{
    res.render('index', { projects });
});

//create an about route
app.get('/about',(req,res) =>{
    res.render('about');
});

//create a projectRoute
app.get('/project/:id', (req,res,next) =>{
    const id = req.params.id;
    const project = projects.find(project => project.id === id);
    if(project === undefined){
        return next();
    }
    res.render('project', { project });
});

//Error Handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  console.log(err);
  res.render('error');
});
app.listen(3000, ()=>{
    console.log('The application is running on localhost 3000')
})