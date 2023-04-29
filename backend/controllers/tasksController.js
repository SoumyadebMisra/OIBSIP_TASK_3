const { User,Task } = require('../models/models');

const allTasksController = async (req,res)=>{
    const userId = req.headers['User-Id'];
    const user = await User.findById(userId)
    if(!user) return res.status(401).json({ error: 'User not authenticated' })
    return res.json({ tasks: user.tasks })
}
const taskController = async (req,res)=>{
    const taskId = req.params.id
    const userId = req.headers['User-Id'];
    const user = await User.findById(userId)
    if(!user) return res.status(401).json({ error: 'User not authenticated' })

    let tasks = user.tasks
    for(let i=0;i<tasks.length;i++){
        if(tasks[i]._id == taskId){
            return res.json({ task : tasks[i] })

        }
    }
    return res.status(404).json({ error : 'The given task Id does not exist' })
}
const newTaskController = async (req,res)=>{
    const {name,description} = req.body;
    const task = new Task({ name,description })
    const userId = req.headers['User-Id'];
    const user = await User.findById(userId)
    if(!user) return res.status(401).json({ error: 'User not authenticated' })

    user.tasks.push(task);
    await user.save();
    return res.json({task})
}
const editTaskController = async (req,res)=>{
    const taskId = req.params.id

    const {name,description,status} = req.body;
    const userId = req.headers['User-Id'];
    const user = await User.findById(userId)
    if(!user) return res.status(401).json({ error: 'User not authenticated' })

    let tasks = user.tasks
    for(let i=0;i<tasks.length;i++){
        if(tasks[i]._id == taskId){
            if(name) tasks[i].name = name;
            if(description) tasks[i].description = description;
            if(status) tasks[i].status = status

            break;
        }
    }
    user.tasks = tasks
    await user.save();
    return res.json({ tasks: user.tasks })
}

const deleteTaskController = async (req,res)=>{
    const taskId = req.params.id
    const userId = req.headers['User-Id'];
    const user = await User.findById(userId)
    if(!user) return res.status(401).json({ error: 'User not authenticated' })

    let tasks = user.tasks;
    let ind = tasks.findIndex((task)=>{
        return task._id == taskId
    })
    tasks.splice(ind,1);
    user.tasks = tasks;
    await user.save()
    return res.json({ success: 'Task deleted' })
}

module.exports = {allTasksController,taskController,newTaskController,editTaskController,deleteTaskController}