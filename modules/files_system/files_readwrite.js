
const fs=require("fs");

/* //file write synchronous
fs.writeFileSync("myfile.txt","File system module");
console.log("file write done...");

////file write asynchronous
fs.writeFile("myfile_1.txt","Second file...",function(err){
    if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("file-2 write done...");
        }
})

console.log("after file created...");
 */


////file read

//read file synchronous
let data =fs.readFileSync("myfile.txt");
console.log("Data of file : ",data.toString());

//read file asynchronous
let data1 =fs.readFile("myfile.txt",function(err,data){
    if(err)
        console.log(err);
    else
    console.log("Data of file : ",data.toString());

});
console.log("After file read");


