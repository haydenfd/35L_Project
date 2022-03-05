import React, { useEffect } from "react"
import { useParams } from "react-router";

function ListingPage(props:any) {

    let { id } = useParams();

    useEffect(() => {

    })

    return (
        <div className="body">
            <p>page for listing {id}</p>
        </div>
    )
}

export default ListingPage;