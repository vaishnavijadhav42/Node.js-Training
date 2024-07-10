 const express=require('express');
 const reqFilter=require('./middleware.js')
 
 const app=express();
 const routes=express.Router();

 
routes.use(reqFilter)

//logging request details
app.use((req,res,next)=>
{
    console.log("new request:");
    console.log("host:",req.hostname);
    console.log("path:",req.path);
    console.log("method:",req.method);
    next();

})



 app.get('/',(req,res)=>
    {
        res.send('<h2>Home page..</h2>')
    });

routes.get('/about',(req,res)=>
    {
         res.send('<h2>About page..</h2>')
    });

routes.get('/profile',(req,res)=>
     {
       res.send('<h2>Profile page..</h2>')
     });

app.get('/help',(req,res)=>
   {
      res.send('<h2>Help page..</h2>')
   });


app.use('/',routes)
app.listen(9000);