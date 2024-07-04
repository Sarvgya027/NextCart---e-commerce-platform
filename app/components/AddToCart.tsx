'use client'

import { Button } from "@/components/ui/button"
import { useShoppingCart } from "use-shopping-cart"
import { urlFor } from "../lib/sanity";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

function AddToCart({ currency, description, name, price, image, price_id }: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart()

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  }
  return (
    <Button
      onClick={() => {
        addItem(product)
        handleCartClick()
      }}
      className="w-full">Add to cart</Button>
  ) 
}

export default AddToCart 