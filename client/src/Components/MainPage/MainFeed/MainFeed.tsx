import React, {useEffect, useState} from "react"
import Post from './Post'
import TimelinePost from '../../../Models/TimelinePost'
import { useNavigate } from "react-router-dom";
import Upload from '../../ListingPage/Upload'
import swal from "sweetalert";


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

    // funny...strict equality comparison defaults to showing form
    function setUpload() {
        // if (localStorage.getItem('username') === undefined) {
        if (!localStorage.getItem('username')) {
            swal("Failure", "Must be signed in to upload a listing!", "error")
            return
        }
        if (!updatingFile) {
            setUpdatingFile(true)
        }
    }

    function finishedUploading() {
        setUpdatingFile(false)
    }


    return (
        <div className="wrapperdiv">
            {updatingFile ? <div className="upload-form-wrapper">
                <Upload finishedUploading={finishedUploading}/>
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

            <button onClick={setUpload} className="upload_listing"><span style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf093;</span></button>
        </div>
    )
}

export default MainPage;