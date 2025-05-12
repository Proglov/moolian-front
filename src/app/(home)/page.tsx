import { Carousel } from "@/components/home/Carousel";
import Hero from "@/components/home/Hero";


export default async function Home() {
  return (
    <div>
      <Hero />
      <div className='flex justify-center'>
        <Carousel />
      </div>
    </div>
  )
}