import React from "react"
import { isPropertySignature } from "typescript";
import ApiService from '../../service'
// import './index.css'

function ListingPage(props:any) {

    function myfunction() {
        ApiService.addUser('jeff', 'jeffrey', 'jeff');
    }

    return (
        <div className="body">
            <p onClick={myfunction}>BUZZFEED</p>
        </div>
    )
}

export default ListingPage;