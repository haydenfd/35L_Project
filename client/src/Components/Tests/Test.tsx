// TO BE USED FOR TESTING CLIENT-SERVER CONNECTIONS, WILL BE REFINED ELSEWHERE

import React, { useEffect } from 'react';
import './index.css';


interface userObject {
    email: string,
    userinfo: {
        password: string,
        first: string,
        last: string,
        bio: string,
        followers: string[],
        following: string[],
        pfp: string
    }
}

function Test() {
    useEffect(() => {
        
    }, [])

    async function getUser(e: React.FormEvent, email: string) {
        e.preventDefault()
        await fetch('/api/getuser', {
            method: 'POST',
            body: JSON.stringify({ "userEmail": email}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(response => {
            // console.log(response.result)
            return response.result as userObject
        })
    }

    async function signIn(e: React.FormEvent, userEmail: string, userPassword: string) {
        e.preventDefault()
        await fetch('/api/signin', {
            method: 'POST',
            body: JSON.stringify({
                "userEmail": userEmail,
                "userPassword": userPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(response => {
            // console.log(response)
            return response
        })
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

    async function submitFile(e: React.FormEvent, file: HTMLInputElement, isPfp: boolean, email: string, isListing: boolean = false, price: string, location: string) {
        e.preventDefault()
        if (!file.files) return
        if (!isPfp && !isListing) {
            console.error("Must either be pfp or listing!")
            return
        }
        if (isPfp && isListing) {
            console.error("Image cannot be a listing and a profile picture!")
            return
        }
        let formData = new FormData()
        if (isPfp) {
            formData.append('email', email)
        }
        if (isListing) {
            formData.append('listingName', 'true')
            formData.append('price', price)
            formData.append('location', location)
        }
        formData.append('labelimg', file.files[0])
        await fetch('/api/uploadimg', {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
        })
    }

    async function getImg(e: React.FormEvent, fileName: string) {
        e.preventDefault()
        await fetch('/api/getimg', {
            method: 'POST',
            body: JSON.stringify({ "fileName": fileName}),
            headers: {'Content-Type': 'application/json'}}
        ).then(res => res.json()).then(response => {
            // console.log(response)
            return response
        })
    }






}

export default Test;
