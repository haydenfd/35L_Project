import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    useEffect(() => {
        // fetch('/api/test')
        // console.log("hi");
        
    }, [])

    async function submitTest(e: React.FormEvent) {
        e.preventDefault()
        let formData = new FormData()
        formData.append('myKey', 'myValue')
        console.log("hi");
        
        const postData = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
                //TODO: formidable for multipart form data(?)
                'Content-Type': 'application/json'
            },
            // body: formData
            body: JSON.stringify({"MYDATA": "HI"})

        }
        await fetch('/api/test', postData)
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
        <form method="POST" encType="multipart/form-data" action="/uploadimg" target="labelimg">
            <input type="file" name="labelimg" id="labelimg" />
            <input type="submit" id="imageSubmit" />
        </form>
        <form onSubmit={submitTest}>
            <input type="submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
