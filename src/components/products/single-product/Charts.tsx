import Image from 'next/image'
import { INoteInProduct, IProduct } from '@/types/product.type'


export default function Charts({ product }: { product: IProduct }) {
    return (
        <div className='mt-5'>

            {/* notes and images */}
            <div className='flex flex-col gap-5'>
                <NotesAndImages noteObjects={product.initialNoteObjects} title='نوت های ابتدایی' />
                <NotesAndImages noteObjects={product.midNoteObjects} title='نوت های میانه' />
                <NotesAndImages noteObjects={product.baseNoteObjects} title='نوت های پایه' />
            </div>

            {/* accord */}
            <div className='mt-5'>
                <h2>ترتیب و ماندگاری نوت ها</h2>

                <div className='flex flex-col gap-5'>
                    <Accord noteObjects={[...product.initialNoteObjects, ...product.
                        midNoteObjects, ...product.baseNoteObjects]} />
                </div>
            </div>
        </div>
    )
}

interface INotesAndImagesProps {
    noteObjects: INoteInProduct[];
    title: string;
}

const NotesAndImages = ({ noteObjects, title }: INotesAndImagesProps) => (
    <div>
        <div className='mb-3'>{title}</div>

        <div className='flex flex-wrap gap-8 mt-2'>
            {
                noteObjects.map(noteObj => (
                    <div key={noteObj.noteId._id + noteObj.cent} className='flex justify-center items-center gap-2'>
                        <div className='w-[50px] rounded-full overflow-hidden'>
                            <Image width={50} height={50} alt={noteObj.noteId.name} src={noteObj.noteId.imageKey} className='w-full aspect-square object-cover' />
                        </div>
                        {noteObj.noteId.name}
                    </div>
                ))
            }
        </div>
    </div>
)


const Accord = ({ noteObjects }: Omit<INotesAndImagesProps, 'title'>) => (
    <div className='flex-col mt-2 border-r-2 pr-2 border-success'>
        {
            noteObjects.map(noteObj => (
                <div key={noteObj.noteId._id + Math.random()} className='w-full'>
                    <div
                        className='bg-primary rounded-sm mt-1 p-1'
                        style={{ width: `${noteObj.cent}%` }}
                    >
                        {noteObj.noteId.name}
                    </div>
                </div>
            ))
        }
    </div>
)
