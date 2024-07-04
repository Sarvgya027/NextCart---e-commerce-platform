import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

export default function Success() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-500 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="text-xl font-bold">Your payment was successful</h3>

        </div>
        <Button asChild>
          <Link href={'/'}>
            Go Back to mainpage
          </Link>
        </Button>

      </div>
    </div>
  )
}