import React, { useEffect, useState } from "react"
import { useParams } from "react-router";
import './index.css'
import ApiService from '../../service'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function ListingPage(props:any) {

    const MySwal = withReactContent(Swal)

    let { id } = useParams();
    const [post, setPost] = useState<any>()
    const [isDataLoaded, setDataLoaded] = useState(false)
    const [amenities, setAmenities] = useState<any>()
    const [isRecentlyFavorited, setRecentlyFavorited] = useState(false)
    const [isRecentlyUnfavorited, setRecentlyUnfavorited] = useState(false)

    useEffect(() => {
        const post_ = async () => {
            let img = []
            let offerings = []
            img.push(id)
            let post:any = await ApiService.getSinglePost(id!)
            console.log("PROBLEM!!!")
            console.log(id)
            console.log(post)
            let entries:any = []
            entries.push(post.post[0].images[0])
            let image_data = await ApiService.getAllImages(entries)
            // console.log(post.post[0])
            // return
            post!['post'][0]['image_data'] = image_data!['result'][0]
            
            setPost(post)
            setDataLoaded(true)
            console.log(post)
        }
        post_()
    }, [])


    function displayFollowers() {
        let mememe = `<html><body><a href="//sweetalert2.github.io">links</a></body></html>`
        let return_string = "<html><body>"
        for (let i = 0; i < post.post[0].favorited.length; i++) {
            return_string += `<a href="http://localhost:3000/profile/${post.post[0].favorited[i]}">${post.post[0].favorited[i]}</a><br><br>`
        }
        return_string += `<script> function hello() {console.log("i am the one")} </script></body></html>`
        console.log(mememe)
        fire(return_string)
    }


    function fire(html_string:string) {
        console.log(post.post[0].amenities)
        Swal.fire({
            title: "<i>Followers</i>", 
            html:html_string,  
            confirmButtonText: "Close", 
          });
    }

    function getAmenities(index:number) {
        switch (post.post[0].amenities[index]) {
            case 'appliances': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf0f5;&nbsp;&nbsp;Appliances</p>)
            }
            case 'parking': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf1b9;&nbsp;&nbsp;Parking</p>)
            }
            case 'furnished': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf26c;&nbsp;&nbsp;Furnished</p>)
            }
            case 'balcony': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf1ad;&nbsp;&nbsp;Balcony</p>)
            }
            case 'hardwood': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf24e;&nbsp;&nbsp;Hardwood</p>)
                
            }
            default: {
                return <p></p>
            }
        }
    }

    function getFacilities(index:number) {
        switch (post.post[0].facilities[index]) {
            case 'gym': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf005;&nbsp;&nbsp;Gym</p>)
            }
            case 'courtyard': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf19c;&nbsp;&nbsp;Courtyard</p>)
            }
            case 'spa': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf2cc;&nbsp;&nbsp;Courtyard</p>)
            }
            case 'laundry': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf253;&nbsp;&nbsp;Laundry Room</p>)
            }
            case 'pool': {
                return (<p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf185;&nbsp;&nbsp;Laundry Room</p>)
            }
        }
    }

    function favoriteOrUnfavorite() {
        let username_ = localStorage.getItem('username')
        let postId = post.post[0]._id;

        if (post.post[0].favorited.includes(localStorage.getItem('username')) || isRecentlyFavorited) {
            setRecentlyUnfavorited(true)
            setRecentlyFavorited(false)
            ApiService.unfavoritePost(postId, username_!)
        }
        else {
            setRecentlyFavorited(true)
            setRecentlyUnfavorited(false)
            console.log(postId)
            ApiService.favoritePost(postId, username_!)
        }
    }

    function getFavoriteButtonStyle() {
        const favorited_style = (<button onClick={favoriteOrUnfavorite} className="favoriteButton" style={{backgroundColor:'#e21a1a'}}>Favorited</button>)
        const not_favorited_style = (<button onClick={favoriteOrUnfavorite} className="favoriteButton">Favorite</button>)
        if (isRecentlyFavorited) {
            return favorited_style
        }

        if (isRecentlyUnfavorited) {
            return not_favorited_style
        }

        if (post.post[0].favorited.includes(localStorage.getItem('username'))) {
            return favorited_style
        }
        
        return not_favorited_style

    }

    return (
        <div className="body">
            {isDataLoaded ?
            <div className="listing_wrapper">
                <div style={{ marginTop:'30px' }}> </div>
                <span><p className="listing_address_display">{post!.post[0].address}</p><p className="listing_price_display">${post!.post[0].price} / month</p></span>
                <img className="display_listing_image" src={`data:image/jpg;base64,${post.post[0].image_data.base64}`}></img>
                <div style={{marginTop:'10px'}}></div>
                <span>{getFavoriteButtonStyle()}&nbsp;&nbsp;<button className="favoriteButton" style={{backgroundColor:'#606060'}} onClick={displayFollowers}>View Followers</button></span>
                <div style={{marginTop:'10px'}}></div>
                <div className="info_box"> 
                
                    <div className="info_box_data">
                        <p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf2cd;&nbsp;&nbsp;{post.post[0].bathrooms} Bathrooms</p>
                    </div>
                    <div className="info_box_data">
                        <p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf236;&nbsp;&nbsp;{post.post[0].bedrooms} Bedrooms</p>    
                    </div>
                    <div className="info_box_data">
                        <p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf073;&nbsp;&nbsp;{post.post[0].rentByDate}</p>    
                    </div>
                    <div className="info_box_data"> 
                        <p style={{fontFamily: "Arial, FontAwesome", color:'#383838', fontSize: '22px'}}>&#xf19d;&nbsp;&nbsp;{post.post[0].distance} Miles Away</p>    
                    </div>
                    {Object.keys(post.post[0].amenities).map((key:any) => {
                        return (
                            <div className="info_box_data"> 
                            <p>{getAmenities(key)}</p>
                        </div>
                        )
                    })}
                    {Object.keys(post.post[0].facilities).map((key:any) => {
                        return (
                            <div className="info_box_data">
                                <p>{getFacilities(key)}</p>
                            </div>
                        )
                    })}
                    <div className="info_box_data"> </div>
                    <div className="info_box_data"> </div>
                    <div className="info_box_data"> </div>
                    <div className="info_box_data"> </div>
                </div>
            </div>
            : <img className="defaultPost" src="/loading.gif"></img>}
        </div>
    )
}

export default ListingPage;