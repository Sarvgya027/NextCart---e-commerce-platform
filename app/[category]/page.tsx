import Image from "next/image";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Link from "next/link";

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
  _id,
    "imageUrl": images[0].asset->url,
      price,
    name,
    "slug": slug.current,
    "categoryName": category->name
}`

  const data = await client.fetch(query)

  return data

}

export const dynamic = "force-dynamic"

async function CategoryPage({ params }: { params: { category: string } }) {
  const data: simplifiedProduct[] = await getData(params.category)


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight  ">Our Newest Products for {params.category}</h2>


        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl}
                    width={500} height={500}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </Link>

              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm ">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>

                  </h3>
                  <p>{product.categoryName}</p>
                </div>
                <p className="text-sm font-medium">${product.price}</p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  )



}

export default CategoryPage;