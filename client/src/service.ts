import axios from 'axios'

const ApiService = {

    addUser: async function addUser( email: string, password: string, username: string) {
        // e.preventDefault()
        await fetch('/api/adduser', {
            method: 'POST',
            body: JSON.stringify({
                "userEmail": email,
                "userPassword": password,
                "userName": username
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(response => {
            console.log("response")
            if (response.result) {
                console.log(response.result);
                return false // duplicate username or email
            }
            return true
        })
    },

    addUser_: function addUser_() {
        axios.post(`/api/adduser`, { userEmail: "ryan@ryan.com", userPassword: "password", userName: "ryan" })
        .then(res => {
        console.log("AHHHHH!");
          console.log(res);
          console.log(res.data);
        })  
    },

    signIn: async function signIn( username: string, password:string ) {
        await fetch("/api/signin", {
            method: 'POST',
            body: JSON.stringify({
                "username": username,
                "userPassword": password
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(async res => {
            const token = await res.json();
            if (token.res == 200) {
                console.log("Sign in successfuly!");
                localStorage.setItem("token", token.token);
                localStorage.setItem("username", username);
                return token.res;
            }
            else {
                console.log("Sign in failed!");
            }
            console.log(token);
        })
    },

    validate: async function validate() {
        // headers complains if a key can be null
        var string_storage:string;
        var storage:any = localStorage.getItem('token');
        if (storage == null) {
            string_storage = ''
        }
        else {
            string_storage = storage
        }
        await fetch("/api/testValidation", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': string_storage
            }
        }).then(res => {
            console.log(res);
            console.log("status: ", res.status)
        })
    },

    fetchUser: async function fetchUser(username:string) {
        var userData;
        await fetch("/api/getuser", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
            }),
        }).then(async res => {
            console.log(res);
            userData = await res.json();
        })
        return userData;
    },

    getPosts: async function getPosts(chunk_id:string) {
        var postData;
        await fetch("/api/getposts", {
            method:'POST',
            body: JSON.stringify({
                'id': chunk_id
            }),
            headers: {
                'Content-Type': 'application/json', 
            },
        }).then(async res => {
            postData = await res.json();
        })
        console.log(postData)
        return postData
    },


    test: function test() {
        console.log('test');
    }
}
export default ApiService;