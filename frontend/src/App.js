import { useState,useEffect } from 'react'
import Signup from './components/Signup';
import Tasks from './components/Tasks';
import Nav from './components/Nav';
import "./index.css"

function App() {
  const [token,setToken] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token) setToken(token)
  },[])

  if(!token){
    return (
      <>
        <Signup setToken = {setToken}/>
      </>
    )
  }

  return (
    <div>
      <Nav setToken = {setToken}/>
      <Tasks/>
    </div>
  );
}

export default App;
