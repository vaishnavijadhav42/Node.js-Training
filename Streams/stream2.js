const fs=require("fs");
const readableStream=fs.createReadStream('sample.txt');
const writableStream=fs.createWriteStream('sample_1.txt');
        
       /*  readableStream.on('data',(chunk)=>{
            writableStream.write(chunk);
           })
        
        stream.on('end',()=>console.log("Write completed...."))
        stream.on('error',(err) => {
            console.log('Stream error:', err);
        }); */
        
//using pipe
readableStream.pipe(writableStream);

// Handle events for errors or when the pipe is finished
readableStream.on('error', (err) => {
  console.error('Error reading the file:', err);
});

writableStream.on('finish', () => {
  console.log('Write completed.');
});
