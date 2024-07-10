const fs=require("fs");

fs.writeFileSync("demo.txt","File Contents");

//Synchronous delete
/* try{
    fs.unlinkSync("demo.txt");
    console.log("file deleted....")
}
catch(error)
{
    console.log(error);
} */


//Asynchronous delete

/* fs.unlink("demo.txt",function(err)
{
   if(err)
    console.log("Error occured: ",err)
   else
     console.log("File deleted..")
})
 */
fs.unlink("/NODE-COURSE/modules/files_system/demo.txt",function(err)
{
   if(err)
    console.log("Error occured: ",err)
   else
     console.log("File deleted..")
})








