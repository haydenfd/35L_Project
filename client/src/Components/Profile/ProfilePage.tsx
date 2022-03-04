import React, {useEffect, useState} from "react"
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import { useParams } from "react-router";
import ApiService from '../../service'
import swal from 'sweetalert';
import './index.css'
import ProfileInfo from '../../Models/ProfileInfo'
import { useNavigate } from "react-router-dom";
import getPosts from '../../service'
import Facilities from "../MainPage/SubNavbar/Facilities";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import { userInfo } from "os";
 
 
function ProfilePage(props:any) {
 
   const navigate = useNavigate(); 
 
   let query = useQuery()
   let { username } = useParams();
   var emptyInterface = new ProfileInfo();
   const [userData, setUserData] = useState(emptyInterface);
   const [postImages, setPostImages] = useState([])
   const [isComponentMounted, setComponentMount] = useState(false);
   var dataStream:any;
   var image_:string = ''
 
 
   useEffect(() => {
       console.log("AHHHH")
       const userData_ = async () => {
           console.log("username:::",username)
           let data = await ApiService.fetchUser(username!);
           if (data == undefined) {
               console.log("call failed")
           }
           else {
               dataStream = data['result']
               setUserData(data['result']);
           }
 
           console.log(dataStream.userinfo.favoritedPosts)
 
           let postsArr = []
           let postsBase64:any = []
           for (let i = 0; i < dataStream.userinfo.favoritedPosts.length; i++) {
               postsArr.push(dataStream.userinfo.favoritedPosts[i])
           }
           for (let i = 0; i < dataStream.userinfo.favoritedPosts.length; i++) {
               console.log("ROOOOOO")
               let image = await ApiService.getPosts(postsArr[i])
               postsBase64.push(image)
           }
           let images = await ApiService.getPosts(postsArr[0]);
           setPostImages(postsBase64)
           console.log(images)
           if (images == undefined) {
               console.log("call failed")
           }
           else {
               console.log("call succeeded")
 
               let favs = userData;
               favs.userinfo.favoritedPosts.push(images);
 
               setUserData(userData => ({...userData, userinfo: {
                   ...userData.userinfo,
                   favoritedPosts: favs.userinfo.favoritedPosts
               }}))
               image_ = "data:image/jpeg;base64," + userData.userinfo.favoritedPosts[0].result.base64
               setComponentMount(true);
           }
       }
       userData_();
   }, []);
 
 
 
   function useQuery() {
       return new URLSearchParams(useLocation().search);
     }
 
  
  
 
   function redirectToPage(index:number) {
       var listing_id = postImages[index]['result']['file']
       navigate('/listing/' + listing_id)
       console.log(index)
       console.log(postImages[index]['result']['file'])
   }
 
   function checkProf() {
       let profile_pic = userData.userinfo.pfp
       if (profile_pic != '') {
           return profile_pic
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
 
   function whoseProfile() {
       if (localStorage.getItem('username') == username) {
           return (<span></span>)
       }
 
       if (localStorage.getItem('username')) {
           if (userData.userinfo.followers.includes(localStorage.getItem('username')!)) {
               return (<button className="followButton" style={{marginTop:'75px', backgroundColor:'#62ec88'}}>Following</button>)
           }
           else {
               return (<button className="followButton" style={{marginTop:'75px'}}>Follow</button>)
           }
       }
 
       else {
           return (<button className="followButton" style={{marginTop:'75px'}}>Follow</button>)
       }
   }
 
   function contactDisplay() {
       if (localStorage.getItem('username') == username) {
           return (<span></span>)
       }
 
       else {
           return (<button onClick={throwaway_catch_me} className="followButton" style={{marginTop:'75px', backgroundColor:'#606060'}}>Contact</button>
           )
       }
   }
 
    
   const posts = postImages.map((key:number) => {
       return (
           <span style={{marginLeft:'3%', marginTop:'1.5%'}}>
               <p>kkey</p>
           </span>
       )
   })
 
   return (
   <div className="body">
 
       {isComponentMounted ?
       <div>
       <div style={{paddingTop:'50px'}}></div>
       <div className="info">
       <span className="photo">
           <img className="prof_pic" src={checkProf()}></img>
       </span>
       <span className="text_info">
           <h1 className="username">{userData.userinfo.first} {userData.userinfo.last}</h1>
           <div style={{marginTop:'35px'}}></div>
           <p className="profile_statistics" style={{fontFamily: "Arial, FontAwesome", color:'#A9A9A9'}}>&#xf007; <span style={{paddingRight:'5px'}}></span>{userData.userinfo.followers.length} Followers <span style={{paddingRight:'35px'}}></span> &#xf004;<span style={{paddingRight:'7px'}}></span>{postImages.length} Favorites</p>
 
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
       <div className="flex-pos">
 
       {Object.keys(postImages).map((key:any) => {
       return (
           <span style={{marginLeft:'3%', marginTop:'1.5%'}}>
               <img onClick={() => {redirectToPage(key)}} className="displayimg" src={`data:image/jpg;base64,${postImages[key]['result']['base64']}`}></img>                       
           </span>
       )
   })}
 
       </div>
   </div>
 
   : <span>
       <img className="defaultPost" src="/empty.png"></img>
       <p>No Favorited Posts Yet!</p>
       </span>
   }
            
       </div> : <img className="defaultPost" src="/loading.gif"></img>
 
       } 
       </div>
   )
}
 
export default ProfilePage;
 

