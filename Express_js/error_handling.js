const express=require('express');
const app=express();


app.get('/',(req,res)=>
   {
       res.send('<h2>Home page..</h2>')
   });

app.get('/about',(req,res)=>
   {
        res.send('<h2>About page..</h2>')
   });

app.get('/profile',(req,res)=>
    {
      res.send('<h2>Profile page..</h2>')
    });

app.get('/help',(req,res)=>
  {
    res.in("error");
     res.send('<h2>Help page..</h2>')
     
  });

app.all('*',(req,res,next)=>
{
   /* res.status(404).json({
       status:'error',
       message:`cant find ${req.originalUrl} on server`
   })
   next(); */
   const err=new Error(`cant find ${req.originalUrl} on server`);
   //err.status('error');
   err.status='error';
   err.statusCode=404;
   next(err);


});

app.use((error,req,res,next)=>
{
    error.statusCode=error.statusCode || 500 ;
    error.status=error.status || 'error' ;
    res.status(error.statusCode).json({
        status:error.status,
        message:error.message
    })
})

app.listen(9000);