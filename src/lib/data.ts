
const flavors = [
    "گرم",
    "سرد",
    "تند",
    "تلخ",
    "شیرین",
    "ملایم"
]

const categories = [
    "ورزشی",
    "مدیریتی",
    "مناسب هدیه",
    "مهمانی و مجلسی",
]

const getFullFlavors = (sex: string) => flavors.map(flavor => ({
    title: 'عطر ' + sex + ' ' + flavor,
    url: '#'
}))

const getFullCategories = () => categories.map(category => ({
    title: 'عطر ' + category,
    url: '#'
}))

export const sidebarData = [
    {
        title: "مردانه",
        url: "#",
        items: getFullFlavors("مردانه")
    },
    {
        title: "زنانه",
        url: "#",
        items: getFullFlavors("زنانه")
    },
    {
        title: "یونیسکس",
        url: "#",
        items: getFullFlavors("یونیسکس")
    },
    {
        title: "مناسبتی",
        url: "#",
        items: getFullCategories()
    }
]