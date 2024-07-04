'use client'

import { Button } from "@/components/ui/button"
import { useShoppingCart } from "use-shopping-cart"
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToCart";

function Checkout({ currency, description, name, price, image, price_id }: ProductCart) {
  const { checkoutSingleItem, redirectToCheckout } = useShoppingCart()

  const buyNow = (priceId: string) => {
    console.log(priceId);
    
    checkoutSingleItem(priceId)
    // redirectToCheckout(priceId) 

  }

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
        buyNow(product.price_id)
      }}
      className="w-full">Checkout</Button>
  ) 
}

export default Checkout