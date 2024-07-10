const dbConnect=require('./1_db_connection');


const main=async()=>
{
    let data=await dbConnect();
    //let response=await data.deleteOne({name:'Moto G Power'});
    let response=await data.deleteMany({brand:'Xiaomi'});
    console.log(response);
}

main();