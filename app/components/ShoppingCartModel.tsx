'use client'

import { Button } from "@/components/ui/button"

import {
  Sheet,

  SheetContent,

  SheetHeader,
  SheetTitle,

} from "@/components/ui/sheet"
import Image from "next/image"
import { useShoppingCart } from "use-shopping-cart"


type CheckoutLinks = {
  [key: string]: string;
};


// manual redirection to see if this works or not

const STRIPE_CHECKOUT_LINKS: CheckoutLinks = {
  '3d6bd204-1f75-41c1-b890-8888a3490e18': 'https://buy.stripe.com/test_28odR0fZig2O9IAcMM',
  // Add more products and their links as needed
  '10ad4e87-3182-45a0-a78c-25ab9673cd1': 'https://buy.stripe.com/test_bIY14e4gA9EqdYQbIJ',

  "4a4d8309-502c-4b0a-9642-b1c052db997d": 'https://buy.stripe.com/test_4gw9AK4gA2bY3kcfZ0',

  "e69ec183-04a0-4306-bb6d-a94c1f9004a2": 'https://buy.stripe.com/test_dR6cMWeVe17U1c49AD'


};


export default function ShoppingCartModel() {
  const { cartCount, shouldDisplayCart, handleCartClick, cartDetails, removeItem, totalPrice, redirectToCheckout } = useShoppingCart()

//manual redirect, it could be wrong so comment this one and uncomment above one but the above one is giving 'no such plan' error
// async function handleCheckoutClick(e: any) {
//   e.preventDefault()
//   console.log("Initiating checkout with cart:", cartDetails);

//   // Check if there's only one item in the cart
//   const cartItems = Object.values(cartDetails ?? {});
//   if (cartItems.length !== 1) {
//     console.error("This checkout method only supports one item at a time");
//     // Optionally, show an error message to the user
//     return;
//   }  

//   const item = cartItems[0];
//   const checkoutLink = STRIPE_CHECKOUT_LINKS[item.id]; // or item.id, depending on how you've set up your mapping

//   if (checkoutLink) {
//     // Redirect to the Stripe Checkout link
//     window.location.href = checkoutLink;
//   } else {
//     console.error("No checkout link found for this product");
//     // Optionally, show an error message to the user
//   }  
// }  


  async function handleCheckoutClick(e: any) {
    e.preventDefault()
    // console.log("Initiating checkout with cart:", cartDetails);
    try {
      const res = await redirectToCheckout()
      if (res?.error) {
        console.error("Checkout error:", res.error);
        // Handle the error (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  }




return (
  <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick} >

    <SheetContent className="sm:max-w-lg w-[90vw]">
      <SheetHeader>
        <SheetTitle>Shopping Cart</SheetTitle>

      </SheetHeader>

      <div className="h-full flex flex-col justify-between ">
        <div className="mt-8 flex-1 overflow-y-auto">
          <ul className="-my-6 divide-y divide-gray-200">
            {cartCount === 0 ? (
              <h1 className="py-6 ">Your cart is empty</h1>
            ) : (
              <>
                <h1>Your cart has {cartCount} items</h1>
                {Object.values(cartDetails ?? {}).map((entry) => (
                  <li key={entry.id} className="flex py-6 ">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={entry.image as string} alt="Product Image"
                        width={100} height={100}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{entry.name}</h3>
                          <p className="ml-4">${entry.price}</p>
                        </div>
                        <p className="line-clamp-2 text-sm text-gray-500">{entry.description}</p>
                      </div>

                      <div className="flex flex-1 items-center justify-between text-sm">
                        <p className="text-gray-500">Qty: {entry.quantity}</p>

                        <div className="flex">
                          <Button
                            variant={"ghost"}
                            className="border h-auto px-2"
                            onClick={() => removeItem(entry.id)}
                          >
                            Remove
                          </Button>

                        </div>

                      </div>

                    </div>

                  </li>
                ))}
              </>

            )}

          </ul>

        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalPrice}</p>

          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6 ">
            <Button
              className="w-full"
              onClick={(e) => handleCheckoutClick(e)}
            >Checkout</Button>

          </div>
          <div className="mt-6 text-center text-sm text-gray-500 flex justify-center">
            <p>Or <button onClick={() => handleCartClick()} className="underline font-medium hover:text-primary">Continue Shopping</button></p>

          </div>

        </div>

      </div>
    </SheetContent>
  </Sheet>
)


}







