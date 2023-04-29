import React,{ useState } from 'react'
import { FiEdit2 } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx'
import { TiTick } from 'react-icons/ti'


const Task = ({ task, setSeed }) => {
    const [editModal,setEditModal] = useState(false);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('')

    const changeHandler = (e)=>{
        switch (e.target.id) {
            case 'name':
                setName(e.target.value)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
            default:
                break;
        }
    }
    const editHandler = async (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token')
        const data = {
            name,
            description
        }
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/tasks/${task._id}`, {
            method: "PUT",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
          });
        const updatedTask = await response.json();
        console.log(updatedTask)
        setEditModal(false)
        setSeed(seed=>!seed)
    }
    const deleteHandler = async (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/tasks/${task._id}`, {
            method: "DELETE",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`
            }
          });
          const msg = await response.json();
          console.log(msg)
          setSeed(seed=>!seed)
    }
    const completeHandler = async (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token')
        const data = {
            status: 'COMPLETED'
        }
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/tasks/${task._id}`, {
            method: "PUT",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
          });
        const updatedTask = await response.json();
        console.log(updatedTask)
        setSeed(seed=>!seed)
    }

    const date = new Date(task.created)
    let mainClass = 'flex justify-between items-center shadow-md shadow-slate-500 p-2 m-1 h-12 '
    if(task.status === 'PENDING') mainClass += 'bg-red-200'
    else mainClass += 'bg-green-200'
  return (
    <div className='flex flex-col my-2'>

        <div className={mainClass}>
            <div className='flex'>

        <div className='text-sm font-light mx-2'>{date.getDate()}-{date.getMonth()}-{date.getFullYear()}</div>
        <div className='text-sm font-light mx-2'>{date.getHours()}:{date.getMinutes()}</div>
            </div>
        <div>{task.name}</div>
        <div className='text-sm'>{task.description}</div>
        <div>
            { task.status === 'PENDING' && <button className='bg-sky-300 p-1 rounded-md border-2 border-black mr-2' onClick={completeHandler}><TiTick/></button> }
            {editModal?<button className='bg-sky-300 p-1 rounded-md border-2 border-black mr-2' onClick={()=>{setEditModal(modal => !modal)}}><RxCross2/></button>: <button className='bg-sky-300 p-1 rounded-md border-2 border-black mr-2' onClick={()=>{setEditModal(modal => !modal)}}><FiEdit2/></button>}
            <button className='bg-red-300 p-1 rounded-md border-2 border-black mr-2' onClick={deleteHandler}><AiFillDelete /></button>
        </div>
        </div>
        {editModal &&

            <div className='border-2 border-black p-2 right-10 top-28 bg-white w-80 shadow-md shadow-black ml-auto mr-auto mt-1'>
                <form className='flex flex-col'>
                    <label className='mx-2' htmlFor="name">Name</label>
                    <input className='border-2 border-black rounded-md p-1 mb-1' type="text" name="name" id="name" value={name} onChange={changeHandler}  />
                    <label className='mx-2' htmlFor="description">Description</label>
                    <input className='border-2 border-black rounded-md p-1 mb-1' type="text" name="description" id="description" value={description} onChange={changeHandler}  />

                    <button className='bg-sky-400 border-2 border-black rounded-md p-1 mt-4' onClick={editHandler}>UPDATE</button>
                </form>
            </div>
        }
    </div>
  )
}

export default Task
