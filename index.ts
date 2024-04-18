#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList : string[] = [];
let conditions = true;

console.log(chalk.magenta.bold("\n \t MY TODO-LIST\n"));

// upgrade Todo-list
let main = async() => {
    while(conditions){
        let option = await inquirer.prompt([
            {
                name : "choice",
                type : "list",
                message : "Select an option you want to do",
                choices : ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"]
            }
        ]);

        if (option.choice === "Add Task"){
            await addTask()
        }
        else if (option.choice === "Delete Task"){
            await deleteTask()
        }
        else if (option.choice === "Update Task"){
            await updateTask()
        }
        else if (option.choice === "View Todo-List"){
            await viewTask()
        }
        else if (option.choice === "Exit"){
            conditions = false;
        }
        
    }
}

// Add task function
let addTask = async() => {
    let newTask = await inquirer.prompt([
        {
            name : "task",
            type : "input",
            message : "Enter your new task : "
        }
    ]);
    todoList.push(newTask.task);
    console.log(`\n ${newTask.task} Task added sucessfully in Todo-list`); 
}

// view task function
let viewTask = async() => {
    console.log("\n Your Todo-List \n");
    todoList.forEach((task, index) => {
        console.log(`${index + 1} : ${task}`);
    })
}

// delete task function
let deleteTask = async() => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name : "index",
            type : "number",
            message : "Enter the index of the task you want to delete : "
        }
    ]);

    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deletedTask} This task has been deleted from the todo-list`);

}

// updated task function
let updateTask = async() => {
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name : "index",
            type : "number",
            message : "Enter the 'index no' of the task you want to update : "
        },
        {
            name : "new_task",
            type : "input",
            message : "Now enter the new task name : "
        }
    ]);
    todoList[update_task_index .index - 1] = update_task_index.new_task
    console.log(`\n Task at index no ${update_task_index .index - 1} Updated Successfully [For updated list check option:  "View Todo-List"]`)
}


main();