import React, {useState} from "react"
import { isPropertySignature } from "typescript";
import ApiService from '../../service'
// import './index.css'

function ListingPage(props:any) {

    const [status, setStatus] = useState(isSignedIn());

    function myfunction() {
        ApiService.addUser('john', 'john', 'john');
    }

    async function signin() {
        await ApiService.signIn('ryan_walking12', 'walkthroughthepark');
        if (isSignedIn()) {
            setStatus(true);
        }
    }

    function checkLocal() {
        const token:any = localStorage.getItem('token');
        console.log(token);
    }

    function signOut() {
        localStorage.removeItem('token');
        setStatus(false);
    }

    function isSignedIn() {
        if (localStorage.getItem('token') != null) {
            return true;
        }
        return false;
    }

    async function testValidation() {
        await ApiService.validate();
    }



    return (
        <div className="body">
            {/* <p onClick={myfunction}>BUZZFEED</p> */}
            <button onClick={signin}>Sign In</button>
            <button onClick={checkLocal}>Check Storage</button>
            <button onClick={signOut}>Sign Out</button>
            {isSignedIn() ? <p>You are signed in</p> : <p>You are signed out</p>}
            <button onClick={testValidation}>TEST VALIDATION</button>
            <p>above should only respond with status 200 in the console if the user is signed in</p>
        </div>
    )
}

export default ListingPage;