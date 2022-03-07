export default class ProfileInfo {
    username:string = '';
    userinfo = {
        password:'',
        first:'',
        last:'',
        bio:'',
        followers:[''],
        following:[''],
        pfp:'',
        phoneNumber:'',
        favoritedPosts:[] as any
    }
}