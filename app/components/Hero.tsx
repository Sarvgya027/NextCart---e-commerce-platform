import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";

  const data = await client.fetch(query)

  return data;
}




export default async function Hero() {
  const data = await getData();
  // const imageUrl = urlFor(data.image1).url();

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:max-px-8 lg:pl-20 ">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-16 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 ">
          <h1 className="mb-4 text-2xl text-black sm:text-4xl md:mb-8 md:text-5xl ">
            Top Fashion Products
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">We sell the most exclusive products in the world </p>




        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">

            <Image
              src={urlFor(data.image1).url()}
              width={500}
              height={500}
              priority
              alt="Great Photo"
              className="h-full w-full object-cover object-center"

            />
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={urlFor(data.image2).url()}
              width={500}
              height={500}
              priority
              alt="Great Photo"
              className="h-full w-full object-cover object-center" />
          </div>

        </div>

      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row ">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          <Link href='/men' className="flex w-1/3 items-center justify-center text-gray-500 transition hover:bg-gray-200   duration-300 hover:text-primary">
            Men
          </Link>
          <Link href='/women' className="flex w-1/3 items-center justify-center text-gray-500 transition hover:bg-gray-200   duration-300 hover:text-primary">
            Women
          </Link>
          <Link href='/teens' className="flex w-1/3 items-center justify-center text-gray-500 transition hover:bg-gray-200   duration-300 hover:text-primary">
            Teens
          </Link>
        </div>

      </div>

    </section>
  )
};