import React, { useState,useEffect } from 'react'
import Task from './Task';
import NewTask from './NewTask';

const Tasks = ({ token }) => {
    const [taskList,setTaskList] = useState([])
    const [selected,setSelected] = useState('All')
    const [seed,setSeed] = useState(false)

    const fetchTasks = async (token)=>{
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/tasks`, {
            method: "GET",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`
            }
          });

          const data = await response.json();
          setTaskList(data.tasks)
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        fetchTasks(token);
    },[seed])

  return (
    <div>
        <div className='flex justify-between my-4 ml-2'>
            <div className='flex border border-black p-1 rounded-md'>
                {selected === 'All' ?<div className='mx-2 border-b-2 border-sky-900 cursor-pointer'>All</div>: <div onClick={()=>{setSelected('All')}} className='mx-2 cursor-pointer'>All</div>}
                {selected === 'Pending' ?<div className='mx-2 border-b-2 border-sky-900 cursor-pointer'>Pending</div>: <div onClick={()=>{setSelected('Pending')}} className='mx-2 cursor-pointer'>Pending</div>}
                {selected === 'Completed' ?<div className='mx-2 border-b-2 border-sky-900 cursor-pointer'>Completed</div>: <div onClick={()=>{setSelected('Completed')}} className='mx-2 cursor-pointer'>Completed</div>}
            </div>
            <div>
                <NewTask setSeed = {setSeed}/>
            </div>
            
        </div>
        <div className='ml-1 mr-2'>
        { taskList &&
        taskList
        .sort((task1,task2)=>{
            return new Date(task2.created) - new Date(task1.created)
        })
        .filter((task)=>{
            if(selected === "All") return true;
            if(selected === 'Pending') return task.status === 'PENDING';
            if(selected === 'Completed') return task.status === 'COMPLETED';

            return true
        })
        .map((task)=> {
            return (
                <Task setSeed= {setSeed} key={task._id} task = {task} />
            )
        })
      }
        </div>
      
    </div>
  )
}

export default Tasks
