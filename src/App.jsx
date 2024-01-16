import { useState, useCallback ,useEffect,useRef} from "react";
import "./App.css";



function App() {
  const passwordref=useRef(null)
  const [length, setLength] = useState(8);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()+=";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, characterAllowed, numberAllowed, setPassword]);
  const copyPassword = ()=>{
    passwordref.current?.select()

    window.navigator.clipboard.writeText(password);
    alert('Text copied to clipboard thanks for using Password Generator')

  }
useEffect(()=>{
  passwordGenerator()
},[length, characterAllowed, numberAllowed, setPassword])
  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md
     rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
     <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounde-lg overflow-hiden mb-4">
       <input type="text"
       value={password}
       className='outline-none w-full py-1 px-3'
       placeholder='password'
       readOnly
       ref={passwordref}
       /> 
       <button onClick={copyPassword} className='outline-none bg-blue-800 text-white
       px-3 py-0.5 shrink-0'>Copy</button>
       
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
          <label htmlFor="numberInput"> Numbers </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={characterAllowed}
          id="characterInput"
          onChange={()=>{setCharacterAllowed((prev)=>!prev)}}/>
          <label htmlFor="characterInput"> Characters </label>
        </div>
      </div>
      
      
     </div>
    </>
  );
}

export default App;
