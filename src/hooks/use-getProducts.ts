import { useGetAllProductsQuery } from "@/services/products";
import { Category, Flavor, Gender, IProduct, OrderBy, Season } from "@/types/product.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { z } from "zod";
import { useRouter, useSearchParams } from 'next/navigation'
import { isValidCategory, isValidFlavor, isValidGender, isValidOrderBy, isValidSeason } from "@/lib/utils";



export const FilterFormSchema = z.object({
    gender: z.nativeEnum(Gender).optional(),
    category: z.nativeEnum(Category).optional(),
    flavor: z.nativeEnum(Flavor).optional(),
    season: z.nativeEnum(Season).optional(),
})
export type TFilterForm = z.infer<typeof FilterFormSchema>;
const resolverFilter = zodResolver(FilterFormSchema)

export const SortFormSchema = z.object({
    orderBy: z.nativeEnum(OrderBy).optional()
})
export type TSortForm = z.infer<typeof SortFormSchema>;
const resolverSort = zodResolver(SortFormSchema)

export default function useGetProducts() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const categoryParam = searchParams.get('category');
    const flavorParam = searchParams.get('flavor');
    const genderParam = searchParams.get('gender');
    const seasonParam = searchParams.get('season');
    const orderByParam = searchParams.get('orderBy');
    const category: Category | undefined = isValidCategory(categoryParam) ? (categoryParam as Category) : undefined;
    const flavor: Flavor | undefined = isValidFlavor(flavorParam) ? (flavorParam as Flavor) : undefined;
    const gender: Gender | undefined = isValidGender(genderParam) ? (genderParam as Gender) : undefined;
    const season: Season | undefined = isValidSeason(seasonParam) ? (seasonParam as Season) : undefined;
    const orderBy: OrderBy | undefined = isValidOrderBy(orderByParam) ? (orderByParam as OrderBy) : undefined;
    const filterKey = JSON.stringify({ category, flavor, gender, season, orderBy });
    const filterDefaultValues: TFilterForm = { gender, category, flavor, season }
    const filterForm = useForm<TFilterForm>({ resolver: resolverFilter, defaultValues: filterDefaultValues })
    const sortDefaultValues: TSortForm = { orderBy }
    const sortForm = useForm<TSortForm>({ resolver: resolverSort, defaultValues: sortDefaultValues })
    const limit = 20;
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState<IProduct[]>([])
    const [isFinished, setIsFinished] = useState(false)
    const { ref, inView } = useInView()
    const { data, isSuccess, isFetching } = useGetAllProductsQuery({ onlyAvailable: true, page, limit, category, flavor, gender, season, orderBy })


    useEffect(() => {
        if (isSuccess) {
            setProducts(prev => page === 1 ? data.items : [...prev, ...data.items]);
            setIsFinished(data.count <= page * limit);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isSuccess, filterKey, setProducts, setIsFinished]);

    useEffect(() => {
        if (inView && !isFinished && products.length && !isFetching) {
            setPage(prev => prev + 1)
        }
    }, [inView, isFinished, products.length, isFetching, setPage]);


    useEffect(() => {
        setPage(1);
    }, [filterKey, setPage]);


    const filterSubmit = async ({ category, flavor, gender, season }: TFilterForm) => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (flavor) params.set('flavor', flavor);
        if (gender) params.set('gender', gender);
        if (season) params.set('season', season);

        const url = `/products?${params.toString()}`;
        router.push(url);
        router.refresh()
    };

    const sortSubmit = async ({ orderBy }: TSortForm) => {
        const params = new URLSearchParams();
        if (orderBy) params.set('orderBy', orderBy);

        const url = `/products?${params.toString()}`;
        router.push(url);
        router.refresh()
    };

    return { products, ref, isFinished, filterForm, filterSubmit, sortForm, sortSubmit }
}