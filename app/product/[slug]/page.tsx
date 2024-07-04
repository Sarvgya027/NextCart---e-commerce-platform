import AddToCart from "@/app/components/AddToCart";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity"
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";


async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
  _id,
    name,
    images,
    price,
    description,
    "slug": slug.current,
    "category": category->name,
    "price_id": price_id
    
}`

  const data = await client.fetch(query)

  // console.log(data.price_id);
  


  return data;
}

export const dynamic = "force-dynamic"

export default async function ProductPage({ params }: any) {
  const data: fullProduct = await getData(params.slug)
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-6xl lg:py-8 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:px-8  ">
            <div className="mb-2 md:mb-3">
              <span className="mb-1 inline-block text-gray-500">{data.category}</span>
              <h2 className="text-xl font-bold md:text-2xl">{data.name}</h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="flex items-center gap-x-3">
                <span>4.7</span>
                <Star className="w-4 h-4" />
              </Button>


              <span className="text-gray-500 text-sm ">36 reviews</span>

            </div>

            <div className="mb-4 ">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 ">${data.price}</span>

                <span className="mb-0.5 text-red-500 line-through">${data.price + 15}</span>

              </div>

              <span className="text-xs text-gray-500">Incl. plus shipping</span>

            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">Free shipping on orders over $100</span>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <AddToCart
                currency="USD"
                name={data.name}
                price={data.price}
                description={data.description}
                image={data.images[0]}
                price_id={data.price_id}
              />
              <Button variant={"outline"}>Checkout</Button> 
              {/* put checkout component above instead of button and give it props of add carts */}

            </div>

            <p className="text-gray-500 mt-10 text-base tracking-wide">{data.description}</p>
          </div>

        </div>

      </div>

    </div>
  )
}