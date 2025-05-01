import { categoriesObject, flavorsObject, gendersObject } from "./utils"


const getFullFlavors = (sex: string) => Object.values(flavorsObject).map(flavor => ({
    title: 'عطر ' + sex + ' ' + flavor,
    url: '#'
}))

const getFullCategories = () => Object.values(categoriesObject).map(category => ({
    title: 'عطر ' + category,
    url: '#'
}))


export const sidebarData = [
    ...Object.values(gendersObject).map(gender => ({
        title: gender,
        url: "#",
        items: getFullFlavors(gender)
    })),
    {
        title: "مناسبتی",
        url: "#",
        items: getFullCategories()
    }
]