// TO BE USED FOR TESTING CLIENT-SERVER CONNECTIONS, WILL BE REFINED ELSEWHERE

import React, { useEffect } from 'react';
import './index.css';

function Test() {

    useEffect(() => {
        // fetch('/api/test')
        // console.log("hi");
        
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
    <div className="app">
      <div className="body">
        <h1>CONTENT CONTENT CONTENT</h1>
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
        {/* <h1>SHOULD BE USING GRID LAYOUT FOR THE MAIN CONTENT</h1> */}
      </div>
    </div>
  );
}

export default Test;