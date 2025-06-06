'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table"
import Spinner from "@/components/shared/Spinner";
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useError from "@/hooks/useError";
import Pagination from "@/components/shared/Pagination";
import { ITransaction } from "@/types/transaction";
import { TransactionTable } from "../../transaction/Transactions";
import { IComment } from "@/types/comment.type";
import { CommentsTable } from "../../comments/Comments";
import { useGetAllCommentsOfAProductQuery } from "@/services/comments";
import { useGetTransactionsOfAProductQuery } from "@/services/transaction";
import { useGetSingleProductQuery } from "@/services/products";
import { ImagesComponent } from "@/components/products/single-product/SingleProduct";
import { categoriesObject, flavorsObject, gendersObject, seasonsObject } from "@/lib/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";


export default function ProductMain({ id }: { id: string }) {
    const { product, isLoading } = useAdminGetAProduct(id)

    if (isLoading) return (
        <div className="w-full flex justify-center">
            <Spinner />
        </div>
    )

    if (!product) return (
        <div className="w-full text-center">
            محصولی یافت نشد
        </div>
    )

    return (
        <div className="mt-2">

            <h2 className="text-center">مشخصات محصول</h2>

            <div className="flex flex-col gap-4 mt-6">

                {/* images */}
                <div className="flex justify-center mt-4">
                    <ImagesComponent product={product} />
                </div>

                <Table>
                    <TableBody>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">نام</TableHead>
                            <TableCell className='pr-5'>{product.nameFA} - {product.nameEN}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">موجود</TableHead>
                            <TableCell className='pr-5'>{product.availability ? 'بله' : 'خیر'}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">قیمت پایه</TableHead>
                            <TableCell className='pr-5'>{product.price.toLocaleString('fa-IR')} تومان</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">جنسیت</TableHead>
                            <TableCell className='pr-5'>{gendersObject[product.gender]}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">برند</TableHead>
                            <TableCell className='pr-5'>{product.brandId.nameFA} - {product.brandId.nameEN}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">کشور مبدا</TableHead>
                            <TableCell className='pr-5'>{product.country || '-'}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">عطار</TableHead>
                            <TableCell className='pr-5'>{product.maker || '-'}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">سال معرفی</TableHead>
                            <TableCell className='pr-5'>{digitsEnToFa((product.year || '-').toString())}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">دسته بندی</TableHead>
                            <TableCell className='pr-5'>{categoriesObject[product.category]}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">جنسیت مصرف کننده</TableHead>
                            <TableCell className='pr-5'>{gendersObject[product.gender]}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">طبع عطر</TableHead>
                            <TableCell className='pr-5'>{new Intl.ListFormat('fa', { style: 'long', type: 'unit' }).format(product.flavor.map(flavor => flavorsObject[flavor]))}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">فصل</TableHead>
                            <TableCell className='pr-5'>{new Intl.ListFormat('fa', { style: 'long', type: 'unit' }).format(product.season.map(season => seasonsObject[season]))}</TableCell>
                        </TableRow>
                        <TableRow className='text-start'>
                            <TableHead className="w-[6rem] border-e">گروه بویایی</TableHead>
                            <TableCell className='pr-5'>{product.olfactory}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <Tabs defaultValue="transactions" className="w-full items-start lg:max-w-6xl lg:p-10 lg:pt-0 mx-auto mt-5" dir="rtl">
                <TabsList>
                    <TabsTrigger value="transactions">تراکنش ها</TabsTrigger>
                    <TabsTrigger value="comments">نظرات</TabsTrigger>
                </TabsList>
                <Card className="w-full">
                    <TabsContent value="transactions">
                        <CardContent>
                            <Transactions id={id} />
                        </CardContent>
                    </TabsContent>

                    <TabsContent value="comments">
                        <CardContent>
                            <Comments id={id} />
                        </CardContent>
                    </TabsContent>
                </Card>
            </Tabs>
        </div>
    )
}

const Transactions = ({ id }: { id: string }) => {
    const queryHook = useGetTransactionsOfAProductQuery;

    return (
        <div className="mt-2">

            <Pagination<ITransaction>
                queryHook={queryHook}
                extraOptions={{ id }}
            >
                {(data: ITransaction[], page, perPage) => <TransactionTable data={data} page={page} perPage={perPage} />}
            </Pagination>

        </div>
    )
}

const Comments = ({ id }: { id: string }) => {
    const queryHook = useGetAllCommentsOfAProductQuery;

    return (
        <div className="mt-2">
            <Pagination<IComment>
                queryHook={queryHook}
                extraOptions={{ _id: id }}
            >
                {(data: IComment[], page, perPage) => <CommentsTable data={data} page={page} perPage={perPage} />}
            </Pagination>
        </div>
    );
}

const useAdminGetAProduct = (id: string) => {
    const { data, isError, isLoading, error } = useGetSingleProductQuery(id)
    useError(error, isError)

    return {
        product: data,
        isLoading
    }
}