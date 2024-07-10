const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

//once()
function initializeDatabase() {
  console.log('Database connection established.');
  
}

eventEmitter.once('dbConnect', initializeDatabase);


eventEmitter.emit('dbConnect'); 
eventEmitter.emit('dbConnect'); 

//removeListener()
function onEvent() {
    console.log('First Event');
  }
  
  eventEmitter.on('event1', onEvent);
  eventEmitter.emit('event1');
  eventEmitter.removeListener('event1', onEvent);
  eventEmitter.emit('event1'); 















