const fs=require("fs");

/* //synchronous mkdir
try{
    if(!fs.existsSync("filedir"))
        {
            fs.mkdirSync("filedir");
            console.log("Directory created")
        }
    else{
          console.log("Directory already exists..")
        }
    
}
catch(error)
{
    console.log("Error occured:"+error);
}
console.log("after mkdirSync()");

//asynchronous mkdir

fs.mkdir('filedir1',function(err){
    if(err)
        {
            console.log("Error:",err)
        }
        
    console.log("Directory created")
})
console.log("after mkdir()");
 */

//delete directory
//synchronous 


/* if (fs.existsSync('filedir1')) {
    fs.rmdirSync('filedir1');
    console.log("Directory deleted....");
} else {
    console.log("Directory does not exist..");
} */

//asynchronous

/* fs.rmdir('filedir',function(err){
    if(err)
        {
            console.log("Error:",err)
        }
        
    console.log("Directory deleted")
})
 */
const data=fs.readdirSync(__dirname);
console.log(data) 
 
fs.readdir(__dirname,function(err,data){
    if(err)
        {
            console.log("Error:",err)
        }
        else
        {
            console.log(data)  
        }
        
})

