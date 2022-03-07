import React, {useEffect, useState} from "react"
import Post from './Post'
import TimelinePost from '../../../Models/TimelinePost'
import { useNavigate } from "react-router-dom";
import Upload from '../../ListingPage/Upload'


function MainPage(posts:any) {
    const navigate = useNavigate();
    const [updatingFile, setUpdatingFile] = useState(false)

    
    useEffect(() => {
        console.log(posts)

    }, [posts])

    
    function lookAtListing(key:number) {
        let postId = posts.posts[key]._id
        navigate('/listing/' + postId)
    }

    function setUpload() {
        if (!updatingFile) {
            setUpdatingFile(true)
        }
    }


    return (
        <div className="wrapperdiv">
            {updatingFile ? <div className="upload-form-wrapper">
                <p >this is one of the all time great moments in Celtics history</p>
                <Upload />
            </div> : <span></span>}
            <div className="flex-pos">
                {Object.keys(posts.posts).map((key:any) => {
                    return (
                        <span style={{marginLeft:'3%', marginTop:'1.5%'}} onClick={() => lookAtListing(key)}>
                            <Post {...posts.posts[key]}/>
                        </span>
                    )
                })}
            </div>
            {/* <p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf0f5;&nbsp;&nbsp;Appliances</p> */}
            <button onClick={setUpload} className="upload_listing"><span style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf0f5;</span></button>
        </div>
    )
}

export default MainPage;