import React from "react"
import SubNavbar from "./SubNavbar/SubNavbar";
import MainFeed from './MainFeed/MainFeed';

function MainPage() {

    return (
        <div className="body">
            <SubNavbar />
            <MainFeed />
        </div>
    )
}

export default MainPage;