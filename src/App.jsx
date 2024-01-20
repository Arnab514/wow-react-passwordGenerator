import { useCallback, useEffect, useState, useRef } from 'react'

import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(false)

  const passwordReff = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = 'ABCDEFGHIJKLMNOPQRSTWVXYZabcdefghijklmnopqrstwvxyz'

    if (numAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*/?.<>,'

    for(let i = 1 ; i <= length ; i++)
    {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  } , [length , numAllowed , charAllowed])

  const copyPassword = useCallback(() => {
    passwordReff.current?.select()
    passwordReff.current?.setSelectionRange(0 , 99)
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect(() => {
    passwordGenerator()
  } , [length , numAllowed , charAllowed])

  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
          <h1 className='text-white text-center my-3 font-semibold text-2xl'>Password generator</h1>
      </div>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" className="outline-none w-full py-1 px-3 " value={password} placeholder='password' readOnly ref={passwordReff} />

        <button className='bg-green-800 text-white px-4 py-2 rounded-sm shrink-0' 
        onClick = {copyPassword}>Copy</button>
      </div>

      <div className='flex gap-6 '>
        <div className='flex gap-1'>
          <input type="range" min={6} max={100} className='cursor-pointer' value={length}
          onChange={(e) => {setLength(e.target.value)}} />
          <label >Length: ({length})</label>
        </div>

        <div className='flex gap-1'>
          <input type="checkbox" className='cursor-pointer' defaultChecked={numAllowed}
          onChange= {() => {setNumAllowed((prev) => !prev)}} />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex gap-1'>
          <input type="checkbox" className='cursor-pointer' defaultChecked={charAllowed}
          onChange={() => {setCharAllowed((prev) => !prev)}}
          />
          <label htmlFor="characterInput">Spcl. Character</label>
        </div>
        
        
          <button className='bg-blue-600 rounded-md px-4 py-2 font-semibold text-slate-300'
          onClick={passwordGenerator}>Generate Password</button>
        
      </div>
      
    </>
  )
}

export default App
