import React, {useEffect, useState} from "react"
import Post from './Post'
import TimelinePost from '../../../Models/TimelinePost'
import { useNavigate } from "react-router-dom";


function MainPage(posts:any) {
    const navigate = useNavigate();

    
    useEffect(() => {
        console.log(posts)

    }, [posts])

    
    function lookAtListing(key:number) {
        let postId = posts.posts[key]._id
        navigate('/listing/' + postId)
    }


    return (
        <div className="wrapperdiv">
            <div className="flex-pos">
                {Object.keys(posts.posts).map((key:any) => {
                    return (
                        <span style={{marginLeft:'3%', marginTop:'1.5%'}} onClick={() => lookAtListing(key)}>
                            <Post {...posts.posts[key]}/>
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default MainPage;