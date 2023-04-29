import React,{ useState } from 'react'

const Signup = ({ setToken }) => {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [login,setLogin] = useState(true);
    const [error,setError] = useState(null);
    const changeHandler = (e)=>{
        switch (e.target.id) {
            case 'username':
                setUsername(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    const signupClickHandler = async (e)=>{
        e.preventDefault();
        setError(null)
        if(username === ''){
            setError('Username is required');
            return;
        }
        else if(password === ''){
            setError('Password is required');
            return;
        }
        else if(email === ''){
            setError('Email is required');
            return;
        }
        const data = {
            username,
            email,
            password
        }
        console.log(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users/signup`)
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users/signup`, {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });
        const {token} = await response.json();
        console.log(token)
        localStorage.setItem('token',token)
        setToken(token)
    }
    
    const loginClickHandler = async (e)=>{
        e.preventDefault();
        setError(null)

        if(username === ''){
            setError('Username is required');
            return;
        }
        else if(password === ''){
            setError('Password is required');
            return;
        }
        const data = {
            username,
            password
        }
        
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/users/login`, {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
        const {token} = await response.json();
        console.log(token)
        localStorage.setItem('token',token)
        setToken(token)
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='ml-4 font-oswald text-xl mt-4 border-2 border-black rounded-md p-2'>TaskMaster</div>
        <div className='flex justify-center items-center mt-10'>
            <div className={login?'mx-2 cursor-pointer':'mx-2 border-b-2 border-sky-900 cursor-pointer'} onClick={()=>{setError(null);setLogin(false)}}>Signup</div>
            <div className={login?'mx-2 border-b-2 border-sky-900 cursor-pointer':'mx-2 cursor-pointer'} onClick={()=>{setError(null);setLogin(true)}}>Login</div>
        </div>
        <div>
            {
                login? 
                <form className='flex flex-col justify-center items-center border-2 border-black w-96 my-4 rounded-md'>
                    <div className='my-4'>
                        <label className='mr-2' htmlFor="username" required>Username</label>
                        <input className='border-2 border-black mx-2 rounded-md px-2 py-1' type="text" name="username" id="username" value={username} onChange={changeHandler}/>
                    </div>
                    <div>
                        <label className='mr-2' htmlFor="password">Password</label>
                        <input className='border-2 border-black mx-2 rounded-md px-2 py-1' type="password" name="password" id="password" value={password} onChange={changeHandler}/>
                    </div>
                        <button className='bg-green-300 border-2 border-black rounded-md px-2 my-4 mt-8' type="submit" onClick={loginClickHandler}>LOGIN</button>
                        {error && <div className='text-red-600 text-sm'>{error}</div>}
                </form>
                :
                <form className='flex flex-col justify-center items-center border-2 border-black w-96 my-4 rounded-md'>
                    <div className='my-4'>
                        <label className='mr-2' htmlFor="username">Username</label>
                        <input className='border-2 border-black mx-2 rounded-md px-2 py-1' type="text" name="username" id="username" value={username} onChange={changeHandler}/>
                    </div>
                    <div className='my-4'>
                        <label className='mr-10' htmlFor="email">Email</label>
                        <input className='border-2 border-black mx-2 rounded-md px-2 py-1' type="text" name="email" id="email" value={email} onChange={changeHandler}/>
                    </div>
                    <div className='my-2'>
                        <label className='mr-4' htmlFor="password">Password</label>
                        <input className='border-2 border-black mx-2 rounded-md px-2 py-1' type="password" name="password" id="password" value={password} onChange={changeHandler}/>
                    </div>
                    <button type="submit" className='bg-green-300 border-2 border-black rounded-md px-2 my-4 mt-8' onClick={signupClickHandler}>SIGNUP</button>
                    {error && <div className='text-red-600'>{error}</div>}
                </form>
            }
        
        </div>
    </div>
  )
}

export default Signup
