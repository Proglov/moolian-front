import { categoriesObject, flavorsObject, gendersObject } from "./utils"


const getFullFlavors = (genderObj: [string, string]) => Object.entries(flavorsObject).map(flavorObj => ({
    title: 'عطر ' + genderObj[1] + ' ' + flavorObj[1],
    url: '/products?gender=' + genderObj[0] + '&flavor=' + flavorObj[0]
}))

const getFullCategories = () => Object.entries(categoriesObject).map(categoryObj => ({
    title: 'عطر ' + categoryObj[1],
    url: '/products?category=' + categoryObj[0]
}))


export const sidebarData = [
    ...Object.entries(gendersObject).map(genderObj => ({
        title: genderObj[1],
        items: getFullFlavors(genderObj)
    })),
    {
        title: "مناسبتی",
        items: getFullCategories()
    }
]