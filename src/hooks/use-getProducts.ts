import { useGetAllProductsQuery } from "@/services/products";
import { Category, Flavor, Gender, IProduct, Season } from "@/types/product.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { z } from "zod";
import { useRouter, useSearchParams } from 'next/navigation'
import { isValidCategory, isValidFlavor, isValidGender, isValidSeason } from "@/lib/utils";



export const FormSchema = z.object({
    gender: z.nativeEnum(Gender).optional(),
    category: z.nativeEnum(Category).optional(),
    flavor: z.nativeEnum(Flavor).optional(),
    season: z.nativeEnum(Season).optional(),
})
export type TForm = z.infer<typeof FormSchema>;
const resolver = zodResolver(FormSchema)

export default function useGetProducts() {
    const searchParams = useSearchParams()
    const router = useRouter()
    let categoryParam = searchParams.get('category');
    let flavorParam = searchParams.get('flavor');
    let genderParam = searchParams.get('gender');
    let seasonParam = searchParams.get('season');
    let category: Category | undefined = isValidCategory(categoryParam) ? (categoryParam as Category) : undefined;
    let flavor: Flavor | undefined = isValidFlavor(flavorParam) ? (flavorParam as Flavor) : undefined;
    let gender: Gender | undefined = isValidGender(genderParam) ? (genderParam as Gender) : undefined;
    let season: Season | undefined = isValidSeason(seasonParam) ? (seasonParam as Season) : undefined;
    const defaultValues: TForm = { gender, category, flavor, season }
    const filterKey = JSON.stringify({ category, flavor, gender, season });
    const form = useForm<TForm>({ resolver, defaultValues })
    const limit = 2;
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState<IProduct[]>([])
    const [isFinished, setIsFinished] = useState(false)
    const { ref, inView } = useInView()
    const { data, isSuccess, isFetching } = useGetAllProductsQuery({ onlyAvailable: true, page, limit, category, flavor, gender, season })


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (isSuccess) {
            setProducts(prev => page === 1 ? data.items : [...prev, ...data.items]);
            setIsFinished(data.count <= page * limit);
        }
    }, [data, isSuccess, filterKey, setProducts, setIsFinished]);

    useEffect(() => {
        if (inView && !isFinished && products.length && !isFetching) {
            setPage(prev => prev + 1)
        }
    }, [inView, isFinished, products.length, isFetching, setPage]);


    useEffect(() => {
        setPage(1);
    }, [filterKey, setPage]);


    const submit = async ({ category, flavor, gender, season }: TForm) => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (flavor) params.set('flavor', flavor);
        if (gender) params.set('gender', gender);
        if (season) params.set('season', season);

        const url = `/products?${params.toString()}`;
        router.push(url);
        router.refresh()
    };

    return { products, ref, isFinished, form, submit }
}