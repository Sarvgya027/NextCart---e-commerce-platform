export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string | any;
  categoryName: string;
  name: string;
}

export interface fullProduct {

  _id: string;
  images: any;
  price: number;
  slug: string | any;
  category: string;
  name: string;
  description: string;
  price_id: string;

}