import { factory } from "typescript"

const Filter = {

    sortByPrice: function sortByPrice(listings:any, min:number, max:number) {
        console.log(":::::sorting by bathrooms:::::")
        return ''
    },

    sortByBedrooms: function sortByBedrooms(listings:any, num:number) {
        console.log(':::::sorting by bathrooms:::::')
        return
    },

    sortByBathrooms: function sortByBathrooms(listings:any, num:number) {
        console.log(":::::sorting by bathrooms:::::")
        return ''
    },

    sortByAmenities: function sortByAmenities(listings:any, amenities:any) {
        console.log(':::::sorting by amenities:::::');
        console.log(amenities)
        return ''
    },

    sortByFacilities: function sortByFacilities(listings:any, facilities:any) {
        console.log(":::::sorting by facilities:::::")
        console.log(facilities)
        return ''
    }

}
export default Filter;