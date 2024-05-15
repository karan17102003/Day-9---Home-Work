import { useCallback, useRef, useState } from "react"


function App() {
  const [length,setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [upperCaseAllow,setUpperCase] = useState(false);
  const [lowerCaseAllow,setLowerCase] = useState(false);
  const [symbolAllow,setSymbol] = useState(false);
  const [numberAllow,setNumber] = useState(false);

  // for moderate copy style useRef
  const passwordRef = useRef();
  const copyPassword = useCallback((()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,24);
    window.navigator.clipboard.writeText(password);//for copy text
  }),[password])

  const generatePassword = useCallback(()=>{
    let pass = "",
    str = "";
    if(numberAllow) str+= "1234567890";
    if(symbolAllow) str += "~!@#$%^&*-+";
    if(upperCaseAllow) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(lowerCaseAllow) str += "abcdefghijklmnopqrstuvwxyz";
    for(let i=0; i<length; i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  },[length,upperCaseAllow,lowerCaseAllow,symbolAllow,numberAllow,setPassword]);
    
  
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-xl mb-42 bg-yellow-300">
      <div>
        <input type="text" className="border border-black rounded px-8 py-1 mx-2 my-2" value={password} ref={passwordRef}/>
        <button className="border border-black rounded m-1 p-1 bg-red-400" onClick={generatePassword}>Generate Password</button>
        <button className="border border-black rounded m-1 p-1 bg-yellow-300" onClick={copyPassword}>©️opy</button>
      </div>

      <div className="flex flex-col gap-4 m-2">
      <label className="border border-black rounded px-8 ml-4" onChange={(e)=>setLength(e.target.value)}>
        <input type="range" className="m-2 " min={6} max={36} value={length}/> Range : {length}</label>
    
        <label><input type="checkbox" className="m-2" 
        value={upperCaseAllow} 
        onChange={()=>setUpperCase((prev) => !prev)}
        />UpperCase</label>

        <label><input type="checkbox" 
        className="m-2"
        value={lowerCaseAllow}
        onChange={()=>setLowerCase((prev)=> !prev)}
        />LowerCase</label>

        <label><input type="checkbox" 
        className="m-2"
        value={numberAllow}
        onChange={()=>setNumber((prev) => !prev)}
        />Numbers</label>

        <label><input type="checkbox" 
        className="m-2"
        value={symbolAllow}
        onChange={()=>setSymbol((prev)=> !prev)}
        />Symbols</label>
      </div>
    </div>
  )
}

export default App