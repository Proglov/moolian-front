import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import ProductsCarousel from "@/components/home/ProductsCarousel";


export default async function Home() {
  return (
    <div>
      <Hero />
      <Gallery />
      <ProductsCarousel />
    </div>
  )
}