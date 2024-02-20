// const readline = require("readline");
// const fs = require('fs').promises;
// const path =require('path');


// const filePath = path.join(__dirname,'todo.txt');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });


// function getInput(question) {
  

//   return new Promise((resolve, reject) => {
//     rl.question(question, resolve);
//     // rl.close();
//   });
// }

//  async function  addNewTask(){
   
//       const task = await getInput("Give Your Task :- ")
//       console.log(task);
//         // await fs.appendFile(filePath ,task);
//     await  fs.appendFile(filePath ,task,()=>{
       

//     });

// }

// async function viewTask(){
  
// }



// async function main() {
//   while (true) {
//     console.log("\n1. Add a new task");
//     console.log("2. View task");
//     console.log("3. Mark a task as complete");
//     console.log("4. Remove a task");
//     console.log("5. Exit");

//     const choice = parseInt(await getInput("Enter Your Choice :-"));

//     // console.log(typeof choice);
//     // console.log(choice);
//     switch (choice) {
//       case 1:
//          await addNewTask();
//         break;
//       case 2:
//          await viewTask();
//         break;
//       case 5:
//         rl.close();
//         process.exit(0);
//         // return;
//     }
//   }
// }

// main();






// TODO: chatgpt 

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tasksFilePath = path.join(__dirname, 'tasks.txt');

// Function to add a new task
function addTask(task) {
    fs.appendFile(tasksFilePath, task + '\n', (err) => {
        if (err) {
            console.error('Error adding task:', err);
        } else {
            console.log('Task added successfully.');
        }
    });
}

// Function to view a list of tasks
function viewTasks() {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tasks:', err);
        } else {
            if (data.trim() === '') {
                console.log('No tasks available.');
            } else {
                const tasks = data.split('\n');
                tasks.forEach((task, index) => {
                    console.log(`${index + 1}. ${task}`);
                });
            }
        }
    });
}

// Function to mark a task as complete
function markTaskComplete(taskNumber) {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tasks:', err);
        } else {
            const tasks = data.split('\n');
            if (taskNumber >= 1 && taskNumber <= tasks.length) {
                tasks[taskNumber - 1] = '[X] ' + tasks[taskNumber - 1];
                fs.writeFile(tasksFilePath, tasks.join('\n'), (err) => {
                    if (err) {
                        console.error('Error marking task as complete:', err);
                    } else {
                        console.log('Task marked as complete.');
                    }
                });
            } else {
                console.log('Invalid task number.');
            }
        }
    });
}

// Function to remove a task
function removeTask(taskNumber) {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tasks:', err);
        } else {
            const tasks = data.split('\n');
            if (taskNumber >= 1 && taskNumber <= tasks.length) {
                tasks.splice(taskNumber - 1, 1);
                fs.writeFile(tasksFilePath, tasks.join('\n'), (err) => {
                    if (err) {
                        console.error('Error removing task:', err);
                    } else {
                        console.log('Task removed successfully.');
                    }
                });
            } else {
                console.log('Invalid task number.');
            }
        }
    });
}

// Interface for user interaction
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Choose an operation (add/view/mark/remove): ', (operation) => {
    switch (operation) {
        case 'add':
            rl.question('Enter task to add: ', (task) => {
                addTask(task);
                rl.close();
            });
            break;
        case 'view':
            viewTasks();
            rl.close();
            break;
        case 'mark':
            rl.question('Enter task number to mark as complete: ', (taskNumber) => {
                markTaskComplete(parseInt(taskNumber));
                rl.close();
            });
            break;
        case 'remove':
            rl.question('Enter task number to remove: ', (taskNumber) => {
                removeTask(parseInt(taskNumber));
                rl.close();
            });
            break;
        default:
            console.log('Invalid operation.');
            rl.close();
            break;
    }
});



