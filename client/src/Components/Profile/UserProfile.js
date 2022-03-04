
const followUser = () => {
    fetch('/follow', {
        method:"put",
        headers:{
            "Content-Type":"application/json"
            "Authorization":"Beare "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            followID:userID
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
    })
}

// onClick = {() => followUser()}
    
    