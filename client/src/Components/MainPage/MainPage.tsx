import React, {useEffect, useState} from "react"
import SubNavbar from "./SubNavbar/SubNavbar";
import MainFeed from './MainFeed/MainFeed';
import ApiService from '../../service'
import Filter from './MainFeed/filter'

function MainPage() {

    const [postsArr, updatePostsArr] = useState<any>()
    const [isDataLoaded, setDataLoaded] = useState(false)
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()


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


    function sortByPrice(min:number, max:number) {
        let sortedByPrice = Filter.sortByPrice(postsArr, min, max)
        console.log(sortedByPrice)
    }

    function sortByBedrooms(num:number) {
        let sortedByBedrooms = Filter.sortByBedrooms(postsArr, num)
        console.log(sortedByBedrooms)
    }

    function sortByBathrooms(num:number) {
        let sortedByBathrooms = Filter.sortByBathrooms(postsArr, num);
        console.log(sortedByBathrooms);
    }

    function sortByAmenities(amenities:any) {
        let sortedByAmenities = Filter.sortByAmenities(postsArr, amenities);
        console.log(sortedByAmenities)
    }

    function sortByFacilities(facilities:any) {
        let sortedByFacilities = Filter.sortByFacilities(postsArr, facilities);
        console.log(sortedByFacilities);
    }


    return (
        <div>
            {isDataLoaded ? 
                <div className="body">
                <SubNavbar sortByPrice={sortByPrice} sortByBedrooms={sortByBedrooms} sortByBathrooms={sortByBathrooms} sortByAmenities={sortByAmenities} sortByFacilities={sortByFacilities} listings={postsArr} min={minPrice} max={maxPrice}/>
                <MainFeed posts={postsArr}/>            
                </div>
                : <div className="body"><img className="defaultPost" src="/loading.gif"></img> </div>
        }
        </div>

    )
}

export default MainPage;