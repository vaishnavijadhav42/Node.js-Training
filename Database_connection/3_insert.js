const dbConnect=require('./1_db_connection');

const insertData=async()=>
{
    let data=await dbConnect();
    let response=await data.insertMany([
        {"name": "OnePlus 9", "brand": "OnePlus", "price": 729},
    {"name": "Sony Xperia 5 II", "brand": "Sony", "price": 949},
    {"name": "LG Velvet", "brand": "LG", "price": 599},
    {"name": "Huawei P40 Pro", "brand": "Huawei", "price": 899},
    {"name": "Google Pixel 5", "brand": "Google", "price": 699},
    {"name": "Asus ROG Phone 5", "brand": "Asus", "price": 999},
    ])
   console.log(response); 
   if(response.acknowledged)
    {
     console.log('Data is insterted...')
    }
    
}

insertData();