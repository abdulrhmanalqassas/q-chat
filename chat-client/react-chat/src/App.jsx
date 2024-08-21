import { useState  ,useEffect ,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [serverData, setServerData] = useState('')
  const [userPrompt, setUserPrompt] = useState(null)
  const inputRef = useRef(null)

  useEffect (() => {

    fetch("/test",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({"prompt":"hi "})
    }) 
    .then((res)=>res.json()  ) .then(
  (data)=>{
    const html = DOMPurify.sanitize(marked(data.data))
    setServerData({ data:data.data, html })
      setUserPrompt('')
   
  }
)

    }
    ,[])


    function handleKeyDown(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        inputRef.current.blur()
        handleSubmit()
      }
    }
   function handleSubmit(){
   
    fetch("/test",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({"prompt":userPrompt})
    }) 
    .then((res)=>res.json()  ) .then(
  (data)=>{
    const html = DOMPurify.sanitize(marked(data.data))
    setServerData({ data:data.data, html })
    inputRef.current.focus()
    setUserPrompt('')
   
  }
)
   } 
    
  return (
    <>

      <main style={{width: '90vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ padding: '10px', marginBottom: '0' }}>MyPrompter</h1>
      <div style={{ margin: '0', flexGrow: '1', overflow: 'scroll' }}>
        <div style={{ width: '100%', height: '100%' }}>
          {
            (serverData === '') ? ('Loading...') :
              <article style={{ margin: '0' }} dangerouslySetInnerHTML={{ __html: serverData.html }} />
          }
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'end', backgroundColor: '#222', padding: '10px' }}>
        <textarea onChange={(e) => setUserPrompt(e.target.value)} onKeyDown={handleKeyDown} ref={inputRef} value={userPrompt ? userPrompt : ""} style={{ margin: '0', flexGrow: '1', overflowY: 'hidden' }} placeholder='Type in Prompt...' />
        <button onClick={handleSubmit} style={{ margin: '0', flex: '1', marginLeft: '10px' }}>Go</button>
      </div>
    </main>
    </>
  )
}

export default App
