// TO BE USED FOR TESTING CLIENT-SERVER CONNECTIONS, WILL BE REFINED ELSEWHERE

import React, { useEffect } from 'react';
import './index.css';

function Test() {

    useEffect(() => {
        
    }, [])

    async function getUser(e: React.FormEvent) {
        e.preventDefault()
        await fetch('/api/getuser', {
            method: 'POST',
            body: JSON.stringify({ "userEmail": "someEmail"}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(response => console.log(response.result))
    }

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
        // let form = document.getElementById('imgform') as HTMLFormElement
        let file = document.getElementById('labelimg') as HTMLInputElement
        // if (!form) return
        if (!file.files) return
        // let formData = new FormData(form)
        let formData = new FormData()
        // formData.append('email', 'someEmail')
        formData.append('originalname', 'true')
        formData.append('labelimg', file.files[0])
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
}

export default Test;