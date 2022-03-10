import React, {useEffect, useState} from "react"
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import { useParams } from "react-router";
import ApiService from '../../service'
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import './index.css'
import ProfileInfo from '../../Models/ProfileInfo'
import { useNavigate } from "react-router-dom";
import Middleware from '../Middleware/Middleware'
 
function ProfilePage(props:any) {
 
   const navigate = useNavigate(); 
//  seems redundant
   let query = useQuery()
   let { username } = useParams();
   let emptyInterface = new ProfileInfo();
   const [userData, setUserData] = useState(emptyInterface);
   const [postImages, setPostImages] = useState([])
   const [isComponentMounted, setComponentMount] = useState(false);
   const [isRecentlyFollowed, setRecentlyFollowed] = useState(false)
   const [isRecentlyUnfollowed, setRecentlyUnfollowed] = useState(false);
   const [followers, setFollowers] = useState(0)
//    const [_image_, setImage] = useState({image: "/defaulticon.jpeg"})
   const [_image_, setImage] = useState("/defaulticon.jpeg")
   let dataStream:any;
    let image_: string = ''
    
   useEffect(() => {
       const userData_ = async () => {
           console.log("username:::",username)
           let data = await ApiService.fetchUser(username!);
           if (!data) {
               console.log("call failed")
           }
           else {
               dataStream = data['result']
               setUserData(data['result']);
           }
 
        //    console.log(dataStream.userinfo.favoritedPosts)

           let images_multiple:any;

           let postsArr = []
           let postsBase64:any = []
           for (let i = 0; i < dataStream.userinfo.favoritedPosts.length; i++) {
               postsArr.push(dataStream.userinfo.favoritedPosts[i])
           }
           images_multiple = await ApiService.getProfileImages(postsArr)
           console.log(images_multiple['result'])

           let images = await ApiService.getPosts(postsArr[0]);
           console.log(postsBase64)
           setPostImages(images_multiple['result'])
           console.log(images)
           if (!images) {
               console.log("call failed")
           }
           else {
               console.log("call succeeded")
            //    console.log(dataStream.userinfo.pfp)
            //    console.log(userData)

               //added here
               if (dataStream.userinfo.pfp !== '') {
                //    let prof_pic:any = await ApiService.getProfilePicture(dataStream.userinfo.pfp);
                    let prof_pic:any = await Middleware.getImg(null, dataStream.userinfo.pfp)
                   console.log(prof_pic)
                   let photo = prof_pic.base64Data;
                //    let profel: HTMLImageElement = document.getElementsByClassName('prof_pic')[0] as HTMLImageElement
                //    profel.src = photo
                //    let profile_photo = {image:photo}
                //    setImage(profile_photo);
                // console.log("photo: " + photo)
                   setImage(photo);
               }
 
               let favs = userData;
               console.log(favs)
               favs.userinfo.favoritedPosts.push(images);
 
               setUserData(userData => ({...userData, userinfo: {
                   ...userData.userinfo,
                   favoritedPosts: favs.userinfo.favoritedPosts
               }}))

               //redundant
               // FIX THIS if no favorited images the code throws errors!!!
               image_ = userData.userinfo.favoritedPosts[0].result.base64
               setFollowers(dataStream.userinfo.followers.length);
               setComponentMount(true);
           }

       }
       userData_();
   }, []);
 
   function useQuery() {
       return new URLSearchParams(useLocation().search);
     }

    function followOrUnfollow() {
        if (isRecentlyFollowed) {
            setFollowers(followers-1)
            setRecentlyUnfollowed(true)
            setRecentlyFollowed(false)
            return
        }

        if (isRecentlyUnfollowed) {
            setFollowers(followers+1)
            setRecentlyFollowed(true)
            setRecentlyUnfollowed(false)
            return
        }
        if (!localStorage.getItem('username')) {
            swal("Not Signed In!")
            return
        }
        if (userData.userinfo.followers.includes(localStorage.getItem('username')!)) {
            console.log("REMOVE!")
            ApiService.unfollow(localStorage.getItem('username')!, username!);
            setRecentlyFollowed(false)
            setRecentlyUnfollowed(true)
            setFollowers(followers - 1)
        }
        else {
            // follow
            ApiService.follow(localStorage.getItem('username')!, username!);
            setRecentlyFollowed(true);
            setRecentlyUnfollowed(false)
            setFollowers(followers + 1)
        }
    }
 
 
   function redirectToPage(index:number) {
       let listing_id = postImages[index]['result']['postId']
       navigate('/listing/' + listing_id)
       console.log(index)
       console.log(postImages[index]['result']['file'])
   }
 
    //redundant, also added ==
   function checkProf() {
    //    return _image_.image;
       let profile_pic = userData.userinfo.pfp
       if (profile_pic !== '') {
           return '/defaulticon.jpeg'
        // return profile_pic
        //    return profile_pic
       }
       return '/defaulticon.jpeg'
   }
 
   function throwaway_catch_me() {
       console.log(userData.userinfo.following)
       if (userData.userinfo.following.includes(localStorage.getItem('username')!)) {
           swal(`${username}'s Contact Info:`, `Phone Number: ${userData.userinfo.phoneNumber}`);
       }
       else {
           swal("Oh No!", `${username} doesn't follow you (yet)!`, "error");
       }
   }

   function triggerHiddenFileUpload() {
    document.getElementById('file-input')?.click()
   }

   function isSubmitDisplayed() {
    console.log("SUBMIT!")
   }

   function viewFollowers() {
        let return_string = "<html><body>"
        for (let i = 0; i < userData.userinfo.followers.length; i++) {
            return_string += `<a href="http://localhost:3000/profile/${userData.userinfo.followers[i]}">${userData.userinfo.followers[i]}</a><br><br>`
        }
        return_string += `</body></html>`
        fire(return_string)
   }

   function fire(html_string:string) {
    Swal.fire({
        title: "<i>Followers</i>", 
        html:html_string,  
        confirmButtonText: "Close", 
      });
   }
  
   function whoseProfile() {
       if (localStorage.getItem('username') === username) {
           return (<span>  <form style={{marginTop:'150px'}} onSubmit={updateProfilePicture}>
         <input onChange={isSubmitDisplayed} onClick={triggerHiddenFileUpload} className="followButton" type="button" value="Upload a JPEG Profile Picture"></input>&nbsp;&nbsp;<input className="followButton" style={{backgroundColor:'#0c8f21'}} type='submit' name="submit" placeholder='Submit After Uploading' value='Submit After Uploading' />
         <input id="file-input" name="file-input" type="file" />
            </form></span>
 )
       }
 
       if (localStorage.getItem('username')) {

            if (isRecentlyUnfollowed) {
                return (<button onClick={followOrUnfollow} className="followButton" style={{marginTop:'75px'}}>Follow</button>)
            }

           if (userData.userinfo.followers.includes(localStorage.getItem('username')!) || isRecentlyFollowed) {
               return (<button onClick={followOrUnfollow} className="followButton" style={{marginTop:'75px', backgroundColor:'#62ec88'}}>Following</button>)
           }
           else {
               return (<button onClick={followOrUnfollow} className="followButton" style={{marginTop:'75px'}}>Follow</button>)
           }
       }
 
       else {
           return (<button className="followButton" style={{marginTop:'75px'}}>Follow</button>)
       }
   }

    //added username
   function contactDisplay() {
       if (localStorage.getItem('username') === username) {
           return (<span></span>)
       }
       else {
           return (<button onClick={throwaway_catch_me} className="followButton" style={{marginTop:'75px', backgroundColor:'#606060'}}>Contact</button>
           )
       }
   }

   async function updateProfilePicture(event:any) {
       event.preventDefault();
       const file_uploaded = document.getElementById('file-input') as HTMLInputElement;
       console.log(document.getElementById('file-input'));
    //    if (_image_.image != '/default.png') {

    //    }
       let upload = await Middleware.submitFile(file_uploaded, true, 'empty', false, '', '', username!, "THROWAWAY");
       console.log(upload)
       //added extra sign
       if (upload.result === 200) {
           swal("Successfully Changed Profile Picture!", "Reload the page to see the changes", "success")
       }
       else {
           swal("Uploaded Failed", "", "error")
       }
       return '';
   }
     
   return (
   <div className="body">
 
       {isComponentMounted ?
       <div>
       <div style={{paddingTop:'50px'}}></div>
       <div className="info">
        <div className="photo-holder"> 
       <span className="photo">
           <img className="prof_pic" src={_image_} alt="profile pic"></img>
        </span>
        </div>
                           
       <span className="text_info">
           <h1 className="username">{userData.userinfo.first} {userData.userinfo.last}</h1>
           <div style={{marginTop:'35px'}}></div>
       <p className="profile_statistics" style={{fontFamily: "Montserrat, FontAwesome", color:'#A9A9A9'}}>&#xf007; <span style={{paddingRight:'5px'}}></span><span style={{cursor:'pointer'}} onClick={viewFollowers}>{followers} Followers</span> <span style={{paddingRight:'35px'}}></span> &#xf004;<span style={{paddingRight:'7px'}}></span>{postImages.length} Favorites</p>
 
           <div style={{marginTop:'75px'}}></div>
           <div className="biowrap">
           <p style={{paddingRight:'20%', marginLeft:'-7px', textAlign:'left'}}>{userData.userinfo.bio}</p>
           </div>
           <div></div>
           <span> {whoseProfile()} &nbsp;&nbsp;
               {contactDisplay()}
           </span>
 
       </span>
       </div>
 
       <div style={{marginTop:'250px'}}></div>
 
       <div> </div>
       {postImages.length > 0 ?
      
  
       <div className="wrapperdiv">
       <div className="flex-pos_">
 
       {Object.keys(postImages).map((key:any) => {
       return (
           <span style={{marginLeft:'3%', marginTop:'1.5%'}}>
               <img onClick={() => {redirectToPage(key)}} className="displayimg" alt = "display" src={`${postImages[key]['result']['base64']}`}></img>                       
           </span>
       )
   })}
       </div>
   </div>
   : <span>
       <img className="defaultPost" src="/empty.png" alt="default"></img>
       <p>No Favorited Posts Yet!</p>
       </span>
   }
            
       </div> : <img className="defaultPost" src="/loading.gif" alt="loading"></img>
       } 
       </div>
   )
}
 
export default ProfilePage;