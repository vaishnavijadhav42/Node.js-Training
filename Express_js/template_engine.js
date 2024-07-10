const express=require('express');
const app=express();

//register view engine for ejs
app.set('view engine','ejs');

const users = {
    id:1,
    name:'Jonh',
    email:'john@gmail.com'
};

app.get('/profile',(req,res)=>
{
    res.render('profile',{users:users})
})

app.listen(9090);