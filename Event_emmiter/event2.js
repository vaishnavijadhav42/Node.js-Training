const EventEmitter = require('events');

const taskEmitter = new EventEmitter();

let tasks = [];

// Function to add a task
function addTask(title) {
    const newTask = { id: tasks.length + 1,title, completed: false };
    tasks.push(newTask);
    // Emit the taskAdded event
    taskEmitter.emit('taskAdded', newTask);
  }
  
  // Function to mark a task as completed
  function completeTask(taskId) {
    const task = tasks.find(task => task.id === taskId);

  
    if (task) {
      task.completed = true;
     // Emit the taskCompleted event
      taskEmitter.emit('taskCompleted', task);
    } else {
      console.log('Task not found');
    }
  }
  


  // Listener for 'taskAdded' event
  taskEmitter.on('taskAdded', (task) => {
    console.log(`New task added:`,task);
  });
  
  // Listener for 'taskCompleted' event
  taskEmitter.on('taskCompleted', (task) => {
    console.log(`Task completed:`,task);
  });
  


addTask('Complete assignment');
addTask('Prepare presentation');

// Complete a task
completeTask(1); 

// Add another task
addTask('Review feedback');

// Complete another task
//completeTask("2"); 
completeTask(2);
completeTask(4); 

