const dbConnect=require('./1_db_connection');


const updateData=async()=>
{
    let data=await dbConnect();
    /* let response=await data.updateOne(
        {name:'m 40'},
       { $set:{brand:'Xiaomi',price:'1000'} }

    ) */

       let response=await data.updateMany(
        {brand:'OnePlus'},
       { $set:{price:'60000'} }


    ) 


    console.log(response);
    
}

updateData();