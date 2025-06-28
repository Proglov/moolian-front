import { IProduct } from '@/types/product.type'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table"
import { categoriesObject, flavorsObject, gendersObject, seasonsObject } from '@/lib/utils'
import { digitsEnToFa } from '@persian-tools/persian-tools'


export default function Details({ product }: { product: IProduct }) {
    return (
        <div>
            <div className='text-justify'>
                توضیحات:

                <div dangerouslySetInnerHTML={{ __html: product.desc }} />
            </div>

            <div className='mt-3'>
                مشخصات:
                <Table>
                    <TableBody>

                        {
                            product.country &&
                            <TableRow className='text-start'>
                                <TableHead className="w-[6rem] border-e">کشور مبدا</TableHead>
                                <TableCell className='pr-5'>{product.country}</TableCell>
                            </TableRow>
                        }

                        {
                            product.maker &&
                            <TableRow className='text-start'>
                                <TableHead className="w-[6rem] border-e">عطار</TableHead>
                                <TableCell className='pr-5'>{product.maker}</TableCell>
                            </TableRow>
                        }

                        {
                            product.year &&
                            <TableRow className='text-start'>
                                <TableHead className="w-[6rem] border-e">سال معرفی</TableHead>
                                <TableCell className='pr-5'>{digitsEnToFa(product.year.toString())}</TableCell>
                            </TableRow>
                        }

                        {
                            product.category &&
                            <TableRow className='text-start'>
                                <TableHead className="w-[6rem] border-e">دسته بندی</TableHead>
                                <TableCell className='pr-5'>{categoriesObject[product.category]}</TableCell>
                            </TableRow>
                        }

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
        </div>
    )
}
