
const Filter = {

    sortByPrice: function sortByPrice(listings:any, min:number, max:number) {
        var newarr = []
        console.log(`the min price is ${min}`)
        console.log(`the max price is ${max}`)
        console.log(listings)
        console.log(listings.length)
        for (let i = 0; i < listings.length; i++) {
            let price = parseInt(listings[i].price)
            console.log(price)
            if ((price >= min) && (price <= max)) {
                newarr.push(listings[i])
            }
        }
        console.log(newarr)
        return newarr
     },

    sortByBedrooms: function sortByBedrooms(listings:any, num:number) {
        var newarr = [];
        for (let i = 0; i < listings.length; i++) {
            let bedrooms = (listings[i].bedrooms)
            if (bedrooms >= num) {
                newarr.push(listings[i])
            }
        }
        console.log(newarr)
        return newarr 
    },

    sortByBathrooms: function sortByBathrooms(listings:any, num:number) {
        var newarr = [];
        for (let i = 0; i < listings.length; i++) {
            let bathrooms = (listings[i].bathrooms)
            if (bathrooms >= num) {
                newarr.push(listings[i])
            }
        }
        console.log(newarr)
        return newarr 
    },

    sortByAmenities: function sortByAmenities(listings:any, amenities:any) {
        var newarr = [];
        if (amenities.length === 0) {
            return listings
        }
        for (let i = 0; i < listings.length; i++) {
            for (let j = 0; j < amenities.length; j++) {
                if (listings[i].amenities.includes(amenities[j])) {
                    if (j === (amenities.length - 1)) {
                        newarr.push(listings[i])
                    }
                    else continue
                }
                else break
            }
        }
        return newarr
    },

    sortByFacilities: function sortByFacilities(listings:any, facilities:any) {

        var newarr = [];
        if (facilities.length === 0) {
            return listings
        }
        for (let i = 0; i < listings.length; i++) {
            for (let j = 0; j < facilities.length; j++) {
                if (listings[i].facilities.includes(facilities[j])) {
                    if (j === (facilities.length - 1)) {
                        newarr.push(listings[i])
                    }
                    else continue
                }
                else break
            }
        }
        return newarr
    }

}
export default Filter;