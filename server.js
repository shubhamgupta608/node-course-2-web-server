const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname +'/views/partials')
app.set('view engine','hbs');
/*app.get('/',(req,res)=>{
    //res.send('Hello express!');   
    res.send('<h1>Hello express!</h1>');   
});
*/
//Middleware:configures how your express application works.You can think to add third party add on in your application
//express.static():what you want to serve up 
//app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
     console.log("Unable to apend to server log.");
    }
    });
   // console.log(`${now}: ${req.method} ${req.url}`);
    next();
});
    // app.use((req,res,next)=>{
    //     res.render('maintenance.hbs');
    // });

app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});
//Routes
app.get('/',(req,res)=>{   
   /* res.send({
        name:"shubham",
        likes:[
            'Biking',
            'Outing'
        ]
    });*/
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMessage:'Welcome to my website',
        currentYear: new Date().getFullYear()
    });
    
});
app.get('/about',(req,res)=>{
    //res.send("About page");
    res.render('about.hbs',{
        pageTitle:'About Page',
      //  currentYear:new Date().getFullYear()
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Unable to handle request"
    });
});
app.listen(3000,()=>{
    console.log("Server is up on port 3000.");
});