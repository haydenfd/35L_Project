import React from "react"
import Post from './Post'
import TimelinePost from '../../../Models/TimelinePost'
// import SubNavbar from "./SubNavbar/SubNavbar";

function MainPage() {

    let dummydata: Array<TimelinePost> = [
        {
            address: "42 Washington Way",
            price: 3500,
            pic: "DummyPosts/post1.jpeg",
            proximity_to_campus: 4,
            year: "Spring 2022"
        },
        {
            address: "1 Adams Circle",
            price: 7500,
            pic: "DummyPosts/post2.jpeg",
            proximity_to_campus: 1,
            year: "Fall 2023"
        },
        {
            address: "8 Jefferson Court",
            price: 8200,
            pic: "DummyPosts/post3.jpeg",
            proximity_to_campus: 6,
            year: "Fall 2022"
        },
        {
            address: "623 Madison Court",
            price: 7250,
            pic: "DummyPosts/post4.jpeg",
            proximity_to_campus: 3,
            year: "Winter 2023"
        },

        {
            address: "4 Monroe Avenue",
            price: 9050,
            pic: "DummyPosts/post5.jpeg",
            proximity_to_campus: 3,
            year: "Spring 2023"
        },

        {
            address: "2 Adams Circle",
            price: 10500,
            pic: "DummyPosts/post6.jpeg",
            proximity_to_campus: 1,
            year: "Fall 2022"
        },

        {
            address: "1 Old Hickory Way",
            price: 12500,
            pic: "DummyPosts/post7.jpeg",
            proximity_to_campus: 2,
            year: "Spring 2022"
        },

        {
            address: "14 Kinderhook Drive",
            price: 8500,
            pic: "DummyPosts/post8.jpeg",
            proximity_to_campus: 5,
            year: "Winter 2023"
        },

        {
            address: "3 Tippecanoe Circle",
            price: 5200,
            pic: "DummyPosts/post9.jpeg",
            proximity_to_campus: 8,
            year: "Spring 2023"
        },

        {
            address: "11 Tyler Street",
            price: 4350,
            pic: "DummyPosts/post10.jpeg",
            proximity_to_campus: 3,
            year: "Spring 2022"
        },

        {
            address: "27 Polk Avenue",
            price: 5750,
            pic: "DummyPosts/post11.jpeg",
            proximity_to_campus: 2,
            year: "Fall 2022"
        },

        {
            address: "14 Taylor Way",
            price: 7700,
            pic: "DummyPosts/post12.jpeg",
            proximity_to_campus: 7,
            year: "Fall 2023"
        }
    ]

    const dummyEntries = dummydata.map((key) => {
        return (
            <span style={{marginLeft:'3%', marginTop:'1.5%'}}>
                <Post {...key}/>
            </span>
        )
    })


    return (
        <div className="wrapperdiv">
            <div className="flex-pos">
                {dummyEntries}
            </div>
        </div>
    )
}

export default MainPage;