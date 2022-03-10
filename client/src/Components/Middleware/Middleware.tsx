// TO BE USED FOR TESTING CLIENT-SERVER CONNECTIONS, WILL BE REFINED ELSEWHERE

import React from 'react';
import { userObject, postObject } from './Middlewaretypes';
// import './index.css';

const Middleware = {

    // this function WILL NOT WORK with PASSWORDS OR EMAILS: I will make a separate one if necessary
    updateUser: async function updateUser(e: React.FormEvent, newUserData: userObject) {
        e.preventDefault()
        return await fetch('/api/updateuser', {
            method: 'POST',
            body: JSON.stringify({ "updatedUser": newUserData }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(response => {
            return response
        })
    },

    getUser: async function getUser(e: React.FormEvent, email: string) {
        e.preventDefault()
        return await fetch('/api/getuser', {
            method: 'POST',
            body: JSON.stringify({ "userEmail": email}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(response => {
            // console.log(response.result)
            return response.result as userObject
        })
    },

    // needs username OR email to log in; doesn't need both
    signIn: async function signIn(e: React.FormEvent, userEmail: string = '', username: string = '', userPassword: string) {
        e.preventDefault()
        return await fetch('/api/signin', {
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
    },

    submitTest: async function submitTest(e: React.FormEvent) {
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
        return await fetch('/api/test', postData)
    },

    submitFile: async function submitFile(file: HTMLInputElement, isPfp: boolean, email: string, isListing: boolean = false, price: string, location: string, username:string, prevPic:string) {
        // e.preventDefault()
        if (!file.files) {
            return
        }
        if (!isPfp && !isListing) {
            console.error("Must either be pfp or listing!")
            return
        }
        if (isPfp && isListing) {
            console.log("HOW?")
            console.error("Image cannot be a listing and a profile picture!")
            return
        }
        let formData = new FormData()
        if (isPfp) {
            formData.append('email', email)
            formData.append('username', username)
            formData.append('prevPic', prevPic)
        }
        if (isListing) {
            formData.append('listingName', 'true')
            formData.append('price', price)
            formData.append('location', location)
        }
        formData.append('labelimg', file.files[0])
        return await fetch('/api/uploadimg', {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
        }).then(res => {
            console.log("finishing upload")
            return res.json()
        })
    },

    getImg: async function getImg(e: React.FormEvent | null, fileName: string) {
        if (e) {
            e.preventDefault()
        }
        return await fetch('/api/getimg', {
            method: 'POST',
            body: JSON.stringify({ "fileName": fileName}),
            headers: {'Content-Type': 'application/json'}}
        ).then(res => res.json()).then(response => {
            // console.log(response)
            return response
        }).catch(err => console.log(err))
    },

    addUser: async function addUser( email: string, password: string, username: string) {
        // e.preventDefault()
        return await fetch('/api/adduser', {
            method: 'POST',
            body: JSON.stringify({
                "userEmail": email,
                "userPassword": password,
                "userName": username
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(response => {
            if (response.result) {
                console.log(response.result);
                return false // duplicate username or email
            }
            console.log(response.result)
            return true
        })
    },

    addPost: async function addPost(
        price: Number, bedrooms: Number, bathrooms: Number, amenities: String,
        facilities: String, address: String, rentDate: String
        ) {
        // e.preventDefault()
        return await fetch('/api/addpost', {
            method: 'POST',
            body: JSON.stringify({
                "price": price,
                "bedrooms": bedrooms,
                "bathrooms": bathrooms,
                "amenities": amenities,
                "facilities": facilities,
                "adress": address,
                "rentDate": rentDate
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(response => {
            if (response.result) {
                // console.log(response.result);
                return false // duplicate username or email
            }
            return true
        })
    },

    follow: async function follow(e: React.FormEvent, follower: string, followee: string) {
        e.preventDefault()
        return await fetch('/api/follow', {
            method: 'POST',
            body: JSON.stringify({
                "follower": follower,
                "followee": followee
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(response => {
            return response
        })
    },

    unfollow: async function unfollow(e: React.FormEvent, follower: string, followee: string) {
        e.preventDefault()
        return await fetch('/api/unfollow', {
            method: 'POST',
            body: JSON.stringify({
                "follower": follower,
                "followee": followee
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(response => {
            return response
        })
    },

    favoritePost: async function favorite(e: React.FormEvent, userEmail: string, postId: string) {
        e.preventDefault()
        return await fetch('/api/favoritepost', {
            method: 'POST',
            body: JSON.stringify({
                "email": userEmail,
                "postId": postId
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(response => {
            return response
        })
    },
    
    unfavoritePost: async function unfavorite(e: React.FormEvent, userEmail: string, postId: string) {
        e.preventDefault()
        return await fetch('/api/unfavoritepost', {
            method: 'POST',
            body: JSON.stringify({
                "email": userEmail,
                "postId": postId
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(response => {
            return response
        })
    },

    getAllPosts: async function getAllPosts(e: React.FocusEvent) {
        e.preventDefault()
        return await fetch('/api/getallposts', {
            method: 'GET',
        }).then(res => res.json()).then(response => {
            return response
        })
    }
}

export default Middleware;
