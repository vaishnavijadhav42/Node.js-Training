const express=require('express');
const path=require('path');
const app=express();

const path1=path.join(__dirname,'public');
//app.use(express.static(path1));

app.get('',(req,res)=>
{
    res.sendfile(`${path1}/home.html`);
})
app.get('/about',(req,res)=>
    {
        res.sendfile(`${path1}/about.html`)
    })
app.get('/help',(req,res)=>
  {
    res.sendfile(`${path1}/help.html`)
  })
app.listen(9000)
