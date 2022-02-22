// TO BE USED FOR TESTING CLIENT-SERVER CONNECTIONS, WILL BE REFINED ELSEWHERE

import React, { useEffect } from 'react';
import './index.css';

interface userObject {
    email: string,
    username: string,
    userinfo: {
        password: string,
        first: string,
        last: string,
        bio: string,
        followers: string[],
        following: string[],
        pfp: string,
        phoneNumber: string,
        favoritePosts: string[],
    }
}

function Test() {

    useEffect(() => {
        // addUser("hi", "goodbye", "ribru17")
        // console.log("HI");
        
    }, [])

    // this function WILL NOT WORK with PASSWORDS OR EMAILS: I will make a separate one if necessary
    async function updateUser(e: React.FormEvent, newUserData: userObject) {
        e.preventDefault()
        await fetch('/api/updateuser', {
            method: 'POST',
            body: JSON.stringify({ "updatedUser": newUserData }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(response => {
            return response
        })
    }

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

    // needs username OR email to log in; doesn't need both
    async function signIn(e: React.FormEvent, userEmail: string = '', username: string = '', userPassword: string) {
        e.preventDefault()
        await fetch('/api/signin', {
            method: 'POST',
            body: JSON.stringify({
                "userEmail": userEmail,
                "username": username,
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
        }).catch(err => console.log(err))
    }

    async function addUser( email: string, password: string, username: string) {
        // e.preventDefault()
        await fetch('/api/adduser', {
            method: 'POST',
            body: JSON.stringify({
                "userEmail": email,
                "userPassword": password,
                "userName": username
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(response => {
            if (response.result) {
                // console.log(response.result);
                return false // duplicate username or email
            }
            return true
        })
    }

    async function follow(e: React.FormEvent, follower: string, followee: string) {
        e.preventDefault()
        await fetch('/api/follow', {
            method: 'POST',
            body: JSON.stringify({
                "follower": follower,
                "followee": followee
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(response => {
            return response
        })
    }

    async function unfollow(e: React.FormEvent, follower: string, followee: string) {
        e.preventDefault()
        await fetch('/api/unfollow', {
            method: 'POST',
            body: JSON.stringify({
                "follower": follower,
                "followee": followee
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(response => {
            return response
        })
    }
}

export default Test;