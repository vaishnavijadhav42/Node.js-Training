const express=require('express');
const app=express();

app.get('',(req,res)=>
{
 res.send("Home page..")
})

app.get('/about',(req,res)=>
    {
     res.send("About page..")
    })

app.get('/help',(req,res)=>
    {
        
        res.send("Help page..")
        console.log(req.query);
        console.log(req.query.name);
    })
app.get('/about-us',(req,res)=>
      {
       res.redirect('/about');
      })
app.listen(8090);