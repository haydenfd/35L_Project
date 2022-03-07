// posts parameter is an array of every post's searchable attributes


// each element will be in the following format:
// {
//     address:string,
//     price:string (no idea why it's a string)
//     distance: num,
//     rentByDate: string (eg Fall 2022)
//     bathrooms: int,
//     bedrooms: int
//     amenities: arr of strings
//     facilities: arr of strings
// }


// filters will be an object in this format: {
    // min_price:string,
    // max_price:string,
    // bathrooms: num,
    // bedrooms: num,
    // amenities: arr of strings,
    // facilities: arr of strings
// }


// should return a new array of posts which meet the filter criteria



export default function filter(posts:any, filters:any) {

}