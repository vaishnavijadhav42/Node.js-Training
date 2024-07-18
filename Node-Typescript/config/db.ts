import mongoose from 'mongoose';

export default mongoose.connect(`mongodb://localhost:27017/demo`)
 .then(()=>{console.log('db connected...')})
 .catch((error:any)=>{console.log(error)});



