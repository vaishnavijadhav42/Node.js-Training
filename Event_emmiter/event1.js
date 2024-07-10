const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('start', (message) => {
  console.log(message);
});

eventEmitter.emit('start', 'First event..');
