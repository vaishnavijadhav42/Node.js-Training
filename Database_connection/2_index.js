const dbConnect=require('./1_db_connection');


const main=async()=>
{
    let data=await dbConnect();
    let response=await data.find().toArray();
    console.log(response);
}

main();