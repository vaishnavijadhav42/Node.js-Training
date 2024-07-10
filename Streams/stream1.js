const fs=require("fs");
const http=require('http');



const myserver=http.createServer((req,res)=>
    {
        /* fs.readFile('sample.txt', (err, data) => {
            if (err) throw err;
            res.write(">>>>>>>>Data:")
            res.write(data);
            

         });
 */
        const stream=fs.createReadStream('sample.txt');

        stream.on('data',(chunk)=>{
            //console.log(chunk)
            res.write(">>>>>>>>Data:")
            res.write(chunk)
           })
        
        stream.on('end',()=>res.end())
        stream.on('error',(err) => {
            console.log('Stream error:', err);
        });


    });

    myserver.listen(9000);