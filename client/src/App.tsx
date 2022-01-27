import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    useEffect(() => {
        (async () => {
            await fetch('/api/getuser', {
                method: 'POST',
                body: JSON.stringify({ "userEmail": "someEmail"}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(response => console.log(response.result))
        })()
    }, [])

    async function submitTest(e: React.FormEvent) {
        e.preventDefault()
        
        const postData = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
                'Content-Type': 'application/json'
            },
            // body: formData
            body: JSON.stringify({"MYDATA": "HI"})

        }
        await fetch('/api/test', postData)
    }

    async function submitFile(e: React.FormEvent) {
        e.preventDefault()
        let form = document.getElementById('imgform') as HTMLFormElement
        if (!form) return
        let formData = new FormData(form)
        await fetch('/api/uploadimg', {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
        })
    }

    async function getImg(e: React.FormEvent) {
        e.preventDefault()
        await fetch('/api/getimg', {
            method: 'POST',
            body: JSON.stringify({ "fileName": "1e8309b5b21b77e02a2ab3318a5c498b.jpg"}),
            headers: {'Content-Type': 'application/json'}}
        ).then(res => res.json()).then(response => console.log(response))
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <iframe title="labelimg" name="labelimg" style={{display: "none"}}></iframe>
        <form action="/api/uploadimg" target="labelimg" id="imgform" onSubmit={submitFile}>
            <input type="file" name="labelimg" id="labelimg" />
            <input type="submit" id="imageSubmit" />
        </form>
        <form onSubmit={submitTest}>
            <input type="submit" />
        </form>
        <form onSubmit={getImg}>
            <input type="submit" value='getIMG' />
        </form>
        
      </header>
    </div>
  );
}

export default App;
