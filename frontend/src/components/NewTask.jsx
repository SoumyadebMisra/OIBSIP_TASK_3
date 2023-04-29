import React,{ useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { RxCross2 } from 'react-icons/rx'


const NewTask = ({ setSeed }) => {
    const [modal,setModal] = useState(false);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('')
    const [error,setError] = useState(null)

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

    const createTask = async (e)=>{
        e.preventDefault();
        setError(null)
        if(name === ''){
          setError('Name is required');
          return;
        }
        else if(description === ''){
          setError('Description is required');
          return;
        }
        const token = localStorage.getItem('token')
        const data = {
            name,
            description
        }
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/tasks`, {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
          });
        const task = await response.json();
        console.log(task)
        setModal(false)
        setSeed(seed=>!seed)
    }

  return (
    <div>

    <div className='bg-green-500 border-2 border-black p-2 rounded-md mr-4 cursor-pointer' onClick={()=>{setModal(modal => !modal)}}>
      { modal ? <RxCross2/>:<GoPlus />}
    </div>
    {
        modal &&
        <div className='absolute border-2 border-black p-2 right-10 top-28 bg-white rounded-md'>
            <form className='flex flex-col'>
                <label className='mx-2' htmlFor="name">Name</label>
                <input className='border-2 border-black rounded-md p-1 mb-1' type="text" name="name" id="name" value={name} onChange={changeHandler}  />
                <label className='mx-2' htmlFor="description">Description</label>
                <textarea className='border-2 border-black rounded-md p-1 mb-1' name="description" id="description" cols="25" rows="5" onChange={changeHandler} value={description}></textarea>
                <button className='bg-green-400 border-2 border-black rounded-md p-1 mt-4' onClick={createTask}>CREATE</button>
                {error && <div className='text-red-600 text-sm ml-auto mr-auto mt-2'>{error}</div> }
            </form>
        </div>
    }
    
    </div>
  )
}

export default NewTask
