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


    test: function test() {
        console.log('test');
    }
}
export default ApiService;