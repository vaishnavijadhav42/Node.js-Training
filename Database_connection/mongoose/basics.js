const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/e-com');
const ProductSchema= new mongoose.Schema({
     name:String ,
     brand:String,
     price:Number,

});

//Insert data
const saveDb=async()=>
{
    const ProductModel=new mongoose.model('products',ProductSchema);
    let data=new ProductModel({name:'m 70',brand:"Nokia",price:2000,p:0});
    let response= await data.save();
    console.log(response);
}
saveDb();

//update data
const updateDb=async()=>
    {
        const ProductModel=new mongoose.model('products',ProductSchema);
        let data=await ProductModel.updateOne(
           { name:'m 70'},
            { $set:{price:4000,name:'m 8'} }
        )
        console.log(data);
    }
//updateDb();

//delete data
const deleteDb=async()=>
    {
        const ProductModel=new mongoose.model('products',ProductSchema);
        let data=await ProductModel.deleteOne({name:'m 8'});
        console.log(data);
    }
//deleteDb();

//get data
const findDb=async()=>
    {
        const ProductModel=new mongoose.model('products',ProductSchema);
        //let data=await ProductModel.findOne({name:'m 8'});
        let data=await ProductModel.find();
        console.log(data);
    }
//findDb();