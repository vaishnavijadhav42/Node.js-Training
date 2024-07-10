const express=require('express');
const mongodb=require('mongodb');
const dbConnect=require('../1_db_connection');
const app=express();

app.use(express.json());

app.get('/',async(req,res)=>
{
    let data=await dbConnect();
    let response=await data.find().toArray();
    res.send(response);
})

app.post('/',async(req,res)=>
    {
        let data=await dbConnect();
        //let response=await data.insertOne(req.body);
        let response=await data.insertMany(req.body); //send array of documents
        res.send(response);
    })

app.put('/:name',async(req,res)=>
        {
            let data=await dbConnect();
           
            let response=await data.updateOne(
                //{name:req.body.name},
                {name:req.params.name},
                {$set:req.body}
            ); 
            res.send(response);
        })

app.delete('/:id',async(req,res)=>
    {
      let data=await dbConnect();
      let response=await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
      res.send(response);
    })
app.listen(8000);

