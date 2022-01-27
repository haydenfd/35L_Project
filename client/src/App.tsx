import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'

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
    <div className="app">
      <Navbar />
      <div className="body">
        <h1>CONTENT CONTENT CONTENT</h1>
        <form method="POST" encType="multipart/form-data" action="/uploadimg" target="labelimg">
            <input type="file" name="labelimg" id="labelimg" />
            {/* <input type="submit" id="imageSubmit" /> */}
        </form>
        <form onSubmit={submitTest}>
            <input type="submit" />
        </form>
        {/* <h1>SHOULD BE USING GRID LAYOUT FOR THE MAIN CONTENT</h1> */}
      </div>
    </div>
  );
}

export default App;
