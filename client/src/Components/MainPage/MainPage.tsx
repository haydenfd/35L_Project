import React, {useEffect, useState} from "react"
import SubNavbar from "./SubNavbar/SubNavbar";
import MainFeed from './MainFeed/MainFeed';
import ApiService from '../../service'

function MainPage() {

    const [postsArr, updatePostsArr] = useState<any>()
    const [isDataLoaded, setDataLoaded] = useState(false)


    useEffect(() => {
        const posts = async () => {
            let post_res:any = await ApiService.getAllPosts()
            let entries:any = []
            for (let i = 0; i < post_res!['posts']['length']; i++) {
                entries.push(post_res!['posts'][i]['images'][0])
            }
            let image_data = await ApiService.getAllImages(entries)
            console.log(image_data)
            for (let j = 0; j < post_res!['posts']['length']; j++) {
                post_res!['posts'][j]['image_data'] = image_data!['result'][j]
            }
            updatePostsArr(post_res!['posts'])
            setDataLoaded(true)
        }
        posts()
    }, [])


    // TO BE USED TO UPDATE STATE CLIENT-SIDE WHEN FILTERED
    function filter() {
        let newArr:any = postsArr!.slice();
        console.log(newArr)
        updatePostsArr(newArr);
        console.log(newArr)
    }



    return (
        <div>
            {isDataLoaded ? 
                <div className="body">
                <SubNavbar />
                <MainFeed posts={postsArr}/>            
                </div>
                : <div className="body"><img className="defaultPost" src="/loading.gif"></img> </div>
        }
        </div>

    )
}

export default MainPage;