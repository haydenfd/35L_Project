import React, {useState} from "react"
import ApiService from "../../service"
import './index.css'

function LoginModal(props:any) {

    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [bio, setBio] = useState("")
    const [number, setNumber] = useState("")
    const [formEmpty, setFormEmpty] = useState(false)
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)
    const [isInvalidPassword, setIsInvalidPassword] = useState(false)

    // THIS IS HIDEOUS
    function updateFirst(event:any) {
        setFirst(event.target.value)
    }

    function updateLast(event:any) {
        setLast(event.target.value)
    }

    function updateUsername(event:any) {
        setUsername(event.target.value)
    }

    function updateEmail(event:any) {
        setEmail(event.target.value)
    }

    function updatePassword(event:any) {
        setPassword(event.target.value)
    }

    function updateConfirm(event:any) {
        setConfirmPassword(event.target.value)
    }

    function updateBio(event:any) {
        setBio(event.target.value)
    }

    function updateNumber(event:any) {
        setNumber(event.target.value)
    }

    function checkIfAllFilled():boolean {
        if (first == "" || last == "" || username == "" || password == "" || confirmPassword == "" || bio == "" || number == "") {
            return false
        }
        return true
    }

    async function attemptSignUp() {
        if (!checkIfAllFilled()) {
            setFormEmpty(true)
            return;
        }
        if (password != confirmPassword) {
            setPasswordsDontMatch(true)
            setFormEmpty(false)
            return
        }
        if (password.length < 6) { 
            setIsInvalidPassword(true)
            setFormEmpty(false)
            return
        }

        setFormEmpty(false)
        setPasswordsDontMatch(false)

        let response:any = await ApiService.addUser(email, password, username, first, last, bio, number)
        if (response!.result == 200) {
            props.isSignupSuccessful(true)
        }
        else {
            props.isSignupSuccessful(false)
        }
        // console.log(response)
    }


    return (
        <div className="formWrapper">
        <form>
            <input onChange={updateFirst} className="input_forms" type="text" id="first" name="first" placeholder="&#xf2bb; &nbsp; First Name" style={{fontFamily: "Montserrat, FontAwesome"}} />
            <input onChange={updateLast} className="input_forms" type="text" id="last" name="last" placeholder="&#xf299; &nbsp; Last Name" style={{fontFamily: "Montserrat, FontAwesome"}} />
            <input onChange={updateUsername} className="input_forms" type="text" id="username" name="username" placeholder="&#xf007; &nbsp; Username" style={{fontFamily: "Montserrat, FontAwesome"}} />
            <input onChange={updateEmail} className="input_forms" type="text" id="username" name="username" placeholder="&#xf064; &nbsp; Email" style={{fontFamily: "Montserrat, FontAwesome"}} />
            <input onChange={updatePassword} className="input_forms" type="password" id="password" name="password" placeholder="&#xf023; &nbsp; Password" style={{fontFamily: "Montserrat, FontAwesome"}} />
            <input onChange={updateConfirm} className="input_forms" type="password" id="confirm" name="confirm" placeholder="&#xf023; &nbsp; Confirm Password" style={{fontFamily: "Montserrat, FontAwesome"}} />
            <input onChange={updateBio} className="input_forms" type="text" id="confirm" name="confirm" placeholder="&#xf035; &nbsp; Bio" style={{fontFamily: "Montserrat, FontAwesome"}} />
            <input onChange={updateNumber} className="input_forms" type="text" id="confirm" name="confirm" placeholder="&#xf095; &nbsp; Phone Number" style={{fontFamily: "Montserrat, FontAwesome"}} />
        </form>
        <div className="div-button-top"></div>
        <button onClick={attemptSignUp} className="submit_signin">Sign Up</button>
            {formEmpty ? <p className="warning">All fields must be filled out!</p> : <span></span>}
            {isInvalidPassword ? <p className="warning">Password length must be min. 6 chars!</p> : <span></span>}
        {passwordsDontMatch ? <p className="warning">Passwords must match!</p> : <span></span>}
        <div className="div-button-bottom"></div>
    </div>
)
}

export default LoginModal;