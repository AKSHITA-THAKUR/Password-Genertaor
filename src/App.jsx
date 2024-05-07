import { useState , useCallback , useEffect ,useRef, React } from 'react';
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState("");
 //useRef hook

const passwordRef = useRef(null);

 const passwordGenerator = useCallback(()=> {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numberAllowed) {str +="0123456789"}
  if(charAllowed) {str +="@%#&*$(_)(*&"}

  for (let i = 0; i < length; i++) { // Fix loop condition
    let charIndex = Math.floor(Math.random() * str.length); // Fix index
    pass += str.charAt(charIndex); // Append character
  }
setPassword(pass)} , [length , numberAllowed , charAllowed , setPassword]);

const copyPassword = useCallback(() => {
passwordRef.current?.select() //Select the password making the colour blue
window.navigator.clipboard.writeText(password);

} , [password])

  useEffect(()=>{passwordGenerator();} , [length , numberAllowed , charAllowed ,passwordGenerator ])
  return (
    <div>
    <h1  style={{color : "White", textAlign : "center"}}>Password Generator</h1>
    <center>
    <div className="upr">
    <input  type='text'  value={password} ref={passwordRef}  readOnly className='field'/>

    <button  onClick={copyPassword} className='copy'>Copy</button>
    </div>
    </center>
    
   <div className='thlle'>
   <div className='range'>
   <input type='range' min={8} max={50} 
   value={length}  className='cursor' onChange={(e) => {setLength(e.target.value)}}></input>
   <label style={{color : "white"}}>Length {length}</label>
   </div>

   <div className='checkbox'>
   <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={()=> {setNumberAllowed((prev) => !prev);
  }}></input>
  <label style={{color: "white" }}>Numbers</label>
   
   </div>
   <div className='checkbox'>
   <input type='checkbox' defaultChecked={charAllowed} id='charInput' onChange={()=> {setCharAllowed((prev) => !prev);
  }}></input>
  <label style={{color: "white"}}>Characters</label>
   
   </div>
   </div>
  
    </div>
  )
  
      

}

export default App
