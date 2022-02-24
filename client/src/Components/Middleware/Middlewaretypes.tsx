export interface userObject {
    email: string,
    username: string,
    userinfo: {
        password: string,
        first: string,
        last: string,
        bio: string,
        followers: string[],
        following: string[],
        pfp: string,
        phoneNumber: string,
        favoritePosts: string[],
    }
}

export interface postObject {
    uniqueID: Number,  
    price: Number, 
    distance: Number, // distance from campus, in miles
    address: String,
    rentByDate: String, // (fall 2022, winter 2023, etc)
    seller: String,
    favorites: String[],
    bathrooms: Number,
    bedrooms: Number,
    amenities: String,
    facilities: String,
    images: String[]
}